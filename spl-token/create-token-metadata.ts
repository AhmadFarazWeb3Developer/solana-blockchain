import {
  getKeypairFromEnvironment,
  getExplorerLink,
} from "@solana-developers/helpers";
import "dotenv/config";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
} from "@solana/web3.js";
import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";

(async () => {
  // Load user keypair from environment variable
  const user = getKeypairFromEnvironment("SECRET_KEY");
  const connection = new Connection(clusterApiUrl("devnet"));

  console.log(
    `✅ Loaded keypair from .env — Public Key: ${user.publicKey.toBase58()}`
  );

  // Correct Metaplex Token Metadata Program ID
  const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
  );

  // Replace with your actual token mint address
  const tokenMintAccount = new PublicKey(
    "4eBiNBGHUtzT1NEhucncKDC1NprR25tQ825i31G6MqVb"
  );

  // Replace with your actual metadata URI (hosted on IPFS, Arweave, or HTTPS)
  const metadataData = {
    name: "Pak Blocks",
    symbol: "PKBK",
    uri: "https://example.com/metadata.json", // Must be a real URI
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
  };

  // Derive Metadata PDA
  const [metadataPDA] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      tokenMintAccount.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );

  const transaction = new Transaction();

  const createMetadataAccountInstruction =
    createCreateMetadataAccountV3Instruction(
      {
        metadata: metadataPDA,
        mint: tokenMintAccount,
        mintAuthority: user.publicKey,
        payer: user.publicKey,
        updateAuthority: user.publicKey,
      },
      {
        createMetadataAccountArgsV3: {
          collectionDetails: null,
          data: metadataData,
          isMutable: true,
        },
      }
    );

  transaction.add(createMetadataAccountInstruction);

  console.log("🚀 Sending transaction to create metadata account...");

  const transactionSignature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [user]
  );

  const transactionLink = getExplorerLink(
    "transaction",
    transactionSignature,
    "devnet"
  );
  console.log(`✅ Transaction confirmed: ${transactionLink}`);

  const tokenMintLink = getExplorerLink(
    "address",
    tokenMintAccount.toString(),
    "devnet"
  );
  console.log(`🔗 Token Mint: ${tokenMintLink}`);
})();
