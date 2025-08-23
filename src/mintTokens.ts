import { mintTo,getOrCreateAssociatedTokenAccount, getAssociatedTokenAddress, getAccount } from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";
import { PRIVATE_KEY, TOKEN_MINT_ADDRESS } from "./address";


export const mintTokens = async (fromAddress: string, toAddress: string, amount: number) => {
    const connection = new Connection("https://api.devnet.solana.com");
    console.log(amount)
   const bs58privatekey = bs58.decode(PRIVATE_KEY)
   let ataAdress;
    ataAdress = await getAssociatedTokenAddress(new PublicKey(TOKEN_MINT_ADDRESS),new PublicKey(fromAddress))
    
   const privatkey = Keypair.fromSecretKey(bs58privatekey)
   try{
const ata =await  getAccount(connection,ataAdress)
amount = amount
console.log("after createing ata",amount)

   }catch(err){
ataAdress = await getOrCreateAssociatedTokenAccount(connection,privatkey,new PublicKey(TOKEN_MINT_ADDRESS),new PublicKey(fromAddress))

const rent = await connection.getMinimumBalanceForRentExemption(165);
amount = amount-rent;

ataAdress = ataAdress.address
console.log(ataAdress)

   }
  console.log(amount)

   
    const c = await mintTo(connection,privatkey,new PublicKey(TOKEN_MINT_ADDRESS),ataAdress,privatkey,amount)
    // console.log("Minting tokens",c);
}

export const burnTokens = async (fromAddress: string, toAddress: string, amount: number) => {
    console.log("Burning tokens");
}

export const sendNativeTokens = async (fromAddress: string, toAddress: string, amount: number) => {
    console.log("Sending native tokens");
}