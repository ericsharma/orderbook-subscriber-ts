import * as algokit from '@algorandfoundation/algokit-utils'
import { TransactionResult } from '@algorandfoundation/algokit-utils/types/indexer'
import algosdk, { TransactionType } from 'algosdk'
import fs from 'fs'
import path from 'path'
import prisma from '../../prisma/prisma'
import { AlgorandSubscriber } from '../../src/subscriber'
import { formatAssetsForDB } from './dbUtils'
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
            // appId: 1002,
            appId: 7079,
            methodSignatures: [
              'openOrder(string,pay,pay,txn,uint64,uint64,uint64,uint64)uint64',
              'executeOrder(string,uint64,uint64,uint64)address[]',
              'closeOrder(uint64)void',
            ],
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
  type openOrderDBParams = {
    sellQuant: string
    buyQuant: string
    owner: string
    appAddress: string
    type: 'Buy' | 'Sell'
    olderAssetId: string
    newerAssetId: string
  }

  type orderHistoryDBParams = {
    userAddress: string
    type: 'Open' | 'Close' | 'Execute'
    transactionId: string
  }
  let openArr: openOrderDBParams[] = []

  const closeArr: { appAddress: string }[] = []

  const orderHistoryArr: orderHistoryDBParams[] = []

  const transactionsWithAppArgs = transactions.map((transaction) => {
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

    if (methodIdentifier === 'X6/ZlQ==') {
      const appArgs = transaction?.['application-transaction']['application-args']
      const decoded = [
        'User application call to Orderbook',
        Buffer.from(appArgs[1], 'base64').toString(),
        ` ${algosdk.decodeUint64(Buffer.from(appArgs[2], 'base64'), 'safe')}`,
        // Buffer.from(appArgs[2], 'base64').toString(),
        ` ${algosdk.decodeUint64(Buffer.from(appArgs[3], 'base64'), 'safe')}`,
        ` ${algosdk.decodeUint64(Buffer.from(appArgs[4], 'base64'), 'safe')}`,
        ` ${algosdk.decodeUint64(Buffer.from(appArgs[5], 'base64'), 'safe')}`,
      ]

      transaction['application-transaction']['application-args'] = decoded
      if (!transaction['inner-txns']) return transaction
      const orderCreateInnerTxn = transaction['inner-txns'][0]['application-transaction']
      if (!orderCreateInnerTxn) return transaction
      if (!orderCreateInnerTxn['application-args']) return transaction

      const innerAppArgs = orderCreateInnerTxn['application-args']

      const arg = Buffer.from(innerAppArgs[5], 'base64')

      const abi = algosdk.ABIType.from('address')
      // console.log(abi.decode(arg))
      const decodedAddr = abi.decode(arg)

      const decodedInner = [
        'Orderbook create Order app call',
        ` ${algosdk.decodeUint64(Buffer.from(innerAppArgs[1], 'base64'), 'safe')}`,
        ` ${algosdk.decodeUint64(Buffer.from(innerAppArgs[2], 'base64'), 'safe')}`,
        ` ${algosdk.decodeUint64(Buffer.from(innerAppArgs[3], 'base64'), 'safe')}`,
        ` ${algosdk.decodeUint64(Buffer.from(innerAppArgs[4], 'base64'), 'safe')}`,
        decodedAddr.toString(),
      ]
      console.log(decodedInner)
      if (!transaction['inner-txns'][0]['application-transaction']) return transaction

      transaction['inner-txns'][0]['application-transaction']['application-args'] = decodedInner

      if (!transaction['inner-txns'][1]['payment-transaction']) return transaction
      const appPayTxn = transaction['inner-txns'][1]['payment-transaction']
      const { olderAssetId, newerAssetId } = formatAssetsForDB(Number(decodedInner[1]), Number(decodedInner[2]))

      openArr.push({
        sellQuant: decodedInner[3],
        buyQuant: decodedInner[4],
        owner: decodedInner[5],
        appAddress: appPayTxn['receiver'],
        type: decoded[1] === olderAssetId ? 'Sell' : 'Buy',
        olderAssetId,
        newerAssetId,
      })

      orderHistoryArr.push({
        userAddress: decodedInner[5],
        type: 'Open',
        transactionId: transaction.id,
      })
    }

    if (methodIdentifier === 'fnRRDA==' && transaction['application-transaction']['accounts']) {
      const appAddress = transaction['application-transaction']['accounts'][0]
      const appArgs = transaction?.['application-transaction']['application-args']
      const decodedCloseAppArgs = [
        'User Closes order',
        ` ${algosdk.decodeUint64(Buffer.from(appArgs[1], 'base64'), 'safe')}`,
        appAddress, // the app Account Address
      ]
      transaction['application-transaction']['application-args'] = decodedCloseAppArgs
      const filteredArray = openArr.filter((order) => order.appAddress !== appAddress)
      if (filteredArray.length < openArr.length) {
        openArr = filteredArray // closeOrder appAddress was found in OpenArr array so no need to post to DB
      } else {
        // if not found then push closeOrder DB request arr.
        closeArr.push({ appAddress: appAddress })
      }

      orderHistoryArr.push({
        userAddress: transaction.sender,
        transactionId: transaction.id,
        type: 'Close',
      })
    }
    return transaction
  })

  await saveTransactions(
    transactionsWithAppArgs,

    'orderbook.json',
  )

  // await Promise.resolve(openArr.shift())

  console.log(`open Arr: ${openArr.length} close Arr: ${closeArr.length} orderHistory Arr: ${orderHistoryArr.length}`)
  await Promise.all(
    openArr.map(({ appAddress, buyQuant, sellQuant, owner, type, olderAssetId, newerAssetId }) =>
      prisma.order
        .create({
          data: {
            tradingPair: {
              connectOrCreate: {
                where: { tradingPairId: { olderAssetId, newerAssetId } },
                create: { olderAssetId, newerAssetId },
              },
            },
            sellQuant,
            buyQuant,
            owner,
            appAddress,
            type, //older asset id is base asset
          },
        })
        .catch((error) =>
          // Transaction failed due to a write conflict or a deadlock. Please retry your transaction
          prisma.order.create({
            data: {
              tradingPair: {
                connectOrCreate: {
                  where: { tradingPairId: { olderAssetId, newerAssetId } },
                  create: { olderAssetId, newerAssetId },
                },
              },
              sellQuant,
              buyQuant,
              owner,
              appAddress,
              type,
            },
          }),
        ),
    ),
  )

  await Promise.all(closeArr.map((order) => prisma.order.delete({ where: { appAddress: order.appAddress } })))

  await Promise.all(
    orderHistoryArr.map(({ userAddress, type, transactionId }) =>
      prisma.orderHistory
        .create({
          data: {
            user: {
              connectOrCreate: {
                where: { userAddress },
                create: { userAddress },
              },
            },
            type,
            transactionId,
          },
        })
        .catch((error) =>
          prisma.orderHistory.create({
            data: {
              user: {
                connectOrCreate: {
                  where: { userAddress },
                  create: { userAddress },
                },
              },
              type,
              transactionId,
            },
          }),
        ),
    ),
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
