
import { ethers } from 'ethers';
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

export async function connectEvmWallet() {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: { infuraId: "YOUR_INFURA_ID" }
    }
  };
  const web3Modal = new Web3Modal({ cacheProvider: true, providerOptions });
  const instance = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(instance);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  return { provider, signer, address };
}
