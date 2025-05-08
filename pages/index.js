
import React, { useState } from 'react';
import useSWR from 'swr';
import Navbar from '../components/Navbar';
import PortfolioTable from '../components/PortfolioTable';
import PortfolioPieChart from '../components/PortfolioPieChart';
import TransactionTable from '../components/TransactionTable';
import TaxSummary from '../components/TaxSummary';
import { connectEvmWallet } from '../lib/wallet';
import { connectSolanaWallet } from '../lib/solanaWallet';
import { fetchPortfolio } from '../lib/fetchPortfolio';
import { fetchTransactions } from '../lib/fetchTransactions';
import { calculateTax } from '../lib/taxReport';
import { motion } from 'framer-motion';

const fetcher = async (address) => {
  if (!address) return { portfolio: [], transactions: [], taxReport: [] };
  const portfolio = await fetchPortfolio(address);
  const transactions = await fetchTransactions(address);
  const taxReport = calculateTax(transactions);
  return { portfolio, transactions, taxReport };
};

export default function Home() {
  const [wallet, setWallet] = useState(null);
  const [chain, setChain] = useState('evm');
  const { data, mutate } = useSWR(wallet, fetcher, { refreshInterval: 10000 });

  async function handleConnect(chainType) {
    setChain(chainType);
    let address = null;
    if (chainType === 'evm') {
      const result = await connectEvmWallet();
      address = result.address;
    } else {
      address = await connectSolanaWallet();
    }
    setWallet(address);
    mutate();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1f36] to-[#232946] text-white">
      <Navbar onConnect={handleConnect} walletAddress={wallet} />
      <main className="max-w-5xl mx-auto py-8 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {!wallet && (
            <div className="text-center text-lg text-[#00ffa3] mt-20">
              <button
                className="bg-[#00ffa3] text-[#232946] px-6 py-3 rounded-lg font-bold mr-4 hover:bg-[#00e693] transition"
                onClick={() => handleConnect('evm')}
              >
                Connect EVM Wallet
              </button>
              <button
                className="bg-[#627eea] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#4e63b6] transition"
                onClick={() => handleConnect('solana')}
              >
                Connect Solana Wallet
              </button>
            </div>
          )}
          {wallet && (
            <>
              <h1 className="text-3xl font-bold mb-6 text-[#00ffa3]">Portfolio Overview</h1>
              <PortfolioPieChart data={data?.portfolio || []} />
              <PortfolioTable data={data?.portfolio || []} />
              <h2 className="text-2xl font-bold mt-10 mb-4 text-[#00ffa3]">Transaction History</h2>
              <TransactionTable data={data?.transactions || []} />
              <h2 className="text-2xl font-bold mt-10 mb-4 text-[#00ffa3]">Tax Summary</h2>
              <TaxSummary report={data?.taxReport || []} />
            </>
          )}
        </motion.div>
      </main>
    </div>
  );
}
