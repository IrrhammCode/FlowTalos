#!/bin/bash

echo "========================================================="
echo "  FlowTalos - Holistic Protocol Orchestrator"
echo "========================================================="
echo "Starting Next.js Frontend Dashboard and Python AI Agent in Parallel..."

# Trap CTRL+C to kill both background processes
trap "echo -e '\nShutting down FlowTalos...'; kill 0; exit" SIGINT SIGTERM

echo "[1] Starting Next.js Dashboard..."
cd web && npm run dev &
WEB_PID=$!

echo "[2] Starting Impulse AI Agent (Daemon Mode)..."
# Sleep briefly to let the frontend start up its output
sleep 2
cd ai-agent && python3 main.py --daemon &
AI_PID=$!

echo "========================================================="
echo "  FlowTalos running!"
echo "  Dashboard: http://localhost:3000"
echo "  AI Agent is monitoring market geometry in the background."
echo "  Press CTRL+C to stop all processes."
echo "========================================================="

# Wait for all background jobs to finish
wait
