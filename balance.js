import {
  Keypair,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import "dotenv/config";

const connection = new Connection(
  "https://api.devnet.solana.com ",
  "confirmed"
);
const getBalance = async () => {
  const publicKey = new PublicKey(
    "G52w8eNDQTez8WgcdL5R9bUMuMqLgB8bMPP7j7Bztmo2"
  );
  const balance = await connection.getBalance(publicKey);
  const balanceSOL = balance / LAMPORTS_PER_SOL;
  console.log("Balance ", balanceSOL); // 1 sol = 10^9 lamports
};
getBalance();
// console.log(process.env.SECRET_KEY);
