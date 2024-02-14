# Algorand transaction subscription / indexing

This library a simple, but flexible / configurable Algorand transaction subscription / indexing mechanism

Forked and tweaked so it works with localnet instead of testnet/ mainnet.

## Examples

## Getting started

To try examples in this repository:

- `npm install`
- Copy `.env.sample` to `.env` and edit to point to the Algorand node you want to point to
- `npm run orderbook` or F5 in Visual Studio Code to get breakpoint debugging against one of the examples (or choose the other ones)

## Intended Usage

Run against the orderbooks created in our smart contract testing suite/ private front end

- Run tests in Private v2 repo
- Input orderbook appId's into `/examples/orderbook/index`
- `npm run orderbook`
- Save the results

## Example jsons

`OpenExecuteCloseOrderbook.json` -> `Algodex-2.0.test.ts`
`MultiOpenORderOrderbook.json` -> `Orderbook.test.ts`
