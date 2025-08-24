import { mintTo, getOrCreateAssociatedTokenAccount, getAssociatedTokenAddress, getAccount,burn } from "@solana/spl-token";
import { Connection, Keypair, PublicKey, SystemProgram, Transaction,sendAndConfirmTransaction } from "@solana/web3.js";
import bs58 from "bs58";
import { PRIVATE_KEY, TOKEN_MINT_ADDRESS, } from "./address";

export const mintTokens = async (fromAddress: string, toAddress: string, amount: number) => {
    const connection = new Connection("https://api.devnet.solana.com");
    const Token_Mint_Address= new PublicKey(TOKEN_MINT_ADDRESS)
    const userAddress = new PublicKey(fromAddress)
    const bs58privatekey = bs58.decode(PRIVATE_KEY)
    let ataAddress = await getAssociatedTokenAddress(Token_Mint_Address, userAddress)
    const keypair = Keypair.fromSecretKey(bs58privatekey)
    try {
        const ata = await getAccount(connection, ataAddress)  // this checks if ATA exist

    } catch (err) {
        ataAddress = (await getOrCreateAssociatedTokenAccount(connection, keypair, Token_Mint_Address, userAddress)).address
        const rent = await connection.getMinimumBalanceForRentExemption(165);
        amount = amount - rent;
        
    }
    console.log("before mint")
    const c = await mintTo(connection, keypair, Token_Mint_Address, ataAddress, keypair, amount)
     console.log("after mint",c)
   
}



export const burnTokens = async (fromAddress: string, toAddress: string, amount: number,tokenAccount:string) => {
    const connection = new Connection("https://api.devnet.solana.com");
    const Token_Mint_Address= new PublicKey(TOKEN_MINT_ADDRESS)
    const decoded = bs58.decode(PRIVATE_KEY)
    const keypair = Keypair.fromSecretKey(decoded)
 const userAddress = new PublicKey(fromAddress)
 const companyaddress = new PublicKey(toAddress)
 const tokenaccount = new PublicKey(tokenAccount)
const c =  await burn(connection,keypair,tokenaccount,Token_Mint_Address,keypair,amount)

    console.log("Burning tokens",c);
}


export const sendNativeTokens = async (fromAddress: string, toAddress: string, amount: number) => {
const connection = new Connection("https://api.devnet.solana.com");
const companyaddress = new PublicKey(toAddress)
const useraddress = new PublicKey(fromAddress)
  const decoded = bs58.decode(PRIVATE_KEY)
    const keypair = Keypair.fromSecretKey(decoded)
const transaction = new Transaction()
const systransfer =  SystemProgram.transfer({
    fromPubkey:companyaddress,
    toPubkey:useraddress,
    lamports:amount
})
transaction.add(systransfer)
const signature = await sendAndConfirmTransaction(connection, transaction,[keypair]);
    console.log("Sending native tokens",signature);
}