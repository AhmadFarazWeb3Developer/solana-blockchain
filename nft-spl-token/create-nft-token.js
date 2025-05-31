const {
    Connection,
    Keypair,
    clusterApiUrl,
    Transaction,
    sendAndConfirmTransaction,
    PublicKey,
  } = require("@solana/web3.js");
  
  const {
    createMint,
    getOrCreateAssociatedTokenAccount,
    mintTo,
  } = require("@solana/spl-token");
  
  const {
    createCreateMetadataAccountV3Instruction,
    DataV2,
    PROGRAM_ID: METADATA_PROGRAM_ID,
  } = require("@metaplex-foundation/mpl-token-metadata");
  
  (async () => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const payer = Keypair.generate();
    const airdropSig = await connection.requestAirdrop(payer.publicKey, 2e9);
    await connection.confirmTransaction(airdropSig, "confirmed");
    console.log("Airdropped SOL to:", payer.publicKey.toBase58());
  
    // 1️⃣ Create NFT mint (0 decimals, supply = 1)
    const mint = await createMint(
      connection,
      payer,
      payer.publicKey,
      payer.publicKey,
      0
    );
    console.log("NFT Mint Address:", mint.toBase58());
  
    // 2️⃣ Create token account to hold NFT
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      payer.publicKey
    );
  
    // 3️⃣ Mint 1 token to the wallet (NFT)
    await mintTo(
      connection,
      payer,
      mint,
      tokenAccount.address,
      payer.publicKey,
      1
    );
    console.log("NFT minted to:", tokenAccount.address.toBase58());
  
    // 4️⃣ Create metadata account (Metaplex)
    const [metadataPDA] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("metadata"),
        METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
      ],
      METADATA_PROGRAM_ID
    );
  
    const metadataData = {
      name: "My Client NFT",
      symbol: "MYNFT",
      uri: "https://arweave.net/YOUR_JSON_METADATA_HERE", // Replace with real JSON URI
      sellerFeeBasisPoints: 500,
      creators: null,
      collection: null,
      uses: null,
    };
  
    const metadataIx = createCreateMetadataAccountV3Instruction(
      {
        metadata: metadataPDA,
        mint,
        mintAuthority: payer.publicKey,
        payer: payer.publicKey,
        updateAuthority: payer.publicKey,
      },
      {
        createMetadataAccountArgsV3: {
          data: metadataData,
          isMutable: true,
          collectionDetails: null,
        },
      }
    );
  
    const tx = new Transaction().add(metadataIx);
    await sendAndConfirmTransaction(connection, tx, [payer]);
  
    console.log("NFT metadata created!");
  })();
  