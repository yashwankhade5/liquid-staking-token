require('dotenv').config();
import express from 'express';
import { burnTokens, mintTokens, sendNativeTokens } from './mintTokens';

const app = express();

const Httpresponse = 
{  "nativeTransfers": [ { "amount": 1000000000, "fromUserAccount": "GmqBh3hA6Nndg9egWCGv4YbgMFbwhrrUrwdMFwFQuE8b", "toUserAccount": "B4ouTYDDw9cvDwWC9Cgqa6Ah8cDhV3RAWgr73AamiHSk" } ],  }
const VAULT =`B4ouTYDDw9cvDwWC9Cgqa6Ah8cDhV3RAWgr73AamiHSk`

app.post('/helius', async(req, res) => {
    const incomingtx = Httpresponse.nativeTransfers.find(x=>x.toUserAccount===VAULT)
    if (!incomingtx) {
        res.json({"processed":"pr"})
        return
    }
    console.log("hit the route")
    const fromAddress = incomingtx.fromUserAccount;
    const toAddress = incomingtx.toUserAccount;
    const amount = incomingtx.amount;
    const type = "received_native_sol";

    if (type === "received_native_sol") {
        await mintTokens(fromAddress, toAddress, amount);
    } else {
        // What could go wrong here?
        await burnTokens(fromAddress, toAddress, amount);
        await sendNativeTokens(fromAddress, toAddress, amount);
    }

    res.send('Transaction successful');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});