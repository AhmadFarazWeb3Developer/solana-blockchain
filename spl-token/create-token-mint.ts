import { createMint } from "@solana/spl-token";
import "dotenv/config";
import {
  getKeypairFromEnvironment,
  getExplorerLink,
} from "@solana-developers/helpers";

import { Connection, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const user = getKeypairFromEnvironment("SECRET_KEY");

const tokenMint = await createMint(connection, user, user.publicKey, null, 2);
const link = getExplorerLink("address", tokenMint.toString(), "devnet");
console.log(`Finished! Created token mint ${link}`);

// Token Mint Address -- "4eBiNBGHUtzT1NEhucncKDC1NprR25tQ825i31G6MqVb"
