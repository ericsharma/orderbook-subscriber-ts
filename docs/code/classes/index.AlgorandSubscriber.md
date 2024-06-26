[@algorandfoundation/algokit-subscriber](../README.md) / [index](../modules/index.md) / AlgorandSubscriber

# Class: AlgorandSubscriber

[index](../modules/index.md).AlgorandSubscriber

Handles the logic for subscribing to the Algorand blockchain and emitting events.

## Table of contents

### Constructors

- [constructor](index.AlgorandSubscriber.md#constructor)

### Properties

- [abortController](index.AlgorandSubscriber.md#abortcontroller)
- [algod](index.AlgorandSubscriber.md#algod)
- [eventEmitter](index.AlgorandSubscriber.md#eventemitter)
- [indexer](index.AlgorandSubscriber.md#indexer)
- [startPromise](index.AlgorandSubscriber.md#startpromise)
- [started](index.AlgorandSubscriber.md#started)
- [subscription](index.AlgorandSubscriber.md#subscription)

### Methods

- [on](index.AlgorandSubscriber.md#on)
- [onBatch](index.AlgorandSubscriber.md#onbatch)
- [pollOnce](index.AlgorandSubscriber.md#pollonce)
- [start](index.AlgorandSubscriber.md#start)
- [stop](index.AlgorandSubscriber.md#stop)

## Constructors

### constructor

• **new AlgorandSubscriber**(`subscription`, `algod`, `indexer?`): [`AlgorandSubscriber`](index.AlgorandSubscriber.md)

Create a new `AlgorandSubscriber`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subscription` | [`SubscriptionConfig`](../interfaces/types_subscription.SubscriptionConfig.md) | The subscription configuration |
| `algod` | `default` | An algod client |
| `indexer?` | `default` | An (optional) indexer client; only needed if `subscription.syncBehaviour` is `catchup-with-indexer` |

#### Returns

[`AlgorandSubscriber`](index.AlgorandSubscriber.md)

#### Defined in

[subscriber.ts:31](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/subscriber.ts#L31)

## Properties

### abortController

• `Private` **abortController**: `AbortController`

#### Defined in

[subscriber.ts:20](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/subscriber.ts#L20)

___

### algod

• `Private` **algod**: `default`

#### Defined in

[subscriber.ts:17](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/subscriber.ts#L17)

___

### eventEmitter

• `Private` **eventEmitter**: [`AsyncEventEmitter`](types_async_event_emitter.AsyncEventEmitter.md)

#### Defined in

[subscriber.ts:21](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/subscriber.ts#L21)

___

### indexer

• `Private` **indexer**: `undefined` \| `default`

#### Defined in

[subscriber.ts:18](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/subscriber.ts#L18)

___

### startPromise

• `Private` **startPromise**: `undefined` \| `Promise`\<`void`\>

#### Defined in

[subscriber.ts:23](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/subscriber.ts#L23)

___

### started

• `Private` **started**: `boolean` = `false`

#### Defined in

[subscriber.ts:22](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/subscriber.ts#L22)

___

### subscription

• `Private` **subscription**: [`SubscriptionConfig`](../interfaces/types_subscription.SubscriptionConfig.md)

#### Defined in

[subscriber.ts:19](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/subscriber.ts#L19)

## Methods

### on

▸ **on**\<`T`\>(`eventName`, `listener`): [`AlgorandSubscriber`](index.AlgorandSubscriber.md)

Register an event handler to run on every instance the given event name.

The listener can be async and it will be awaited if so.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [`SubscribedTransaction`](../modules/types_subscription.md#subscribedtransaction) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event to subscribe to |
| `listener` | [`TypedAsyncEventListener`](../modules/types_subscription.md#typedasynceventlistener)\<`T`\> | The listener function to invoke with the subscribed event |

#### Returns

[`AlgorandSubscriber`](index.AlgorandSubscriber.md)

The subscriber so `on`/`onBatch` calls can be chained

#### Defined in

[subscriber.ts:149](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/subscriber.ts#L149)

___

### onBatch

▸ **onBatch**\<`T`\>(`eventName`, `listener`): [`AlgorandSubscriber`](index.AlgorandSubscriber.md)

Register an event handler to run on all instances of the given event name
for each subscription poll.

This is useful when you want to efficiently process / persist events
in bulk rather than one-by-one.

The listener can be async and it will be awaited if so.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [`SubscribedTransaction`](../modules/types_subscription.md#subscribedtransaction) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event to subscribe to |
| `listener` | [`TypedAsyncEventListener`](../modules/types_subscription.md#typedasynceventlistener)\<`T`[]\> | The listener function to invoke with the subscribed events |

#### Returns

[`AlgorandSubscriber`](index.AlgorandSubscriber.md)

The subscriber so `on`/`onBatch` calls can be chained

#### Defined in

[subscriber.ts:166](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/subscriber.ts#L166)

___

### pollOnce

▸ **pollOnce**(): `Promise`\<[`TransactionSubscriptionResult`](../interfaces/types_subscription.TransactionSubscriptionResult.md)\>

Execute a single subscription poll.

This is useful when executing in the context of a process
triggered by a recurring schedule / cron.

#### Returns

`Promise`\<[`TransactionSubscriptionResult`](../interfaces/types_subscription.TransactionSubscriptionResult.md)\>

The poll result

#### Defined in

[subscriber.ts:55](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/subscriber.ts#L55)

___

### start

▸ **start**(`inspect?`, `suppressLog?`): `void`

Start the subscriber in a loop until `stop` is called.

This is useful when running in the context of a long-running process / container.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `inspect?` | (`pollResult`: [`TransactionSubscriptionResult`](../interfaces/types_subscription.TransactionSubscriptionResult.md)) => `void` | A function that is called for each poll so the inner workings can be inspected / logged / etc. |
| `suppressLog?` | `boolean` | - |

#### Returns

`void`

An object that contains a promise you can wait for after calling stop

#### Defined in

[subscriber.ts:92](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/subscriber.ts#L92)

___

### stop

▸ **stop**(`reason`): `Promise`\<`void`\>

Stops the subscriber if previously started via `start`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reason` | `unknown` | The reason the subscriber is being stopped |

#### Returns

`Promise`\<`void`\>

A promise that can be awaited to ensure the subscriber has finished stopping

#### Defined in

[subscriber.ts:135](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/subscriber.ts#L135)
