#!/bin/bash
echo "╔════════════════════════════════════════╗"
echo "║  JagX WhatsApp Bot - Termux Setup      ║"
echo "║  Created by JRILICENSE & JagX         ║"
echo "╚════════════════════════════════════════╝"
echo ""
pkg update -y && pkg upgrade -y
pkg install -y nodejs git
git clone https://github.com/Jwans/JagX-WhatsApp-bot.git
cd JagX-WhatsApp-bot
npm install
mkdir -p logs sessions
cp .env.example .env
echo ""
echo "✅ Setup Complete!"
echo "Run: npm start"
echo "Then send .menu to WhatsApp"
echo ""
echo "Created by: JRILICENSE & JagX"
