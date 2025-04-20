# 🎮 Multiplayer Puzzle Game

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2+-61DAFB?logo=react)](https://reactjs.org/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.7+-010101?logo=socket.io)](https://socket.io/)

A real-time multiplayer puzzle game platform with Sudoku and Word Grid (Boggle-style) games, complete with chat functionality and live leaderboards.


Checkout:- https://gamenoo-frontend.vercel.app/

## ✨ Features

### 🎲 Game Modes
- **Collaborative Sudoku**: Solve puzzles together in real-time
- **Competitive Word Grid**: Race to find the most words Boggle-style

### 🌐 Multiplayer Features
- Real-time synchronized gameplay
- Player presence indicators
- Color-coded player contributions
- Live leaderboard tracking

### 💬 Social Features
- In-game chat
- Room-based gameplay
- Active rooms listing

## 🛠️ Tech Stack

**Frontend**:
- React 18
- Tailwind CSS
- Socket.IO Client
- Vite

**Backend**:
- Node.js
- Express
- Socket.IO

**Game Logic**:
- Custom Sudoku generator with backtracking
- Boggle-style word grid generator
- Dictionary API integration with local caching

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- npm v9+ or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/multiplayer-puzzle-game.git
cd multiplayer-puzzle-game

# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Start development server
npm run dev
