#!/bin/bash
echo "╔════════════════════════════════════════╗"
echo "║  JagX WhatsApp Bot - Linux Setup       ║"
echo "║  Created by JRILICENSE & JagX         ║"
echo "╚════════════════════════════════════════╝"
echo ""
sudo apt update -y
sudo apt install -y nodejs npm git
git clone https://github.com/Jwans/JagX-WhatsApp-bot.git
cd JagX-WhatsApp-bot
npm install
mkdir -p logs sessions
cp .env.example .env
chmod +x *.sh
echo ""
echo "✅ Setup Complete!"
echo "Run: npm start"
echo "Background: nohup npm start > bot.log 2>&1 &"
echo ""
echo "Created by: JRILICENSE & JagX"
