import { mintTo } from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";
import { PRIVATE_KEY, TOKEN_MINT_ADDRESS } from "./address";
export const mintTokens = async (fromAddress: string, toAddress: string, amount: number) => {
    const connection = new Connection("https://api.devnet.solana.com");
    
   const bs58privatekey = bs58.decode(PRIVATE_KEY)
    
   const privatkey = Keypair.fromSecretKey(bs58privatekey)
   
    const c = mintTo(connection,privatkey,new PublicKey(TOKEN_MINT_ADDRESS),new PublicKey(fromAddress),privatkey,amount)
    console.log("Minting tokens",c);
}

export const burnTokens = async (fromAddress: string, toAddress: string, amount: number) => {
    console.log("Burning tokens");
}

export const sendNativeTokens = async (fromAddress: string, toAddress: string, amount: number) => {
    console.log("Sending native tokens");
}