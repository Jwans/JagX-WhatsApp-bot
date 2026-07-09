#!/bin/bash

echo ""
echo "╔════════════════════════════════════════╗"
echo "║  JagX WhatsApp Bot v2.0.0 - Termux    ║"
echo "║  Created by JRILICENSE & JagX         ║"
echo "║     EASY SETUP SCRIPT                 ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Update packages
echo "[1/4] Updating Termux packages..."
pkg update -y && pkg upgrade -y

# Install Node.js and Git
echo "[2/4] Installing Node.js and Git..."
pkg install -y nodejs git

# Clone repository
echo "[3/4] Cloning JagX WhatsApp Bot..."
git clone https://github.com/Jwans/JagX-WhatsApp-bot.git
cd JagX-WhatsApp-bot

# Install npm dependencies
echo "[4/4] Installing npm dependencies..."
npm install

# Create directories
mkdir -p sessions logs credentials

echo ""
echo "╔════════════════════════════════════════╗"
echo "║  ✅ Setup Complete!                   ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "📝 Next Steps:"
echo ""
echo "1. Run setup: npm run setup"
echo "   (Enter your WhatsApp phone number)"
echo ""
echo "2. Start bot: npm start"
echo ""
echo "3. Scan QR code with WhatsApp"
echo ""
echo "4. Send .menu to see all commands"
echo ""
echo "Created by: JRILICENSE & JagX"
echo ""
