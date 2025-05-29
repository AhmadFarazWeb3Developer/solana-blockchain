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
    "BbfnKR32sKqFUFsM1WgwHQ468USUvtAgMJDu33CwQsEw"
  );
  const balance = await connection.getBalance(publicKey);
  const balanceSOL = balance / LAMPORTS_PER_SOL;
  console.log("Balance ", balanceSOL); // 1 sol = 10^9 lamports
};
getBalance();
// console.log(process.env.SECRET_KEY);
