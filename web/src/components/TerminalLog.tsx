/**
 * FlowTalos — Terminal Log Component
 * =====================================
 * Renders a macOS-style terminal window displaying the AI agent's
 * Glass-Box execution log. Each entry is colour-coded by type:
 *   - info    → White/grey   (system status messages)
 *   - action  → Brand teal   (AI analysis actions)
 *   - success → Brand green  (confirmed executions)
 *
 * Used on the landing page's interactive simulation section.
 *
 * @module components/TerminalLog
 */

import React from "react";

/** A single log entry displayed in the terminal window. */
interface LogEntry {
    /** Timestamp string (e.g. "14:32:01.123") */
    time: string;
    /** The log message text */
    message: string;
    /** Colour-coding category */
    type: 'info' | 'action' | 'success';
}

export function TerminalLog({ logs }: { logs: LogEntry[] }) {
    return (
        <div className="glass-panel w-full h-[400px] overflow-y-auto p-4 font-mono text-sm relative">
            <div className="sticky top-0 bg-slate-900/80 backdrop-blur-sm border-b border-white/10 p-2 mb-4 -mx-4 -mt-4 flex items-center gap-2">
                <div className="flex gap-1.5 ml-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="text-white/60 ml-4">FlowTalos Glass-Box Agent</span>
            </div>

            <div className="flex flex-col gap-2">
                {logs.map((log, index) => (
                    <div key={index} className="flex gap-4">
                        <span className="text-white/40 shrink-0">[{log.time}]</span>
                        <span className={`
                ${log.type === 'info' ? 'text-white/80' : ''}
                ${log.type === 'action' ? 'text-brand-secondary' : ''}
                ${log.type === 'success' ? 'text-brand-primary' : ''}
            `}>
                            {log.message}
                        </span>
                    </div>
                ))}
                {logs.length === 0 && (
                    <span className="text-white/40 text-center mt-10">Agent is currently idle. Awaiting configuration...</span>
                )}
            </div>
        </div>
    );
}
