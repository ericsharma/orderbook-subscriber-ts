[@algorandfoundation/algokit-subscriber](../README.md) / [types/block](../modules/types_block.md) / BlockValueDelta

# Interface: BlockValueDelta

[types/block](../modules/types_block.md).BlockValueDelta

## Table of contents

### Properties

- [at](types_block.BlockValueDelta.md#at)
- [bs](types_block.BlockValueDelta.md#bs)
- [ui](types_block.BlockValueDelta.md#ui)

## Properties

### at

• **at**: `number`

DeltaAction is an enum of actions that may be performed when applying a delta to a TEAL key/value store:
  * `1`: SetBytesAction indicates that a TEAL byte slice should be stored at a key
  * `2`: SetUintAction indicates that a Uint should be stored at a key
  * `3`: DeleteAction indicates that the value for a particular key should be deleted

#### Defined in

[types/block.ts:141](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/types/block.ts#L141)

___

### bs

• `Optional` **bs**: `Uint8Array`

Bytes value

#### Defined in

[types/block.ts:144](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/types/block.ts#L144)

___

### ui

• `Optional` **ui**: `number`

Uint64 value

#### Defined in

[types/block.ts:147](https://github.com/algorandfoundation/algokit-subscriber-ts/blob/main/src/types/block.ts#L147)
