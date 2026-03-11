/**
 * FlowTalos — Web3 Provider Stack
 * =================================
 * Wraps the application with the full EVM wallet connectivity stack:
 *   1. WagmiProvider     — EVM chain config (Flow Testnet + Mainnet)
 *   2. QueryClientProvider — React Query for async state management
 *   3. RainbowKitProvider  — Wallet connection modal with dark theme
 *
 * The WalletConnect `projectId` is loaded from NEXT_PUBLIC_WC_PROJECT_ID
 * with a public testing fallback for local development.
 *
 * @module components/Web3Provider
 */
"use client";


import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultConfig,
    RainbowKitProvider,
    darkTheme,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider, createStorage, cookieStorage } from 'wagmi';
import { flowTestnet, flowMainnet } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const config = getDefaultConfig({
    appName: 'FlowTalos',
    projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || '08ebaa662283bf38734ba9ed52dc66bc', // Public testing ID with localhost allowed
    chains: [flowTestnet, flowMainnet],
    ssr: true,
    storage: createStorage({
        storage: cookieStorage,
    }),
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider
                    theme={darkTheme({
                        accentColor: '#12C98A',
                        accentColorForeground: 'black',
                        borderRadius: 'large',
                        fontStack: 'system',
                        overlayBlur: 'small',
                    })}
                >
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
