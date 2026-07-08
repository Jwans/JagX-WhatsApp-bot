#!/bin/bash
echo "╔════════════════════════════════════════╗"
echo "║  JagX WhatsApp Bot - VPS Setup         ║"
echo "║  Created by JRILICENSE & JagX         ║"
echo "╚════════════════════════════════════════╝"
echo ""
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs git build-essential
git clone https://github.com/Jwans/JagX-WhatsApp-bot.git jagx-bot
cd jagx-bot
npm install
cp .env.example .env
mkdir -p logs sessions
sudo npm install -g pm2
pm2 start src/bot.js --name jagx-bot
pm2 save
echo ""
echo "✅ VPS Setup Complete!"
echo "Commands:"
echo "  pm2 stop jagx-bot"
echo "  pm2 restart jagx-bot"
echo "  pm2 logs jagx-bot"
echo ""
echo "Created by: JRILICENSE & JagX"
