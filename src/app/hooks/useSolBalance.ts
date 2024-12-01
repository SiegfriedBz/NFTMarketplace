"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";

export default function useSolBalance() {
  const [solBalance, setSolBalance] = useState<number | null>(null);

  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const walletAddress = publicKey?.toString();

  useEffect(() => {
    if (!walletAddress) return;

    (async () => {
      try {
        const publicKey = new PublicKey(walletAddress);
        const lamports = await connection.getBalance(publicKey);

        const sol = lamports / 1e9;

        setSolBalance(sol);
      } catch (err) {
        console.error("Error fetchBalance", err);
      }
    })();
  }, [walletAddress, connection]);

  return solBalance;
}
