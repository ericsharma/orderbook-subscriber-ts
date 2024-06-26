[@algorandfoundation/algokit-subscriber](../README.md) / [types/subscription](../modules/types_subscription.md) / TransactionFilter

# Interface: TransactionFilter

[types/subscription](../modules/types_subscription.md).TransactionFilter

Specify a filter to apply to find transactions of interest.

## Table of contents

### Properties

- [appCallArgumentsMatch](types_subscription.TransactionFilter.md#appcallargumentsmatch)
- [appCreate](types_subscription.TransactionFilter.md#appcreate)
- [appId](types_subscription.TransactionFilter.md#appid)
- [appOnComplete](types_subscription.TransactionFilter.md#apponcomplete)
- [assetCreate](types_subscription.TransactionFilter.md#assetcreate)
- [assetId](types_subscription.TransactionFilter.md#assetid)
- [maxAmount](types_subscription.TransactionFilter.md#maxamount)
- [methodSignature](types_subscription.TransactionFilter.md#methodsignature)
- [minAmount](types_subscription.TransactionFilter.md#minamount)
- [notePrefix](types_subscription.TransactionFilter.md#noteprefix)
- [receiver](types_subscription.TransactionFilter.md#receiver)
- [sender](types_subscription.TransactionFilter.md#sender)
- [type](types_subscription.TransactionFilter.md#type)

## Properties

### appCallArgumentsMatch

• `Optional` **appCallArgumentsMatch**: (`appCallArguments?`: `Uint8Array`[]) => `boolean`

#### Type declaration

▸ (`appCallArguments?`): `boolean`

Filter to app transactions that meet the given app arguments predicate.

##### Parameters

| Name | Type |
| :------ | :------ |
| `appCallArguments?` | `Uint8Array`[] |

##### Returns

`boolean`

#### Defined in

[types/subscription.ts:125](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/types/subscription.ts#L125)

___

### appCreate

• `Optional` **appCreate**: `boolean`

Filter to transactions that are creating an app.

#### Defined in

[types/subscription.ts:108](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/types/subscription.ts#L108)

___

### appId

• `Optional` **appId**: `number`

Filter to transactions against the app with the given ID.

#### Defined in

[types/subscription.ts:106](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/types/subscription.ts#L106)

___

### appOnComplete

• `Optional` **appOnComplete**: `ApplicationOnComplete` \| `ApplicationOnComplete`[]

Filter to transactions that have given on complete(s).

#### Defined in

[types/subscription.ts:110](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/types/subscription.ts#L110)

___

### assetCreate

• `Optional` **assetCreate**: `boolean`

Filter to transactions that are creating an asset.

#### Defined in

[types/subscription.ts:114](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/types/subscription.ts#L114)

___

### assetId

• `Optional` **assetId**: `number`

Filter to transactions against the asset with the given ID.

#### Defined in

[types/subscription.ts:112](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/types/subscription.ts#L112)

___

### maxAmount

• `Optional` **maxAmount**: `number`

Filter to transactions where the amount being transferred is less than
or equal to the given maximum (microAlgos or decimal units of an ASA if type: axfer).

#### Defined in

[types/subscription.ts:120](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/types/subscription.ts#L120)

___

### methodSignature

• `Optional` **methodSignature**: `string`

Filter to app transactions that have the given ARC-0004 method selector for
the given method signature as the first app argument.

#### Defined in

[types/subscription.ts:123](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/types/subscription.ts#L123)

___

### minAmount

• `Optional` **minAmount**: `number`

Filter to transactions where the amount being transferred is greater
than or equal to the given minimum (microAlgos or decimal units of an ASA if type: axfer).

#### Defined in

[types/subscription.ts:117](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/types/subscription.ts#L117)

___

### notePrefix

• `Optional` **notePrefix**: `string`

Filter to transactions with a note having the given prefix.

#### Defined in

[types/subscription.ts:104](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/types/subscription.ts#L104)

___

### receiver

• `Optional` **receiver**: `string`

Filter to transactions being received by the specified address.

#### Defined in

[types/subscription.ts:102](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/types/subscription.ts#L102)

___

### sender

• `Optional` **sender**: `string`

Filter to transactions sent from the specified address.

#### Defined in

[types/subscription.ts:100](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/types/subscription.ts#L100)

___

### type

• `Optional` **type**: `TransactionType`

Filter based on the given transaction type.

#### Defined in

[types/subscription.ts:98](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/types/subscription.ts#L98)
