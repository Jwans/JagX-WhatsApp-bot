# ⚡ QUICK START GUIDE

## For Termux Users (Android)

### Copy & Paste This:

```bash
pkg update -y && pkg upgrade -y && pkg install -y nodejs git && git clone https://github.com/Jwans/JagX-WhatsApp-bot.git && cd JagX-WhatsApp-bot && npm install && npm run setup && npm start
```

### Or Step-by-Step:

**Step 1:** Update Termux
```bash
pkg update -y && pkg upgrade -y
```

**Step 2:** Install Node.js and Git
```bash
pkg install -y nodejs git
```

**Step 3:** Clone Repository
```bash
git clone https://github.com/Jwans/JagX-WhatsApp-bot.git
cd JagX-WhatsApp-bot
```

**Step 4:** Install Dependencies
```bash
npm install
```

**Step 5:** Run Setup (Enter Your Phone Number)
```bash
npm run setup
```

When asked:
- Phone number: `2349160654415` (your number)
- Bot name: `JagX Bot` (or any name)
- Prefix: `.` (or any character)

**Step 6:** Start Bot
```bash
npm start
```

**Step 7:** Scan QR Code
- Open WhatsApp on phone
- Go to: Settings > Linked Devices > Link Device
- Scan the QR code shown in Termux

**Step 8:** Use Commands
- Send `.menu` to any chat
- See all 50+ commands!

---

## For Linux/Mac/Windows Users

```bash
git clone https://github.com/Jwans/JagX-WhatsApp-bot.git
cd JagX-WhatsApp-bot
npm install
npm run setup
npm start
```

---

## What You'll See

```
╔════════════════════════════════════════╗
║  🤖 JagX WhatsApp Bot v2.0.0          ║
║  Created by JRILICENSE & JagX         ║
╚════════════════════════════════════════╝

🤖 STEP 1: Enter Your WhatsApp Phone Number

Format: 234xxxxxxxxxx (Country code + number)
Example: 2349160654415

Enter phone number: ▓
```

---

## Commands to Try

```
.menu      - See all 50+ commands
.help      - Get help
.status    - Check bot status
.ping      - Test bot
.hi        - Say hello
```

---

## Your Phone Number

**Your Phone:** `2349160654415`  
**Bot Creator:** JRILICENSE & JagX

---

## Having Issues?

### Bot won't start?
```bash
rm -rf sessions
npm start
```

### QR code not showing?
```bash
rm -rf sessions node_modules
npm install
npm start
```

### Module errors?
```bash
npm install
```

---

**Ready?** Copy the command from the top and paste in Termux! 🚀
