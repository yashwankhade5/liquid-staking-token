require('dotenv').config();
import express from 'express';
import { burnTokens, mintTokens, sendNativeTokens } from './mintTokens';
import { LAMPORTS_PER_SOL, Message, PublicKey } from '@solana/web3.js';
import { PRIVATE_KEY, TOKEN_MINT_ADDRESS, PUBLIC_KEY } from "./address";
const app = express();

const VAULT = PUBLIC_KEY
app.use(express.json())

app.post('/helius', async (req, res) => {


  let incomingtx;
  let type;
  let amount;
  let tokenaccount;
  const Httpresponse = req.body

  if (Httpresponse[0].nativeTransfers.length) {
    incomingtx = (Httpresponse[0].nativeTransfers as any[]).find(x => x.toUserAccount === VAULT)
    console.log(incomingtx)
    type = "received_native_sol";
    amount = incomingtx.amount
  }
  else if (Httpresponse[0].tokenTransfers.length) {
    incomingtx = (Httpresponse[0].tokenTransfers as any[]).find(x => x.toUserAccount === VAULT)
    console.log(incomingtx)
    type = "doesnt matter anything";  // this is not required only for developers understanding "undefined" will aslo work
    amount = (incomingtx.tokenAmount) * LAMPORTS_PER_SOL
    tokenaccount = incomingtx.toTokenAccount
  }
  if (!incomingtx) {
    res.json({ "processed": "pr" })
    return
  }

  const fromAddress = incomingtx.fromUserAccount;
  const toAddress = incomingtx.toUserAccount;
  if (type === "received_native_sol") {
    console.log("reached")
    await mintTokens(fromAddress, toAddress, amount);
  } else {
    // What could go wrong here?
    await burnTokens(fromAddress, toAddress, amount, tokenaccount);
    await sendNativeTokens(fromAddress, toAddress, amount);
  }

  res.send('Transaction successful');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});



