/**
 * FlowTalos — Trade Log API Route
 * =================================
 * Next.js App Router API endpoint that serves the AI Agent's execution history
 * to the frontend dashboard.
 *
 * Data Source:
 *   Reads `ai-agent/trade_log.json` — a JSON array of trade state machine entries
 *   written by the Python AI Agent after each execution cycle.
 *
 * Response Format:
 *   GET /api/trades → Trade[] (most recent first)
 *   Returns an empty array if the log file doesn't exist yet or is malformed.
 *
 * @module api/trades
 */

import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

/** Shape of a single trade entry from the AI Agent's state machine. */
interface TradeEntry {
    id: string;
    timestamp: string;
    action: 'BUY' | 'SELL';
    token: string;
    amount: number;
    price: number;
    dex: string;
    dex_router: string;
    tx_status: string;
    ipfs_cid: string;
    lit_signature: string;
    sentiment: string;
    reasoning: string;
}

/** Maximum number of trade entries to return in a single API response. */
const MAX_RESPONSE_ITEMS = 100;

/** Maximum allowed file size to prevent reading oversized/corrupted logs (5MB). */
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

/**
 * GET /api/trades
 *
 * Reads the trade log and returns it in reverse chronological order.
 * Gracefully handles missing files and malformed JSON without crashing.
 *
 * Security:
 *   - Path traversal protection via path.resolve() + base directory check
 *   - File size limit to prevent OOM on corrupted files
 *   - Response capped at MAX_RESPONSE_ITEMS entries
 */
export async function GET(): Promise<NextResponse<TradeEntry[]>> {
    try {
        // Resolve and validate the file path to prevent path traversal
        const baseDir = path.resolve(process.cwd(), '..');
        const logPath = path.resolve(baseDir, 'ai-agent', 'trade_log.json');

        // Security: Ensure resolved path is within the expected base directory
        if (!logPath.startsWith(baseDir)) {
            console.error('[api/trades] Path traversal attempt detected');
            return NextResponse.json([]);
        }

        if (!fs.existsSync(logPath)) {
            return NextResponse.json([]);
        }

        // Security: Check file size before reading
        const stats = fs.statSync(logPath);
        if (stats.size > MAX_FILE_SIZE_BYTES) {
            console.warn(`[api/trades] trade_log.json exceeds ${MAX_FILE_SIZE_BYTES} bytes, refusing to read.`);
            return NextResponse.json([]);
        }

        const raw = fs.readFileSync(logPath, 'utf-8');

        // Validate JSON structure before returning
        const trades: TradeEntry[] = JSON.parse(raw);

        if (!Array.isArray(trades)) {
            console.warn('[api/trades] trade_log.json is not an array, returning empty.');
            return NextResponse.json([]);
        }

        // Most recent trades first, capped at MAX_RESPONSE_ITEMS
        return NextResponse.json(trades.reverse().slice(0, MAX_RESPONSE_ITEMS));

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error(`[api/trades] Failed to read trade log: ${message}`);
        return NextResponse.json([]);
    }
}
