
export async function connectSolanaWallet() {
  if (window.solana && window.solana.isPhantom) {
    const resp = await window.solana.connect();
    return resp.publicKey.toString();
  }
  throw new Error("Phantom wallet not found");
}
