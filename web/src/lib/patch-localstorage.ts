/**
 * FlowTalos — Node.js localStorage SSR Polyfill
 * ================================================
 * Prevents server-side rendering (SSR) crashes caused by Node.js 22+
 * introducing a global `localStorage` object that is incomplete.
 *
 * Problem:
 *   Node.js 22 added a global `localStorage` that some libraries (e.g.
 *   WalletConnect, RainbowKit, @onflow/fcl) detect and attempt to use
 *   during SSR. The native implementation throws errors because it's
 *   not a full Storage API — causing hydration failures in Next.js.
 *
 * Solution:
 *   This module is imported before any library code in `layout.tsx`.
 *   It detects the broken server-side `localStorage` and replaces it
 *   with a no-op mock that satisfies the Web Storage API interface.
 *
 * Guards:
 *   1. Only runs server-side (`typeof window === 'undefined'`)
 *   2. Only patches if the existing `localStorage.getItem` is not a function
 *   3. Uses `Object.defineProperty` with `writable: true` so libraries
 *      can redefine it if needed
 *
 * @module lib/patch-localstorage
 * @see https://github.com/nicolo-ribaudo/tc39-proposal-structs/issues/6
 */

/** Minimal Storage API mock for server-side compatibility. */
interface StorageMock {
    getItem: (key: string) => string | null;
    setItem: (key: string, value: string) => void;
    removeItem: (key: string) => void;
    clear: () => void;
    key: (index: number) => string | null;
    readonly length: number;
}

if (typeof window === 'undefined' && typeof globalThis !== 'undefined') {
    // Only patch if localStorage exists but has a broken getItem
    const hasLocalStorage = 'localStorage' in globalThis;
    const isBroken = hasLocalStorage &&
        typeof (globalThis as typeof globalThis & { localStorage?: Storage }).localStorage?.getItem !== 'function';

    if (isBroken) {
        const noopStorage: StorageMock = {
            getItem: () => null,
            setItem: () => { /* no-op: SSR storage writes are discarded */ },
            removeItem: () => { /* no-op: SSR storage removals are discarded */ },
            clear: () => { /* no-op: SSR storage clears are discarded */ },
            key: () => null,
            length: 0,
        };

        Object.defineProperty(globalThis, 'localStorage', {
            value: noopStorage,
            writable: true,     // Allow libraries to redefine if needed
            configurable: true, // Allow test frameworks to reset
        });
    }
}

// Empty export to make TypeScript treat this as a module
export { };
