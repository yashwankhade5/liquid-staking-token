import { mintTo, getOrCreateAssociatedTokenAccount, getAssociatedTokenAddress, getAccount } from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";
import { PRIVATE_KEY, TOKEN_MINT_ADDRESS } from "./address";

export const mintTokens = async (fromAddress: string, toAddress: string, amount: number) => {
    const connection = new Connection("https://api.devnet.solana.com");
    const Token_Mint_Address= new PublicKey(TOKEN_MINT_ADDRESS)
    const userAddress = new PublicKey(fromAddress)
    const bs58privatekey = bs58.decode(PRIVATE_KEY)
    let ataAddress;
    ataAddress = await getAssociatedTokenAddress(Token_Mint_Address, userAddress)
    const keypair = Keypair.fromSecretKey(bs58privatekey)
    try {
        const ata = await getAccount(connection, ataAddress)
    } catch (err) {
        ataAddress = (await getOrCreateAssociatedTokenAccount(connection, keypair, Token_Mint_Address, userAddress)).address
        const rent = await connection.getMinimumBalanceForRentExemption(165);
        amount = amount - rent;
        
    }
    const c = await mintTo(connection, keypair, Token_Mint_Address, ataAddress, keypair, amount)
   
}



export const burnTokens = async (fromAddress: string, toAddress: string, amount: number) => {
    console.log("Burning tokens");
}



export const sendNativeTokens = async (fromAddress: string, toAddress: string, amount: number) => {
    console.log("Sending native tokens");
}