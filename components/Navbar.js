
import DarkModeToggle from './DarkModeToggle';

export default function Navbar({ onConnect, walletAddress }) {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#232946] dark:bg-[#181a24] shadow-lg">
      <div className="text-2xl font-bold text-[#00ffa3]">CrossChain Dashboard</div>
      <div className="flex items-center">
        {walletAddress ? (
          <span className="text-[#00ffa3] font-mono mr-4">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
        ) : (
          <button
            className="bg-[#00ffa3] text-[#232946] px-4 py-2 rounded-lg font-bold mr-4 hover:bg-[#00e693] transition"
            onClick={() => onConnect('evm')}
          >
            Connect Wallet
          </button>
        )}
        <DarkModeToggle />
      </div>
    </nav>
  );
}
