/**
 * FlowTalos — Landing Page
 * ==========================
 * Marketing landing page for unauthenticated visitors. Features:
 *   - Floating Navbar with wallet connect (RainbowKit)
 *   - Hero section with animated gradient headlines
 *   - Live Market Ticker (CoinGecko real-time via marquee)
 *   - Protocol Stats (TVL, agents, volume, proofs)
 *   - Features Bento Grid (Talos AI, Glass-Box, Lit PKPs, Walletless UX)
 *   - Philosophy section with Glass-Box reasoning JSON preview
 *   - How It Works 4-step pipeline
 *   - Interactive Agent Simulation (6-step live execution demo)
 *   - CTA with custom ConnectButton
 *   - Footer with tech links and resources
 *
 * Auto-redirects to /dashboard when a wallet is connected.
 *
 * @module page (landing)
 */

"use client";

import { useState, useEffect } from "react";
import { Activity, ShieldCheck, Database, Zap, ArrowRight, Lock, Workflow, ChevronDown, CheckCircle2, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';

// --- Custom Hooks & Utils ---


// --- Components ---

// Premium Glow Card for Bento Grid
const GlowCard = ({ children, className = "", delay = 0, style }: { children: React.ReactNode, className?: string, delay?: number, style?: React.CSSProperties }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`glass-panel rounded-[2.5rem] relative overflow-hidden group border-white/5 transition-colors ${className}`}
      style={style}
    >
      <div
        className="absolute inset-0 z-0 transition-opacity duration-500 ease-in-out pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`
        }}
      />
      <div className="absolute inset-0 z-0 transition-opacity duration-500 ease-in-out pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(18, 201, 138, 0.08), transparent 40%)`
        }}
      />
      {children}
    </motion.div>
  );
};

// 1. Navigation Bar (Floating Island)
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 w-full pointer-events-none">
      <nav className={`pointer-events-auto transition-all duration-500 w-full max-w-4xl rounded-full ${scrolled ? 'bg-[#020a06]/90 backdrop-blur-xl border border-emerald-500/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] py-4 px-6' : 'bg-transparent py-4 px-6'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-emerald-300 flex items-center justify-center p-[1px] shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-[#020a06] rounded-full flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="FlowTalos Mascot" className="w-[120%] h-[120%] object-cover mix-blend-screen opacity-90" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-widest text-white">Flow<span className="text-brand-primary font-normal">Talos</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#philosophy" className="text-slate-300 hover:text-white transition-colors relative group">
              Philosophy
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#how-it-works" className="text-slate-300 hover:text-white transition-colors relative group">
              Architecture
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <ConnectButton
              chainStatus="icon"
              showBalance={{ smallScreen: false, largeScreen: true }}
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

// 2. Hero Section
const Hero = () => {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center pt-32 pb-12 px-6 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-primary/15 rounded-full blur-[120px] mix-blend-screen animate-float pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px] mix-blend-screen animate-float-delayed pointer-events-none"></div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto text-center z-10 flex-grow flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-pill mb-10 text-sm font-semibold text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.15)] bg-emerald-950/30 backdrop-blur-xl">
            <SparkleIcon className="w-4 h-4" />
            <span>The next generation of <strong className="text-white">Automated Wealth</strong></span>
          </div>
        </motion.div>

        <motion.h1
          className="text-6xl sm:text-8xl md:text-[7.5rem] font-extrabold tracking-tighter mb-8 leading-[1]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Consumer DeFi. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-600 pb-2 inline-block drop-shadow-[0_0_30px_rgba(16,185,129,0.4)]">Fully Autonomous.</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          FlowTalos is a Glass-Box AI agent. Tell it what you want in human language. Deploy into Momentum Arbitrage or LP Yield Vaults. It pays your gas fees and <strong className="text-slate-200 font-medium">cryptographically publishes its decisions to IPFS.</strong>
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <button className="w-full sm:w-auto px-8 py-4 bg-emerald-500 text-emerald-950 font-bold rounded-full hover:bg-emerald-400 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2">
            Enter AI Dashboard <ArrowRight className="w-5 h-5" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 glass-pill text-white font-medium hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center justify-center gap-2 group">
            Explore Architecture <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Ecosystem Logos */}
      <motion.div
        className="w-full max-w-5xl mx-auto mt-12 pt-8 border-t border-white/5 text-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-6">Powered by Decentralized Infrastructure</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-3 font-bold text-xl"><img src="/flow-logo.svg" alt="Flow" className="w-8 h-8" /> FLOW</div>
          <div className="flex items-center gap-3 font-bold text-xl"><img src="/storacha-logo.svg" alt="Storacha" className="w-8 h-8" /> STORACHA</div>
          <div className="flex items-center gap-3 font-bold text-xl"><img src="/lit-logo.svg" alt="Lit Protocol" className="w-7 h-7" /> LIT PROTOCOL</div>
          <div className="flex items-center gap-3 font-bold text-xl uppercase tracking-widest">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-emerald-300 flex items-center justify-center p-[1px]">
              <div className="w-full h-full bg-[#020a06] rounded-full flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="FlowTalos" className="w-[120%] h-[120%] object-cover mix-blend-screen opacity-90" />
              </div>
            </div>
            <span>FLOW<span className="text-brand-primary font-normal">TALOS</span> AI</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// 2.5 Live Market Ticker (Marquee) — Real-Time CoinGecko Data
const MarketTicker = () => {
  const [assets, setAssets] = useState([
    { symbol: "FLOW", price: "—", change: "0.0%" },
    { symbol: "USDC", price: "—", change: "0.0%" },
    { symbol: "BTC", price: "—", change: "0.0%" },
    { symbol: "ETH", price: "—", change: "0.0%" },
    { symbol: "SOL", price: "—", change: "0.0%" },
  ]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=flow,usd-coin,bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true"
        );
        const data = await res.json();

        const format = (id: string, symbol: string) => {
          const price = data[id]?.usd;
          const change = data[id]?.usd_24h_change;
          if (!price) return { symbol, price: "—", change: "0.0%" };

          const formattedPrice = price >= 1000
            ? price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            : price < 1
              ? price.toFixed(4)
              : price.toFixed(2);

          const sign = change >= 0 ? "+" : "";
          return {
            symbol,
            price: formattedPrice,
            change: `${sign}${change?.toFixed(1) ?? "0.0"}%`,
          };
        };

        setAssets([
          format("flow", "FLOW"),
          format("usd-coin", "USDC"),
          format("bitcoin", "BTC"),
          format("ethereum", "ETH"),
          format("solana", "SOL"),
        ]);
      } catch (err) {
        console.error("Failed to fetch live prices:", err);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#020a06]/90 border-y border-emerald-500/5 py-3 overflow-hidden flex relative z-20">
      <div className="absolute left-0 w-32 h-full bg-gradient-to-r from-[#020a06] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 w-32 h-full bg-gradient-to-l from-[#020a06] to-transparent z-10 pointer-events-none"></div>

      <motion.div
        className="flex whitespace-nowrap gap-12 px-6"
        animate={{ x: [0, -1035] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
      >
        {[...assets, ...assets, ...assets].map((asset, i) => (
          <div key={i} className="flex items-center gap-3 font-mono text-sm">
            <span className="text-slate-400 font-bold">{asset.symbol}</span>
            <span className="text-white">${asset.price}</span>
            <span className={asset.change.startsWith('+') ? 'text-brand-primary' : asset.change.startsWith('-') ? 'text-red-400' : 'text-slate-500'}>
              {asset.change}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// 2.7 Protocol Stats 
const ProtocolStats = () => {
  return (
    <section className="py-20 px-6 relative z-10 bg-[#020a06]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-white/5">
          <div className="text-center px-4">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Total Value Secured</p>
            <h4 className="text-4xl md:text-5xl font-mono font-bold text-white">$12.4M<span className="text-brand-primary text-2xl">+</span></h4>
          </div>
          <div className="text-center px-4">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Active AI Agents</p>
            <h4 className="text-4xl md:text-5xl font-mono font-bold text-white">4,820</h4>
          </div>
          <div className="text-center px-4">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">30D Trading Vol</p>
            <h4 className="text-4xl md:text-5xl font-mono font-bold text-white">$45.1M</h4>
          </div>
          <div className="text-center px-4">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Proofs Pinned</p>
            <h4 className="text-4xl md:text-5xl font-mono font-bold text-emerald-300">1.2M</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

// 3. Features Section (Bento Grid)
const Features = () => {
  return (
    <section id="features" className="py-32 px-6 relative z-10 bg-[#020a06]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center md:text-left flex flex-col md:flex-row gap-10 justify-between items-end">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tighter">
              Consumer DeFi, <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-600">Upgraded.</span>
            </h2>
            <p className="text-slate-400 text-xl font-light leading-relaxed">The holy trinity of modern web3: Speed, Intelligence, and Provable Transparency.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[360px]">
          {/* Card 1: Wide */}
          <GlowCard className="md:col-span-2 bg-gradient-to-br from-emerald-950/60 to-emerald-900/20">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-primary/20 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none transition-opacity group-hover:opacity-100 opacity-50"></div>
            <div className="relative z-10 flex flex-col h-full justify-between p-10 pointer-events-none">
              <div className="w-16 h-16 mb-6 p-2 bg-brand-primary/20 rounded-2xl border border-brand-primary/30 shadow-[0_0_20px_rgba(18,201,138,0.3)] flex items-center justify-center overflow-hidden shrink-0">
                <img src="/logo.png" alt="Talos AI" className="w-[130%] h-[130%] object-cover mix-blend-screen origin-center opacity-90" />
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Talos AI Engine</h3>
                <p className="text-slate-300 text-lg leading-relaxed max-w-lg">Off-chain models analyze market geometry and execute smart trades without emotional bias, trained extensively on Flow historical data.</p>
              </div>
            </div>
          </GlowCard>

          {/* Card 2: Tall */}
          <GlowCard delay={0.1} className="md:col-span-1 md:row-span-2 bg-gradient-to-b from-emerald-800/20 to-emerald-950/60">
            <div className="absolute top-0 right-0 w-full h-1/2 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            <div className="relative z-10 flex-grow flex flex-col justify-end p-10 pointer-events-none">
              <div className="w-16 h-16 mb-6 p-3 bg-emerald-500/15 rounded-2xl border border-emerald-500/25 shadow-[0_0_20px_rgba(16,185,129,0.2)] flex items-center justify-center shrink-0">
                <img src="/filecoin-logo.svg" alt="Storacha Pinning" className="w-full h-full opacity-90" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Glass-Box Reasoning</h3>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">No black boxes. The decision logic is pinned to Filecoin via Storacha before execution. You can audit the mathematical &quot;thoughts&quot; of the agent.</p>
              <div className="px-4 py-3 rounded-xl bg-emerald-950/80 border border-emerald-500/10 font-mono text-xs text-emerald-400 overflow-hidden text-ellipsis whitespace-nowrap pointer-events-auto shadow-inner">
                ipfs://bafybeig...q4m/log.json
              </div>
            </div>
          </GlowCard>

          {/* Card 3: Normal */}
          <GlowCard delay={0.2} className="bg-emerald-950/40 p-10 flex flex-col justify-between">
            <div className="pointer-events-none">
              <img src="/lit-logo.svg" alt="Lit Protocol" className="w-12 h-12 mb-6 opacity-80" />
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">Lit Protocol PKPs</h3>
                <p className="text-slate-400 font-light">Decentralized Key Management ensures the AI trades securely without owning your core assets.</p>
              </div>
            </div>
          </GlowCard>

          {/* Card 4: Normal */}
          <GlowCard delay={0.3} className="bg-emerald-950/40 p-10 flex flex-col justify-between">
            <div className="pointer-events-none">
              <img src="/flow-logo.svg" alt="Flow Blockchain" className="w-12 h-12 mb-6 opacity-80" />
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">Walletless & Gasless UX</h3>
                <p className="text-slate-400 font-light">Experience true Consumer DeFi. Abstracted wallets and zero gas fees—completely sponsored by the protocol.</p>
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
};

// 4. Philosophy Section (Text/Image Split)
const Philosophy = () => {
  return (
    <section id="philosophy" className="py-32 px-6 relative z-10 bg-emerald-950/30 border-y border-emerald-500/5">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
        <motion.div
          className="lg:w-1/2 space-y-10"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400 uppercase tracking-widest shadow-inner">
            The Core Ethos
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
            Trust in AI requires <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-200 to-white pb-2 inline-block">Cryptographic Proof.</span>
          </h2>
          <div className="space-y-6">
            <p className="text-slate-400 text-[1.1rem] font-light leading-relaxed">
              Traditional algorithmic trading bots operate in the dark. Users provide capital, and the bot executes trades without explaining <em className="italic text-slate-300">why</em>.
            </p>
            <p className="text-slate-400 text-[1.1rem] font-light leading-relaxed">
              FlowTalos completely flips this paradigm. We call it <strong className="text-white font-medium">Glass-Box AI</strong>. Every decision mathematical models make is translated into human-readable text and cryptographically anchored to IPFS via Storacha. You don&apos;t just see the trades; you see the exact reasoning behind them.
            </p>
          </div>
          <ul className="space-y-5 pt-4">
            {[
              "Non-custodial by default via Flow Cadence.",
              "Immutable audit trails for every agent action.",
              "Fully automated execution via Lit Actions."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4 text-slate-300">
                <CheckCircle2 className="w-6 h-6 text-brand-primary shrink-0 mt-0.5" />
                <span className="text-lg font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="lg:w-1/2 w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Glass-Box AI Audit Window */}
          <div className="glass-panel rounded-2xl overflow-hidden border-slate-700/50 shadow-2xl relative">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>
            <div className="flex items-center gap-2 px-4 py-3 bg-[#020a06]/90 border-b border-emerald-500/10">
              <div className="flex gap-1.5 object-start">
                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              </div>
              <span className="text-xs font-mono text-slate-500 ml-auto">ipfs://bafybeig...q4m/reasoning.json</span>
            </div>
            <div className="p-6 bg-[#010805] font-mono text-sm leading-relaxed overflow-x-auto text-slate-300">
              <div className="text-brand-primary mb-4">{`// Published by Talos AI Agent to Storacha`}</div>
              <div><span className="text-emerald-500">{"{"}</span></div>
              <div className="pl-4">
                <span className="text-emerald-300">&quot;timestamp&quot;</span>: <span className="text-emerald-200/70">&quot;2026-03-01T14:32:00Z&quot;</span>,
              </div>
              <div className="pl-4">
                <span className="text-emerald-300">&quot;asset&quot;</span>: <span className="text-emerald-200/70">&quot;FLOW/USDC&quot;</span>,
              </div>
              <div className="pl-4">
                <span className="text-emerald-300">&quot;action&quot;</span>: <span className="text-emerald-200/70">&quot;BUY&quot;</span>,
              </div>
              <div className="pl-4">
                <span className="text-emerald-300">&quot;amount&quot;</span>: <span className="text-green-300">150.00</span>,
              </div>
              <div className="pl-4">
                <span className="text-emerald-300">&quot;reasoning&quot;</span>: <span className="text-emerald-200/70">&quot;Technical indicators show strong divergence. RSI dropped to 28.5 (oversold territory) while MACD histogram indicates slowing bearish momentum. Executing partial position sizing to capture anticipated mean reversion within the next 12 hours.&quot;</span>,
              </div>
              <div className="pl-4">
                <span className="text-emerald-300">&quot;lit_signature&quot;</span>: <span className="text-emerald-200/70">&quot;0x4f82...ec21&quot;</span>
              </div>
              <div><span className="text-emerald-500">{"}"}</span></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// 4.5 How It Works (Simple Visual Flow)
const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      title: "Deposit into AI Vaults",
      desc: "Link your wallet and deposit USDC or FLOW into FlowTalos Vaults. You maintain full ownership at all times.",
      icon: <Lock className="w-8 h-8 text-emerald-400" />
    },
    {
      num: "02",
      title: "Human Language Intent",
      desc: "Type what you want to achieve. Talos AI translates your human language into an optimized Cadence strategy.",
      icon: <Terminal className="w-8 h-8 text-emerald-400" />
    },
    {
      num: "03",
      title: "Verifiable Proof",
      desc: "Before executing, the AI's exact reasoning is pinned to IPFS. Anyone can verify why the trade was made.",
      icon: <CheckCircle2 className="w-8 h-8 text-emerald-400" />
    },
    {
      num: "04",
      title: "Gasless Execution",
      desc: "Lit Protocol signs the transaction and executes the trade on Flow. Gas is 100% sponsored, for a seamless UX.",
      icon: <Activity className="w-8 h-8 text-emerald-400" />
    }
  ];

  return (
    <section className="py-24 px-6 relative z-10 bg-[#010805]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">How <span className="text-brand-primary">FlowTalos</span> Works</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">A seamless, trustless loop from deposit to automated yield.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[4.5rem] left-[10%] right-[10%] h-0.5 bg-emerald-500/20 z-0"></div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 rounded-full bg-[#020a06] border-2 border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)] flex items-center justify-center mb-6 group-hover:border-emerald-500/50 group-hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] transition-all duration-300 relative">
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-emerald-500 text-[#020a06] font-bold flex items-center justify-center text-sm">
                  {step.num}
                </div>
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 5. Interactive Simulation Section
const AgentPreview = () => {
  const [logs, setLogs] = useState<{ time: string, message: string, type: 'info' | 'action' | 'success' | 'warning' }[]>([]);
  const [isAgentActive, setIsAgentActive] = useState(false);
  const [step, setStep] = useState(0);

  const startAgent = () => {
    setIsAgentActive(true);
    setLogs([]);
    setStep(1);

    const sequence = [
      { t: 0, msg: "Initializing FlowTalos Terminal...", type: "info" as const },
      { t: 1000, msg: "User Intent: 'Create a Scheduled Savings Vault deducting 10 FLOW weekly'", type: "success" as const, s: 2 },
      { t: 2500, msg: "Talos AI: Translating natural language to Flow Cadence...", type: "action" as const },
      { t: 4000, msg: "Cadence Transaction Built. Checking Sponsored Gas limits...", type: "success" as const, s: 3 },
      { t: 5000, msg: "Storacha: Pinning reasoning log to Filecoin network...", type: "info" as const },
      { t: 7000, msg: "Storacha: Immutable CID generated via Web3.Storage bridging.", type: "success" as const, s: 4 },
      { t: 8500, msg: "Lit Protocol: Validating CID via secure enclaves (Lit Action)...", type: "action" as const },
      { t: 10000, msg: "Lit Protocol: PKP generated ECDSA signature for Cadence TX.", type: "success" as const, s: 5 },
      { t: 12000, msg: "Flow Network: Savings Vault initialized. Gas Sponsored by FlowTalos.", type: "success" as const, s: 6 },
    ];

    sequence.forEach((item) => {
      setTimeout(() => {
        const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 });
        setLogs(prev => [...prev, { time, message: item.msg, type: item.type }]);
        if (item.s) setStep(item.s);
      }, item.t);
    });

    setTimeout(() => setIsAgentActive(false), 12500);
  };

  return (
    <section id="how-it-works" className="py-32 px-6 relative z-10 overflow-hidden bg-[#010805]">
      {/* Background Effects */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="max-w-[85rem] mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-6 shadow-inner">
              Runtime Simulation
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight">The Architecture of <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-200 to-white">Autonomy</span></h2>
            <p className="text-slate-400 text-lg md:text-xl font-light max-w-3xl mx-auto">
              Watch how FlowTalos securely coordinates across four decentralized networks to execute a single, trustless trade.
            </p>
          </motion.div>
        </div>

        {/* The Dashboard / Terminal */}
        <motion.div
          className="w-full mx-auto relative group mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {/* Dashboard Outer Glow */}
          <div className={`absolute -inset-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0 rounded-[2.5rem] blur-2xl transition-all duration-1000 ${isAgentActive ? 'opacity-100 scale-105' : 'opacity-0 scale-100'} pointer-events-none -z-10`}></div>

          <div className="glass-panel p-2 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-[#020a06]/90 border-emerald-500/20 relative flex flex-col z-10 backdrop-blur-2xl">

            {/* Top Bar */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-emerald-500/10 bg-[#010805]/80 rounded-t-2xl">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isAgentActive ? 'bg-emerald-400' : 'bg-slate-600'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isAgentActive ? 'bg-emerald-500' : 'bg-slate-500'}`}></span>
                </span>
                <span className="text-[11px] uppercase text-emerald-500 font-bold tracking-[0.2em]">{isAgentActive ? 'Execution Engine Online' : 'Engine Standby'}</span>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="flex flex-col md:flex-row p-2 gap-2">

              {/* Left Column: Controls & Metrics */}
              <div className="w-full md:w-1/3 flex flex-col gap-2">
                <div className="bg-[#010805] rounded-xl border border-emerald-500/10 p-6 shadow-inner flex flex-col justify-center items-center text-center">
                  <p className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest">Target Strategy Asset</p>
                  <div className="flex items-center gap-3 mb-6">
                    <img src="/flow-logo.svg" alt="FLOW" className="w-8 h-8 opacity-90 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    <span className="text-2xl text-white font-mono font-bold tracking-tight">FLOW/USDC</span>
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6"></div>

                  <p className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest">Vault Balance</p>
                  <h3 className="text-4xl font-bold font-mono text-emerald-400 tracking-tight flex items-baseline gap-1 mb-8">
                    <span className="text-xl text-emerald-500/50">$</span>
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={step === 6 ? 'updated' : 'initial'}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                      >
                        {(1450.00 + (step === 6 ? 1500 * 0.98 : 0)).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </motion.span>
                    </AnimatePresence>
                  </h3>

                  <button
                    onClick={startAgent}
                    disabled={isAgentActive}
                    className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2
                      ${isAgentActive
                        ? 'bg-emerald-950/30 text-emerald-600/50 cursor-not-allowed border border-emerald-900/50'
                        : 'bg-emerald-500 text-emerald-950 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] hover:bg-emerald-400'
                      }`}
                  >
                    {isAgentActive ? <><Workflow className="w-4 h-4 animate-spin" /> Executing...</> : <><Zap className="w-4 h-4" /> Start Simulation</>}
                  </button>
                </div>
              </div>

              {/* Right Column: The Console */}
              <div className="w-full md:w-2/3 bg-[#010805] rounded-xl border border-emerald-500/10 h-[400px] p-6 overflow-y-auto font-mono text-[13px] relative shadow-inner flex flex-col scroll-smooth">
                {logs.length === 0 ? (
                  <div className="m-auto text-center flex flex-col items-center opacity-30">
                    <Terminal className="w-16 h-16 text-slate-500 mb-6" />
                    <p className="text-slate-400 max-w-sm leading-relaxed text-sm">System initialized. Awaiting user prompt to begin decentralized execution sequence.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <AnimatePresence>
                      {logs.map((log, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10, height: 0 }}
                          animate={{ opacity: 1, x: 0, height: 'auto' }}
                          className="flex gap-4 items-start border-l-[3px] border-emerald-500/30 pl-4 py-1.5 bg-emerald-500/[0.02] rounded-r-md"
                        >
                          <span className="text-slate-500 shrink-0 select-none">[{log.time}]</span>
                          <span className={`leading-relaxed tracking-wide
                            ${log.type === 'info' ? 'text-slate-300' : ''}
                            ${log.type === 'action' ? 'text-emerald-300 font-semibold' : ''}
                            ${log.type === 'success' ? 'text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' : ''}
                            ${log.type === 'warning' ? 'text-amber-400' : ''}
                          `}>
                            {log.message}
                          </span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

            </div>
          </div>
        </motion.div>

        {/* The Pipeline Diagram (Horizontal Steps) */}
        <motion.div
          className="relative px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Main Horizontal Connecting Line */}
          <div className="hidden lg:block absolute top-[2.5rem] left-[10%] right-[10%] h-[2px] bg-emerald-950 -z-10 rounded-full overflow-hidden">
            {/* Animated progress bar along the line */}
            <div
              className="h-full bg-gradient-to-r from-emerald-500/0 via-emerald-400 to-emerald-500/0 transition-all duration-1000 ease-out"
              style={{
                width: step === 0 ? '0%' : `${(step - 1) * 20}%`,
                opacity: step > 1 ? 1 : 0
              }}
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4 relative">
            {[
              { s: 2, icon: <Lock className="w-5 h-5" />, title: "Intent Gen", label: "Flow Network" },
              { s: 3, icon: <Zap className="w-5 h-5" />, title: "AI Inference", label: "Talos Model" },
              { s: 4, icon: <Database className="w-5 h-5" />, title: "IPFS Audit", label: "Storacha" },
              { s: 5, icon: <ShieldCheck className="w-5 h-5" />, title: "Lit Signature", label: "Enclave PKP" },
              { s: 6, icon: <Activity className="w-5 h-5" />, title: "On-Chain Exec", label: "Flow Network" },
            ].map((item, i) => (
              <div
                key={i}
                className={`relative flex flex-col items-center text-center transition-all duration-700
                ${step >= item.s ? 'opacity-100 scale-100 drop-shadow-[0_0_30px_rgba(16,185,129,0.2)]' : 'opacity-40 scale-[0.95]'}`}
              >
                {/* Node Circle */}
                <div className={`flex items-center justify-center w-[5rem] h-[5rem] rounded-full border-2 z-10 mb-6 transition-all duration-500 relative
                  ${step === item.s ? 'bg-emerald-500 border-emerald-300 text-emerald-950 shadow-[0_0_40px_rgba(16,185,129,0.6)] scale-110' :
                    step > item.s ? 'bg-emerald-950 border-emerald-500 text-emerald-400' : 'bg-[#010805] border-white/10 text-slate-600'}`}
                >
                  {/* Ripple effect for active node */}
                  {step === item.s && (
                    <div className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping opacity-50"></div>
                  )}
                  {item.icon}
                </div>

                {/* Node Details */}
                <div className={`p-4 rounded-xl border transition-all duration-500 w-full backdrop-blur-sm
                  ${step >= item.s ? 'bg-emerald-950/30 border-emerald-500/20' : 'bg-transparent border-transparent'}`}
                >
                  <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 transition-colors duration-300 ${step >= item.s ? 'text-emerald-500' : 'text-slate-600'}`}>{item.label}</p>
                  <h4 className={`font-bold text-sm lg:text-base leading-tight transition-colors duration-300 ${step >= item.s ? 'text-white' : 'text-slate-400'}`}>{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

// 6. CTA Section
const CTA = () => {
  return (
    <section className="py-32 px-6 relative z-10 bg-[#020a06]">
      <div className="max-w-5xl mx-auto">
        <GlowCard className="p-16 md:p-24 text-center relative overflow-hidden bg-gradient-to-b from-emerald-950/60 to-[#020a06] border-emerald-500/10 shadow-[0_0_80px_rgba(16,185,129,0.1)]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

          <h2 className="text-5xl md:text-7xl font-extrabold mb-8 text-white tracking-tight relative z-10 leading-tight">Ready to automate <br className="hidden sm:block" /> your wealth?</h2>
          <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light relative z-10 leading-relaxed">
            Join the waiting list for FlowTalos early access. Experience the first transparent, decentralized, AI-driven portfolio manager.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center relative z-10 pt-4">
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus ||
                    authenticationStatus === 'authenticated');

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      'style': {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button
                            onClick={openConnectModal}
                            type="button"
                            className="w-full sm:w-auto px-10 py-5 bg-emerald-500 text-emerald-950 font-bold rounded-full hover:bg-emerald-400 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:scale-105 text-lg"
                          >
                            Connect Flow Wallet
                          </button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button onClick={openChainModal} type="button" className="w-full sm:w-auto px-10 py-5 bg-red-500 text-white font-bold rounded-full hover:bg-red-600 transition-all duration-300 shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:shadow-[0_0_40px_rgba(239,68,68,0.5)] hover:scale-105 text-lg">
                            Wrong network - Switch to Flow
                          </button>
                        );
                      }

                      return (
                        <button
                          onClick={openAccountModal}
                          type="button"
                          className="w-full flex items-center justify-center gap-3 sm:w-auto px-10 py-5 bg-white text-slate-950 font-bold rounded-full hover:bg-slate-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-105 text-lg cursor-pointer"
                        >
                          <Activity className="w-5 h-5 text-brand-primary" />
                          {account.displayName}
                        </button>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
            <button className="w-full sm:w-auto px-10 py-5 rounded-full font-medium text-white border border-white/20 hover:bg-white/10 transition-all duration-300 hover:border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.05)] text-lg">
              Read Documentation
            </button>
          </div>
        </GlowCard>
      </div>
    </section>
  );
};

// 7. Footer
const Footer = () => (
  <footer className="border-t border-emerald-500/5 pt-16 pb-8 px-6 bg-[#010805] relative z-20">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-white/5 pb-16">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <img src="/logo.png" alt="FlowTalos" className="w-8 h-8 rounded-full object-cover" />
            <span className="text-2xl font-bold text-white tracking-widest">FlowTalos</span>
          </div>
          <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
            The world&apos;s first Glass-Box AI wealth manager. Automating decentralized finance with cryptographic transparency and verifiable reasoning on the Flow blockchain.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-6">Technology</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><a href="#" className="hover:text-brand-primary transition-colors">Flow Blockchain</a></li>
            <li><a href="#" className="hover:text-emerald-300 transition-colors">Lit Protocol (PKPs)</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Storacha IPFS</a></li>
            <li><a href="#" className="hover:text-emerald-300 transition-colors">Talos AI</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-6">Resources</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-white transition-colors">GitHub Repository</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Smart Contracts</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
        <p>© 2026 FlowTalos Labs. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">Discord</a>
          <a href="#" className="hover:text-white transition-colors">Blog</a>
        </div>
      </div>
    </div>
  </footer>
);

// Utility Icon
const SparkleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" />
  </svg>
);

export default function Home() {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.push('/dashboard');
    }
  }, [isConnected, router]);

  return (
    <>
      <Navbar />
      <main className="font-sans antialiased text-slate-200 selection:bg-brand-primary/30 overflow-x-hidden">
        <Hero />
        <MarketTicker />
        <ProtocolStats />
        <Features />
        <Philosophy />
        <HowItWorks />
        <AgentPreview />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
