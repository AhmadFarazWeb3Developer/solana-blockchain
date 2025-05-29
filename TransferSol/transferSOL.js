import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import "dotenv/config";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// Convert the secret key from .env into a Uint8Array
const parsedSecretKey = JSON.parse(process.env.SECRET_KEY);
const secretKey = Uint8Array.from(parsedSecretKey);
const keyPair = Keypair.fromSecretKey(secretKey);

// make this account active to activate it
const toPublicKey = new PublicKey(
  "BbfnKR32sKqFUFsM1WgwHQ468USUvtAgMJDu33CwQsEw"
);

const transaction = new Transaction();

const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: keyPair.publicKey, // use the actual PublicKey object
  toPubkey: toPublicKey,
  lamports: 100000, // 0.0001 SOL
});

transaction.add(sendSolInstruction);

// Immediately-invoked async function expression (IIFE)
(async () => {
  try {
    const txSignature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [keyPair] // Must be an array of signers
    );
    console.log("Signature:", txSignature);
  } catch (error) {
    console.error("Transaction failed:", error);
  }
})();
