#!/bin/bash
echo "╔════════════════════════════════════════╗"
echo "║  JagX WhatsApp Bot - macOS Setup       ║"
echo "║  Created by JRILICENSE & JagX         ║"
echo "╚════════════════════════════════════════╝"
echo ""
if ! command -v brew &> /dev/null; then
  echo "Installing Homebrew..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi
brew install node git
git clone https://github.com/Jwans/JagX-WhatsApp-bot.git
cd JagX-WhatsApp-bot
npm install
mkdir -p logs sessions
cp .env.example .env
chmod +x *.sh
echo ""
echo "✅ Setup Complete!"
echo "Run: npm start"
echo ""
echo "Created by: JRILICENSE & JagX"
