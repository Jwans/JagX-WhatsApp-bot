# 📦 JagX WhatsApp Bot - Complete Installation Guide

## Quick Installation for 20+ Platforms

### 🤖 Termux (Android) - EASIEST
```bash
curl -fsSL https://raw.githubusercontent.com/Jwans/JagX-WhatsApp-bot/main/setup-termux.sh | bash
npm start
```

### 🪟 Windows
```cmd
git clone https://github.com/Jwans/JagX-WhatsApp-bot.git
cd JagX-WhatsApp-bot
npm install
npm start
```

### 🐧 Linux
```bash
chmod +x setup-linux.sh
./setup-linux.sh
npm start
```

### 🍎 macOS
```bash
chmod +x setup-mac.sh
./setup-mac.sh
npm start
```

### ☁️ VPS (DigitalOcean, Linode, Vultr, AWS, etc.)
```bash
chmod +x setup-vps.sh
./setup-vps.sh
```

### 🐳 Docker
```bash
docker build -t jagx-bot .
docker run -it jagx-bot
```

### Docker Compose
```bash
docker-compose up -d
```

---

## Connection Methods

### QR Code Method
1. Run `npm start`
2. Scan QR code displayed in terminal with WhatsApp
3. Done!

### Pairing Code Method (Recommended)
1. Run `npm start`
2. Look for: `Pairing Code: XXXX-XXXX-XXXX`
3. WhatsApp > Settings > Linked Devices > Link with Code
4. Enter code and phone number
5. Confirm pairing

---

## After Installation

Send `.menu` to any WhatsApp chat to see all 50+ commands!

---

## Cloud Platforms

- Railway.app
- Heroku (use Procfile)
- Render.com
- Replit
- Glitch.com
- And many more!

---

**Version:** 1.0.0 | **Created by:** JRILICENSE & JagX
