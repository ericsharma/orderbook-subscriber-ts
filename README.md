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

## Example JSON output

### OpenOrder Output ('X6/ZlQ==')

`````JSON
{
    "id": "VIAR5IZOG5SCVQJAAT6H66CEZFNCY6ZUCEWZY4LMYUK3DIG4XFXA",
    "application-transaction": {
      "application-id": 1002,
      "approval-program": "",
      "clear-state-program": "",
      "on-completion": "update",
      "application-args": [
        "User application call to Orderbook",
        "\u0000\u0004Open",
        " 1003",
        " 1004",
        " 10",
        " 20"
      ]
    },
    "first-valid": 6,
    "last-valid": 1006,
    "tx-type": "appl",
    "fee": 10000,
    "sender": "GEGABXV56QKN5RPY4Y7VLI5BXQ3PZYXJLMLPLL2IOUQW5QFH2XPUZPCI6I",
    "confirmed-round": 7,
    "round-time": 1710362522,
    "intra-round-offset": 6,
    "genesis-hash": "58ehRzjM/mnSJqXzdSTh6QMtl+TMyL+5b8mP/yVl+qg=",
    "genesis-id": "dockernet-v1",
    "group": "Si8ogtUhG6YyTTIdsFLbY9mvu18s9HxnIUKE1A++ScU=",
    "note": "",
    "lease": "",
    "inner-txns": [
      {
        "id": "JX4FU5Q3TN2G53LLHRI6OZZI5R4UXBCVNNAMFONH2FSNZDZR3FKQ",
        "application-transaction": {
          "approval-program": "long meaningless bytes" ,
          "clear-state-program": "\n",
          "on-completion": "update",
          "application-args": [
            "bqghJw==",
            "AAAAAAAAA+s=",
            "AAAAAAAAA+w=",
            "AAAAAAAAAAo=",
            "AAAAAAAAABQ=",
            "MQwA3r30FN7F+OY/VaOhvDb84ulbFvWvSHUhbsCn1d8="
          ],
          "global-state-schema": {
            "num-byte-slice": 1,
            "num-uint": 4
          }
        },
        "first-valid": 6,
        "last-valid": 1006,
        "tx-type": "appl",
        "fee": 0,
        "sender": "O3VYQKJ45XILV2GVDO44LM2IGPUD2QYRXNFX5K4ZDC2B4BD4ZZXU5AQG24",
        "confirmed-round": 7,
        "round-time": 1710362522,
        "intra-round-offset": 7,
        "genesis-hash": "58ehRzjM/mnSJqXzdSTh6QMtl+TMyL+5b8mP/yVl+qg=",
        "genesis-id": "dockernet-v1",
        "note": "",
        "lease": "",
        "created-application-index": 1014,
        "logs": [
          "FR98ddGw772ZXhrCtMKGwp9/LH8owqHDujjCklLfoVQ187KkiCp4AMKnIg=="
        ]
      },
      {
        "id": "M3COVPGSDULA6FYG5H62LEUZ3JJRIT55WRQR2A55AHZULQKVQRYQ",
        "payment-transaction": {
          "amount": 200000,
          "receiver": "2EYO7PKZLYNLJBU7P4WH6KFB7I4JEUW7MFKDL53SMTECU6AAU4RECM2IFU"
        },
        "first-valid": 6,
        "last-valid": 1006,
        "tx-type": "pay",
        "fee": 0,
        "sender": "O3VYQKJ45XILV2GVDO44LM2IGPUD2QYRXNFX5K4ZDC2B4BD4ZZXU5AQG24",
        "confirmed-round": 7,
        "round-time": 1710362522,
        "intra-round-offset": 8,
        "genesis-hash": "58ehRzjM/mnSJqXzdSTh6QMtl+TMyL+5b8mP/yVl+qg=",
        "genesis-id": "dockernet-v1",
        "group": "WjfsLbnYGIzDqq8/JHueyXOwS0H1cgyDdEUnNjyvQpc=",
        "note": "",
        "lease": ""
      },
      {
        "id": "MLWKTHUKCYBQV2OEPTJQXLU7KTMPGTP7TMILFIHD7M2OBBF5LCGQ",
        "application-transaction": {
          "application-id": 1014,
          "approval-program": "",
          "clear-state-program": "",
          "on-completion": "update",
          "application-args": [
            "gVupjQ==",
            "AAAAAAAAA+s="
          ]
        },
        "first-valid": 6,
        "last-valid": 1006,
        "tx-type": "appl",
        "fee": 0,
        "sender": "O3VYQKJ45XILV2GVDO44LM2IGPUD2QYRXNFX5K4ZDC2B4BD4ZZXU5AQG24",
        "confirmed-round": 7,
        "round-time": 1710362522,
        "intra-round-offset": 9,
        "genesis-hash": "58ehRzjM/mnSJqXzdSTh6QMtl+TMyL+5b8mP/yVl+qg=",
        "genesis-id": "dockernet-v1",
        "group": "WjfsLbnYGIzDqq8/JHueyXOwS0H1cgyDdEUnNjyvQpc=",
        "note": "",
        "lease": "",
        "inner-txns": [
          {
            "id": "KRDHXDOKLJOY4P7XZPXJU7ANBAR4IMFKPYLPFMYK2VDU2NSFKUDQ",
            "asset-transfer-transaction": {
              "asset-id": 1003,
              "amount": null,
              "receiver": "2EYO7PKZLYNLJBU7P4WH6KFB7I4JEUW7MFKDL53SMTECU6AAU4RECM2IFU",
              "sender": "2EYO7PKZLYNLJBU7P4WH6KFB7I4JEUW7MFKDL53SMTECU6AAU4RECM2IFU"
            },
            "first-valid": 6,
            "last-valid": 1006,
            "tx-type": "axfer",
            "fee": 0,
            "sender": "2EYO7PKZLYNLJBU7P4WH6KFB7I4JEUW7MFKDL53SMTECU6AAU4RECM2IFU",
            "confirmed-round": 7,
            "round-time": 1710362522,
            "intra-round-offset": 10,
            "genesis-hash": "58ehRzjM/mnSJqXzdSTh6QMtl+TMyL+5b8mP/yVl+qg=",
            "genesis-id": "dockernet-v1",
            "note": "",
            "lease": ""
          }
        ]
      },
      {
        "id": "WWUPIZ4DTJ7YEQ3ACCOYW53ROSVU2TWFF75BA3WU2JHOJKSEXJCA",
        "payment-transaction": {
          "amount": 100000,
          "receiver": "2EYO7PKZLYNLJBU7P4WH6KFB7I4JEUW7MFKDL53SMTECU6AAU4RECM2IFU"
        },
        "first-valid": 6,
        "last-valid": 1006,
        "tx-type": "pay",
        "fee": 0,
        "sender": "O3VYQKJ45XILV2GVDO44LM2IGPUD2QYRXNFX5K4ZDC2B4BD4ZZXU5AQG24",
        "confirmed-round": 7,
        "round-time": 1710362522,
        "intra-round-offset": 11,
        "genesis-hash": "58ehRzjM/mnSJqXzdSTh6QMtl+TMyL+5b8mP/yVl+qg=",
        "genesis-id": "dockernet-v1",
        "group": "494NfVzPmtBtSu8uqlCKaegdlrtUBwGoc/Xoefk8tK0=",
        "note": "",
        "lease": ""
      },
      {
        "id": "ZZDC75DJFKSMVCBMEJJKMCQ6NXU54TDKQTBLL6UNSI35G4O3NMKQ",
        "application-transaction": {
          "application-id": 1014,
          "approval-program": "",
          "clear-state-program": "",
          "on-completion": "update",
          "application-args": [
            "gVupjQ==",
            "AAAAAAAAA+w="
          ]
        },
        "first-valid": 6,
        "last-valid": 1006,
        "tx-type": "appl",
        "fee": 0,
        "sender": "O3VYQKJ45XILV2GVDO44LM2IGPUD2QYRXNFX5K4ZDC2B4BD4ZZXU5AQG24",
        "confirmed-round": 7,
        "round-time": 1710362522,
        "intra-round-offset": 12,
        "genesis-hash": "58ehRzjM/mnSJqXzdSTh6QMtl+TMyL+5b8mP/yVl+qg=",
        "genesis-id": "dockernet-v1",
        "group": "494NfVzPmtBtSu8uqlCKaegdlrtUBwGoc/Xoefk8tK0=",
        "note": "",
        "lease": "",
        "inner-txns": [
          {
            "id": "BF5H6SVPBKWVJBITYC2TGWXZ54AAV3JWDBRNRWZRWI7DZBGDSSNA",
            "asset-transfer-transaction": {
              "asset-id": 1004,
              "amount": null,
              "receiver": "2EYO7PKZLYNLJBU7P4WH6KFB7I4JEUW7MFKDL53SMTECU6AAU4RECM2IFU",
              "sender": "2EYO7PKZLYNLJBU7P4WH6KFB7I4JEUW7MFKDL53SMTECU6AAU4RECM2IFU"
            },
            "first-valid": 6,
            "last-valid": 1006,
            "tx-type": "axfer",
            "fee": 0,
            "sender": "2EYO7PKZLYNLJBU7P4WH6KFB7I4JEUW7MFKDL53SMTECU6AAU4RECM2IFU",
            "confirmed-round": 7,
            "round-time": 1710362522,
            "intra-round-offset": 13,
            "genesis-hash": "58ehRzjM/mnSJqXzdSTh6QMtl+TMyL+5b8mP/yVl+qg=",
            "genesis-id": "dockernet-v1",
            "note": "",
            "lease": ""
          }
        ]
      },
      ```

### CloseOrder Output ('fnRRDA==')

````JSON
{
    "id": "5HBEI32YV44AYNGH4QWQ52UK6BMETNDQCO3KCN532YKHCUEN5LWQ",
    "application-transaction": {
      "application-id": 1002,
      "approval-program": "",
      "clear-state-program": "",
      "on-completion": "update",
      "application-args": [
        "User Closes order",
        " 1133",
        "MSIMXYWWXH24UAC3L3YOL5FYLWVBNCPXVMSGCREBR7ZOMN3ASTWBFKSOVA"
      ],
      "foreign-apps": [
        1133
      ],
      "foreign-assets": [
        1004,
        1003,
        1003
      ],
      "accounts": [
        "MSIMXYWWXH24UAC3L3YOL5FYLWVBNCPXVMSGCREBR7ZOMN3ASTWBFKSOVA"
      ]
    },
    "first-valid": 17,
    "last-valid": 1017,
    "tx-type": "appl",
    "fee": 10000,
    "sender": "GEGABXV56QKN5RPY4Y7VLI5BXQ3PZYXJLMLPLL2IOUQW5QFH2XPUZPCI6I",
    "confirmed-round": 21,
    "round-time": 1710362524,
    "intra-round-offset": 0,
    "genesis-hash": "58ehRzjM/mnSJqXzdSTh6QMtl+TMyL+5b8mP/yVl+qg=",
    "genesis-id": "dockernet-v1",
    "note": "",
    "lease": "",
    "inner-txns": [
      {
        "id": "GEW2TNTC7F7BW4UC425GXOIWBXWZ3IKDAX3JEVRYT4IUECWMGA3Q",
        "application-transaction": {
          "application-id": 1133,
          "approval-program": "",
          "clear-state-program": "",
          "on-completion": "delete",
          "application-args": [
            "LVR6AA==",
            "AAAAAAAAA+w=",
            "AAAAAAAAA+s="
          ]
        },
        "first-valid": 17,
        "last-valid": 1017,
        "tx-type": "appl",
        "fee": 0,
        "sender": "O3VYQKJ45XILV2GVDO44LM2IGPUD2QYRXNFX5K4ZDC2B4BD4ZZXU5AQG24",
        "confirmed-round": 21,
        "round-time": 1710362524,
        "intra-round-offset": 1,
        "genesis-hash": "58ehRzjM/mnSJqXzdSTh6QMtl+TMyL+5b8mP/yVl+qg=",
        "genesis-id": "dockernet-v1",
        "note": "",
        "lease": "",
        "inner-txns": [
          {
            "id": "MTJ536EUTPWXLLYEKBKITYVGVEUD6GYU4DHLCB2ATCSJPYZWCH2A",
            "asset-transfer-transaction": {
              "asset-id": 1004,
              "amount": null,
              "receiver": "GEGABXV56QKN5RPY4Y7VLI5BXQ3PZYXJLMLPLL2IOUQW5QFH2XPUZPCI6I",
              "sender": "MSIMXYWWXH24UAC3L3YOL5FYLWVBNCPXVMSGCREBR7ZOMN3ASTWBFKSOVA",
              "close-amount": 10,
              "close-to": "GEGABXV56QKN5RPY4Y7VLI5BXQ3PZYXJLMLPLL2IOUQW5QFH2XPUZPCI6I"
            },
            "first-valid": 17,
            "last-valid": 1017,
            "tx-type": "axfer",
            "fee": 0,
            "sender": "MSIMXYWWXH24UAC3L3YOL5FYLWVBNCPXVMSGCREBR7ZOMN3ASTWBFKSOVA",
            "confirmed-round": 21,
            "round-time": 1710362524,
            "intra-round-offset": 2,
            "genesis-hash": "58ehRzjM/mnSJqXzdSTh6QMtl+TMyL+5b8mP/yVl+qg=",
            "genesis-id": "dockernet-v1",
            "note": "",
            "lease": ""
          },
          {
            "id": "KHO2KRSZXDDQFZTS3U6HU3MZ3FPNJG2NP7DQCGCZGNRHALEIVASQ",
            "asset-transfer-transaction": {
              "asset-id": 1003,
              "amount": null,
              "receiver": "GEGABXV56QKN5RPY4Y7VLI5BXQ3PZYXJLMLPLL2IOUQW5QFH2XPUZPCI6I",
              "sender": "MSIMXYWWXH24UAC3L3YOL5FYLWVBNCPXVMSGCREBR7ZOMN3ASTWBFKSOVA",
              "close-to": "GEGABXV56QKN5RPY4Y7VLI5BXQ3PZYXJLMLPLL2IOUQW5QFH2XPUZPCI6I"
            },
            "first-valid": 17,
            "last-valid": 1017,
            "tx-type": "axfer",
            "fee": 0,
            "sender": "MSIMXYWWXH24UAC3L3YOL5FYLWVBNCPXVMSGCREBR7ZOMN3ASTWBFKSOVA",
            "confirmed-round": 21,
            "round-time": 1710362524,
            "intra-round-offset": 3,
            "genesis-hash": "58ehRzjM/mnSJqXzdSTh6QMtl+TMyL+5b8mP/yVl+qg=",
            "genesis-id": "dockernet-v1",
            "note": "",
            "lease": ""
          },
          {
            "id": "CLUJT546566ZA7N2PVXWSNSI237ZQQCWFLZSKXSMTBL45LCUOI6Q",
            "payment-transaction": {
              "amount": null,
              "receiver": "GEGABXV56QKN5RPY4Y7VLI5BXQ3PZYXJLMLPLL2IOUQW5QFH2XPUZPCI6I",
              "close-amount": 300000,
              "close-remainder-to": "GEGABXV56QKN5RPY4Y7VLI5BXQ3PZYXJLMLPLL2IOUQW5QFH2XPUZPCI6I"
            },
            "first-valid": 17,
            "last-valid": 1017,
            "tx-type": "pay",
            "fee": 0,
            "sender": "MSIMXYWWXH24UAC3L3YOL5FYLWVBNCPXVMSGCREBR7ZOMN3ASTWBFKSOVA",
            "confirmed-round": 21,
            "round-time": 1710362524,
            "intra-round-offset": 4,
            "genesis-hash": "58ehRzjM/mnSJqXzdSTh6QMtl+TMyL+5b8mP/yVl+qg=",
            "genesis-id": "dockernet-v1",
            "note": "",
            "lease": "",
            "closing-amount": 300000
          }
        ]
      },

`````
