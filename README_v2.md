# 🤖 JagX WhatsApp Bot v2.0.0

![JagX Logo](https://img.shields.io/badge/JagX-WhatsApp%20Bot-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-JRILICENSE-blue?style=for-the-badge)

**Created by:** JRILICENSE & JagX  
**Version:** 2.0.0 (Optimized for Termux)  
**Status:** ✅ Production Ready

---

## 🎯 What's New in v2.0.0

✅ **Termux Optimized** - No Chromium/Puppeteer issues  
✅ **Interactive Setup** - Asks for phone number  
✅ **Automatic Pairing** - Generates QR code automatically  
✅ **Better Error Handling** - Clear error messages  
✅ **Secure Credentials** - Saves sessions locally  
✅ **50+ Features** - Full command system  
✅ **Works on All Platforms** - Linux, Termux, Windows, Mac  

---

## 🚀 Quick Start

### Termux (Android)

**Copy and paste this ONE command:**

```bash
curl -fsSL https://raw.githubusercontent.com/Jwans/JagX-WhatsApp-bot/main/setup-termux-easy.sh | bash
```

Then:
```bash
cd JagX-WhatsApp-bot
npm run setup
npm start
```

### Linux/Mac

```bash
git clone https://github.com/Jwans/JagX-WhatsApp-bot.git
cd JagX-WhatsApp-bot
npm install
npm run setup
npm start
```

### Windows

```cmd
git clone https://github.com/Jwans/JagX-WhatsApp-bot.git
cd JagX-WhatsApp-bot
npm install
npm run setup
npm start
```

---

## 📱 Setup Process

### Step 1: Run Setup
```bash
npm run setup
```

**It will ask for:**
- ✅ Your WhatsApp phone number (e.g., 2349160654415)
- ✅ Bot name (default: JagX Bot)
- ✅ Command prefix (default: .)

### Step 2: Start Bot
```bash
npm start
```

### Step 3: Scan QR Code
- Open WhatsApp on your phone
- Go to: Settings > Linked Devices > Link Device
- Point camera at QR code shown in terminal
- Done!

### Step 4: Use Commands

Send `.menu` to any chat to see all 50+ commands!

---

## 📋 Available Commands

### Basic Commands
```
.menu      - Show main menu
.help      - Show help menu
.status    - Show bot status
.ping      - Test bot response
.hi        - Say hello to bot
```

### 50+ Features

**Message Features:**
- .viewonce, .recall, .autoreply, .schedule, .bulk, .react, .edit, .forward, .pin, .search

**Group Management:**
- .groupinfo, .welcome, .rules, .members, .promote, .demote, .remove, .setdesc, .seticon, .groupsettings

**Media Tools:**
- .sticker, .compress, .convert, .qrcode, .pdf, .screenshot, .imageinfo, .audiocvt, .encode, .decode

**Search & Info:**
- .weather, .translate, .lyrics, .news, .currency, .unit, .define, .ipinfo, .shorten, .google

**Entertainment:**
- .meme, .joke, .quote, .trivia, .riddle, .game, .story, .ascii, .poem, .fact

**Utilities:**
- .help, .status, .uptime, .settings, .feedback

---

## 💾 Configuration

### Phone Number
Your phone number is stored in `config.json`:
```json
{
  "phoneNumber": "2349160654415",
  "botName": "JagX Bot",
  "prefix": ".",
  "createdAt": "2024-07-08T22:00:00.000Z"
}
```

### Change Configuration
Edit `config.json` directly or run `npm run setup` again.

---

## 📂 File Structure

```
JagX-WhatsApp-bot/
├── bot.js                 - Main bot file
├── setup.js              - Interactive setup wizard
├── config.json           - Bot configuration
├── package.json          - Dependencies
├── .env.example          - Environment template
├── sessions/             - WhatsApp sessions (auto-created)
├── logs/                 - Bot logs (auto-created)
├── credentials/          - Credentials storage (auto-created)
└── README_v2.md          - This file
```

---

## 🔧 Troubleshooting

### "Module not found" Error
```bash
rm -rf node_modules package-lock.json
npm install
```

### "QR Code not showing"
```bash
rm -rf sessions
npm start
```

### "Bot keeps disconnecting"
```bash
rm -rf sessions/
npm start
```

### "npm: command not found"
- Update Node.js:
  ```bash
  pkg install nodejs -y
  ```

### "Phone number not accepted"
- Make sure to include country code
- Example: `2349160654415` (Nigeria)
- Format: `country_code + phone_number`

---

## 🔐 Security Notes

✅ Your WhatsApp session is stored locally in `sessions/`  
✅ Phone number is stored in `config.json`  
✅ No data is sent to external servers  
✅ Sessions are auto-saved and restored  
✅ Credentials are never exposed in logs  

---

## 📊 System Requirements

- **Node.js:** v14 or higher
- **RAM:** 512MB minimum (2GB recommended)
- **Storage:** 200MB free space
- **Internet:** Stable connection required
- **WhatsApp:** Original app installed on phone

---

## 🌐 Supported Platforms

✅ Termux (Android)  
✅ Linux (Ubuntu, Debian, Arch, CentOS, etc.)  
✅ macOS  
✅ Windows  
✅ VPS (DigitalOcean, Linode, Vultr, AWS, etc.)  
✅ Cloud (Railway, Heroku, Render, Replit, etc.)  

---

## 📝 License

**JRILICENSE** - All rights reserved © 2024

**Created by:**
- JRILICENSE
- JagX

---

## ⚠️ Disclaimer

This bot is for **educational purposes only**. Users are responsible for:
- Complying with WhatsApp Terms of Service
- Using the bot legally and ethically
- Respecting privacy and data protection laws
- Not using for spam or malicious purposes

**Use at your own risk.** The creators are not liable for misuse.

---

## 🎉 Getting Started

```bash
# 1. Clone repository
git clone https://github.com/Jwans/JagX-WhatsApp-bot.git
cd JagX-WhatsApp-bot

# 2. Install dependencies
npm install

# 3. Run setup wizard
npm run setup

# 4. Start the bot
npm start

# 5. Scan QR code with WhatsApp
# 6. Send .menu to any chat
```

---

**Version:** 2.0.0 | **Status:** ✅ Production Ready

🌟 **Star this repo if you find it useful!**
