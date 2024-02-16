import * as algokit from '@algorandfoundation/algokit-utils'
import { TransactionResult } from '@algorandfoundation/algokit-utils/types/indexer'
import algosdk, { TransactionType } from 'algosdk'
import fs from 'fs'
import path from 'path'
import prisma from '../../prisma/prisma'
import { AlgorandSubscriber } from '../../src/subscriber'

function smaller(a: number, b: number) {
  return a < b ? a : b
}
function bigger(a: number, b: number) {
  return a > b ? a : b
}
if (!fs.existsSync(path.join(__dirname, '..', '..', '.env')) && !process.env.ALGOD_SERVER) {
  // eslint-disable-next-line no-console
  console.error('Copy /.env.sample to /.env before starting the application.')
  process.exit(1)
}

async function getOrderBookSubscriber() {
  const algod = await algokit.getAlgoClient()
  const indexer = await algokit.getAlgoIndexerClient()
  const subscriber = new AlgorandSubscriber(
    {
      events: [
        {
          eventName: 'orderbook',
          filter: {
            type: TransactionType.appl,
            // replace appID of target appId on machine localnet
            appId: 1193,
          },
        },
      ],
      frequencyInSeconds: 5,
      maxRoundsToSync: 100,
      syncBehaviour: 'catchup-with-indexer',
      watermarkPersistence: {
        get: getLastWatermark,
        set: saveWatermark,
      },
    },
    algod,
    indexer,
  )
  subscriber.onBatch('orderbook', async (events) => {
    // eslint-disable-next-line no-console
    console.log(`Received ${events.length} asset changes`)

    await saveOrderbookTransactions(events)
  })
  return subscriber
}

async function saveOrderbookTransactions(transactions: TransactionResult[]) {
  // eslint-disable-next-line no-debugger
  debugger
  // eslint-disable-next-line
  if (!transactions[2]['inner-txns']) return
  console.info('H*****')
  const testAssets = transactions[2]['inner-txns'][0]['foreign-assets']
  console.info(testAssets)

  // await prisma.tradingPair.create({ data: { olderAssetId: '1194', newerAssetId: '1195' } })

  const transactionsWithAppArgs = transactions.map(async (transaction) => {
    // xGwzBQ==

    if (transaction['application-transaction'] === undefined) return transaction
    if (transaction['application-transaction']['application-args'] === undefined) return transaction

    const methodIdentifier = transaction?.['application-transaction']?.['application-args'][0]

    if (methodIdentifier === 'xGwzBQ==' && transaction['application-transaction']['foreign-assets']) {
      transaction['application-transaction']['application-args'] = [
        'orderbook sell Asset OptIn',
        `${transaction['application-transaction']['foreign-assets'][0]}`,
      ]
    }

    if (methodIdentifier === 'OBFgNw==') {
      const appArgs = transaction?.['application-transaction']['application-args']
      const decoded = [
        'User application call to Orderbook',
        Buffer.from(appArgs[1], 'base64').toString(),
        Buffer.from(appArgs[2], 'base64').toString(),
        ` ${algosdk.decodeUint64(Buffer.from(appArgs[3], 'base64'), 'safe')}`,
        ` ${algosdk.decodeUint64(Buffer.from(appArgs[4], 'base64'), 'safe')}`,
      ]

      transaction['application-transaction']['application-args'] = decoded
      if (!transaction['inner-txns']) return transaction
      const orderCreateInnerTxn = transaction['inner-txns'][0]['application-transaction']
      if (!orderCreateInnerTxn) return transaction
      if (!orderCreateInnerTxn['application-args']) return transaction
      if (!orderCreateInnerTxn['foreign-assets']) return transaction
      if (!orderCreateInnerTxn['accounts']) return transaction

      const innerAppArgs = orderCreateInnerTxn['application-args']
      const decodedInner = [
        'Orderbook create Order app call',
        ` ${orderCreateInnerTxn['foreign-assets'][0]}`,
        `${orderCreateInnerTxn['foreign-assets'][1]}`,
        ` ${algosdk.decodeUint64(Buffer.from(innerAppArgs[3], 'base64'), 'safe')}`,
        ` ${algosdk.decodeUint64(Buffer.from(innerAppArgs[4], 'base64'), 'safe')}`,
        orderCreateInnerTxn['accounts'][0],
      ]
      if (!transaction['inner-txns'][0]['application-transaction']) return transaction
      transaction['inner-txns'][0]['application-transaction']['application-args'] = decodedInner

      if (!transaction['inner-txns'][1]['payment-transaction']) return transaction
      const appPayTxn = transaction['inner-txns'][1]['payment-transaction']
      const olderAssetId = smaller(Number(decodedInner[1]), Number(decodedInner[2])).toString()
      const newerAssetId = bigger(Number(decodedInner[1]), Number(decodedInner[2])).toString()

      console.info('H*****')
      console.info(olderAssetId, newerAssetId)
      await prisma.order.create({
        data: {
          // tradingPair: {
          //   connect: { tradingPairId: { olderAssetId: olderAssetId, newerAssetId: newerAssetId } },
          // },
          tradingPair: {
            connectOrCreate: {
              where: { tradingPairId: { olderAssetId, newerAssetId } },
              create: { olderAssetId, newerAssetId },
            },
          },
          sellAssetId: decodedInner[1],
          buyAssetId: decodedInner[2],
          sellQuant: decodedInner[3],
          buyQuant: decodedInner[4],
          owner: decodedInner[5],
          appAddress: appPayTxn['receiver'],
          type: decoded[1] === '1194' ? 'sell' : 'buy',
        },
      })
    }

    return transaction
  })

  await saveTransactions(
    transactionsWithAppArgs,

    'orderbook.json',
  )
}

// Basic methods that persist using filesystem - for illustrative purposes only

async function saveWatermark(watermark: number) {
  fs.writeFileSync(path.join(__dirname, 'watermark.txt'), watermark.toString(), { encoding: 'utf-8' })
}

async function getLastWatermark(): Promise<number> {
  if (!fs.existsSync(path.join(__dirname, 'watermark.txt'))) return 0
  const existing = fs.readFileSync(path.join(__dirname, 'watermark.txt'), 'utf-8')
  // eslint-disable-next-line no-console
  console.log(`Found existing sync watermark in watermark.txt; syncing from ${existing}`)
  return Number(existing)
}

async function getSavedTransactions<T>(fileName: string): Promise<T[]> {
  const existing = fs.existsSync(path.join(__dirname, fileName))
    ? (JSON.parse(fs.readFileSync(path.join(__dirname, fileName), 'utf-8')) as T[])
    : []
  return existing
}

async function saveTransactions(transactions: unknown[], fileName: string) {
  fs.writeFileSync(path.join(__dirname, fileName), JSON.stringify(transactions, undefined, 2), { encoding: 'utf-8' })
  // eslint-disable-next-line no-console
  console.log(`Saved ${transactions.length} transactions to ${fileName}`)
}

// eslint-disable-next-line no-console
process.on('uncaughtException', (e) => console.error(e))
;(async () => {
  const subscriber = await getOrderBookSubscriber()

  if (process.env.RUN_LOOP === 'true') {
    subscriber.start()
    ;['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach((signal) =>
      process.on(signal, () => {
        // eslint-disable-next-line no-console
        console.log(`Received ${signal}; stopping subscriber...`)
        subscriber.stop(signal)
      }),
    )
  } else {
    await subscriber.pollOnce()
  }
})().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e)
})
