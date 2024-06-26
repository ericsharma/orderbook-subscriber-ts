[@algorandfoundation/algokit-subscriber](../README.md) / [types/subscription](../modules/types_subscription.md) / TransactionSubscriptionResult

# Interface: TransactionSubscriptionResult

[types/subscription](../modules/types_subscription.md).TransactionSubscriptionResult

The result of a single subscription pull/poll.

## Table of contents

### Properties

- [currentRound](types_subscription.TransactionSubscriptionResult.md#currentround)
- [newWatermark](types_subscription.TransactionSubscriptionResult.md#newwatermark)
- [subscribedTransactions](types_subscription.TransactionSubscriptionResult.md#subscribedtransactions)
- [syncedRoundRange](types_subscription.TransactionSubscriptionResult.md#syncedroundrange)

## Properties

### currentRound

• **currentRound**: `number`

The current detected tip of the configured Algorand blockchain.

#### Defined in

[types/subscription.ts:133](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/types/subscription.ts#L133)

___

### newWatermark

• **newWatermark**: `number`

The new watermark value to persist for the next call to
`getSubscribedTransactions` to continue the sync.
Will be equal to `syncedRoundRange[1]`. Only persist this
after processing (or in the same atomic transaction as)
subscribed transactions to keep it reliable.

#### Defined in

[types/subscription.ts:139](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/types/subscription.ts#L139)

___

### subscribedTransactions

• **subscribedTransactions**: [`SubscribedTransaction`](../modules/types_subscription.md#subscribedtransaction)[]

Any transactions that matched the given filter within
the synced round range. This uses the [indexer transaction
format](https://developer.algorand.org/docs/rest-apis/indexer/#transaction)
to represent the data.

#### Defined in

[types/subscription.ts:145](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/types/subscription.ts#L145)

___

### syncedRoundRange

• **syncedRoundRange**: [startRound: number, endRound: number]

The round range that was synced from/to

#### Defined in

[types/subscription.ts:131](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/types/subscription.ts#L131)
