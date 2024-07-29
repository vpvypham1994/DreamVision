#!/bin/bash

# Start the Next.js web app in a new terminal
gnome-terminal -- bash -c "npm run dev; exec bash"

# Start the FastAPI server in a new terminal
gnome-terminal -- bash -c "cd backend && uvicorn main:app ; exec bash"

