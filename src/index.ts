require('dotenv').config();
import express from 'express';
import { burnTokens, mintTokens, sendNativeTokens } from './mintTokens';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

const app = express();

const Httpresponse = [
  {
    "accountData": [
      {
        "account": "GmqBh3hA6Nndg9egWCGv4YbgMFbwhrrUrwdMFwFQuE8b",
        "nativeBalanceChange": -80001,
        "tokenBalanceChanges": []
      },
      {
        "account": "9T4j1h9e9MiAABLARbEgrruote6g6Fd4EgobmJvsVE3p",
        "nativeBalanceChange": 0,
        "tokenBalanceChanges": [
          {
            "mint": "DNsixxb5ERannuurLjKE69JEoFApsRbfTYfhEdsKQ6Q4",
            "rawTokenAmount": {
              "decimals": 9,
              "tokenAmount": "-1000000000"
            },
            "tokenAccount": "9T4j1h9e9MiAABLARbEgrruote6g6Fd4EgobmJvsVE3p",
            "userAccount": "GmqBh3hA6Nndg9egWCGv4YbgMFbwhrrUrwdMFwFQuE8b"
          }
        ]
      },
      {
        "account": "EPgrYddNpPw82CKfj3bT5yyHt14vEPVF6kwnqPTSm6av",
        "nativeBalanceChange": 0,
        "tokenBalanceChanges": [
          {
            "mint": "DNsixxb5ERannuurLjKE69JEoFApsRbfTYfhEdsKQ6Q4",
            "rawTokenAmount": {
              "decimals": 9,
              "tokenAmount": "1000000000"
            },
            "tokenAccount": "EPgrYddNpPw82CKfj3bT5yyHt14vEPVF6kwnqPTSm6av",
            "userAccount": "HGEkZnaCAg6USfEjgZndEZRvCVCkaRR8cxwhkmucKqXN"
          }
        ]
      },
      {
        "account": "ComputeBudget111111111111111111111111111111",
        "nativeBalanceChange": 0,
        "tokenBalanceChanges": []
      },
      {
        "account": "DNsixxb5ERannuurLjKE69JEoFApsRbfTYfhEdsKQ6Q4",
        "nativeBalanceChange": 0,
        "tokenBalanceChanges": []
      },
      {
        "account": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        "nativeBalanceChange": 0,
        "tokenBalanceChanges": []
      }
    ],
    "description": "GmqBh3hA6Nndg9egWCGv4YbgMFbwhrrUrwdMFwFQuE8b transferred 1 DNsixxb5ERannuurLjKE69JEoFApsRbfTYfhEdsKQ6Q4 to HGEkZnaCAg6USfEjgZndEZRvCVCkaRR8cxwhkmucKqXN.",
    "events": {},
    "fee": 80001,
    "feePayer": "GmqBh3hA6Nndg9egWCGv4YbgMFbwhrrUrwdMFwFQuE8b",
    "instructions": [
      {
        "accounts": [],
        "data": "3P9srQMF9wRR",
        "innerInstructions": [],
        "programId": "ComputeBudget111111111111111111111111111111"
      },
      {
        "accounts": [],
        "data": "FrYDfD",
        "innerInstructions": [],
        "programId": "ComputeBudget111111111111111111111111111111"
      },
      {
        "accounts": [
          "9T4j1h9e9MiAABLARbEgrruote6g6Fd4EgobmJvsVE3p",
          "DNsixxb5ERannuurLjKE69JEoFApsRbfTYfhEdsKQ6Q4",
          "EPgrYddNpPw82CKfj3bT5yyHt14vEPVF6kwnqPTSm6av",
          "GmqBh3hA6Nndg9egWCGv4YbgMFbwhrrUrwdMFwFQuE8b",
          "GmqBh3hA6Nndg9egWCGv4YbgMFbwhrrUrwdMFwFQuE8b"
        ],
        "data": "g7Xr2JSzc4cmW",
        "innerInstructions": [],
        "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
      }
    ],
    "nativeTransfers": [],
    "signature": "5yipQtMwJnFu2mzJhVGQx7uGxz6Z6tL8UjqN9ymjqMDfKJfTzT7LqDefpAJoGsjar5fCLbT9uFZ1J9Y1Y3d5weMZ",
    "slot": 403236351,
    "source": "SOLANA_PROGRAM_LIBRARY",
    "timestamp": 1756032572,
    "tokenTransfers": [
      {
        "fromTokenAccount": "9T4j1h9e9MiAABLARbEgrruote6g6Fd4EgobmJvsVE3p",
        "fromUserAccount": "GmqBh3hA6Nndg9egWCGv4YbgMFbwhrrUrwdMFwFQuE8b",
        "mint": "DNsixxb5ERannuurLjKE69JEoFApsRbfTYfhEdsKQ6Q4",
        "toTokenAccount": "EPgrYddNpPw82CKfj3bT5yyHt14vEPVF6kwnqPTSm6av",
        "toUserAccount": "HGEkZnaCAg6USfEjgZndEZRvCVCkaRR8cxwhkmucKqXN",
        "tokenAmount": 1,
        "tokenStandard": "Fungible"
      }
    ],
    "transactionError": null,
    "type": "TRANSFER"
  }
]
const VAULT =`HGEkZnaCAg6USfEjgZndEZRvCVCkaRR8cxwhkmucKqXN`

app.post('/helius', async(req, res) => {
    let incomingtx;
    let type;
    let amount;
    let tokenaccount;
    if (Httpresponse[0].nativeTransfers.length){
    incomingtx = (Httpresponse[0].nativeTransfers as any[]).find(x=>x.toUserAccount===VAULT)
    console.log(incomingtx)
    type = "received_native_sol";
    amount = incomingtx.amount
    }
    else if (Httpresponse[0].tokenTransfers.length){
incomingtx=(Httpresponse[0].tokenTransfers as any[]).find(x => x.toUserAccount === VAULT)
console.log(incomingtx)
type = "doesnt matter anything";  // this is not required only for developers understanding "undefined" will aslo work
amount =  (incomingtx.tokenAmount)*LAMPORTS_PER_SOL
tokenaccount = incomingtx.toTokenAccount
    }
    if (!incomingtx) {
        res.json({"processed":"pr"})
        return
    }

    const fromAddress = incomingtx.fromUserAccount;
    const toAddress = incomingtx.toUserAccount;
    
    
    

    if (type === "received_native_sol") {
        console.log("reached")
        await mintTokens(fromAddress, toAddress, amount);
    } else {
        // What could go wrong here?
        await burnTokens(fromAddress, toAddress, amount,tokenaccount);
        await sendNativeTokens(fromAddress, toAddress, amount);
    }

    res.send('Transaction successful');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});