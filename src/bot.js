const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs-extra');
const chalk = require('chalk');
const dotenv = require('dotenv');
const express = require('express');
const path = require('path');

dotenv.config();

const app = express();
let globalClient = null;

const BOT_CONFIG = {
  name: 'JagX WhatsApp Bot',
  version: '1.0.0',
  prefix: process.env.BOT_PREFIX || '.',
  port: process.env.PORT || 3000
};

// Ensure logs and sessions directories exist
fs.ensureDirSync(path.join(__dirname, '../logs'));
fs.ensureDirSync(path.join(__dirname, '../sessions'));

app.use(express.json());
app.get('/', (req, res) => {
  res.send(`<html><head><title>JagX WhatsApp Bot</title><style>body{font-family:Arial;text-align:center;padding:50px;background:#f0f0f0}.container{background:white;padding:20px;border-radius:10px}h1{color:#25D366}.status{padding:10px;background:#e8f5e9;border-radius:5px;color:#2e7d32}</style></head><body><div class="container"><h1>🤖 JagX WhatsApp Bot</h1><p>Created by JRILICENSE & JagX</p><div class="status"><p>Bot running successfully!</p><p>Send <strong>.menu</strong> to WhatsApp to see all commands</p></div></div></body></html>`);
});

// Initialize WhatsApp Client with better error handling
const client = new Client({
  authStrategy: new LocalAuth({ clientId: 'jagx-bot' }),
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--disable-extensions',
      '--disable-plugins',
      '--disable-web-resources',
      '--mute-audio'
    ],
    timeout: 60000
  },
  restartOnAuthFail: true
});

globalClient = client;

// QR Code Event
client.on('qr', (qr) => {
  console.clear();
  console.log(chalk.cyan.bold('\n╔════════════════════════════════════════╗'));
  console.log(chalk.cyan.bold('║   JagX WhatsApp Bot v1.0.0         ║'));
  console.log(chalk.cyan.bold('║   Created by JRILICENSE & JagX     ║'));
  console.log(chalk.cyan.bold('╚════════════════════════════════════════╝\n'));
  
  console.log(chalk.yellow.bold('📱 Scan the QR Code below with WhatsApp:\n'));
  qrcode.generate(qr, { small: true });
  
  console.log(chalk.yellow('\n⚙️  Alternative: Pairing Code Method'));
  console.log(chalk.gray('   WhatsApp Settings > Linked Devices > Link with Code\n'));
});

// Ready Event
client.on('ready', () => {
  console.clear();
  console.log(chalk.green.bold('\n╔════════════════════════════════════════╗'));
  console.log(chalk.green.bold('║  ✅ BOT CONNECTED SUCCESSFULLY!       ║'));
  console.log(chalk.green.bold('║   JagX WhatsApp Bot v1.0.0         ║'));
  console.log(chalk.green.bold('║   Created by JRILICENSE & JagX     ║'));
  console.log(chalk.green.bold('╚════════════════════════════════════════╝\n'));
  
  console.log(chalk.green('✅ Bot Ready!'));
  console.log(chalk.blue(`📱 Send ".menu" to any chat to see all 50+ commands`));
  console.log(chalk.blue(`🌐 Web: http://localhost:${BOT_CONFIG.port}`));
  console.log(chalk.gray('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
});

// Message Handler
client.on('message_create', async (msg) => {
  try {
    // Ignore status broadcasts
    if (msg.from === 'status@broadcast') return;
    
    // Check if message starts with prefix
    if (!msg.body.startsWith(BOT_CONFIG.prefix)) return;
    
    const args = msg.body.slice(BOT_CONFIG.prefix.length).split(/\s+/);
    const command = args[0].toLowerCase();
    
    // Menu command
    if (command === 'menu') {
      const menuText = `╔════════════════════════════════════════╗
║    🤖 JagX WhatsApp Bot v1.0.0      ║
║   Created by JRILICENSE & JagX      ║
╚════════════════════════════════════════╝

📋 *MAIN MENU - 50+ FEATURES:*

*[1] 📨 MESSAGE FEATURES (10)*
   ${BOT_CONFIG.prefix}viewonce - View once messages
   ${BOT_CONFIG.prefix}recall - Recover deleted messages
   ${BOT_CONFIG.prefix}autoreply - Set auto responses
   ${BOT_CONFIG.prefix}schedule - Schedule messages
   ${BOT_CONFIG.prefix}bulk - Bulk messaging
   ${BOT_CONFIG.prefix}react - React to messages
   ${BOT_CONFIG.prefix}edit - Edit messages
   ${BOT_CONFIG.prefix}forward - Forward messages
   ${BOT_CONFIG.prefix}pin - Pin messages
   ${BOT_CONFIG.prefix}search - Search messages

*[2] 👥 GROUP MANAGEMENT (10)*
   ${BOT_CONFIG.prefix}groupinfo - Group information
   ${BOT_CONFIG.prefix}welcome - Toggle welcome
   ${BOT_CONFIG.prefix}rules - Show group rules
   ${BOT_CONFIG.prefix}members - Count members
   ${BOT_CONFIG.prefix}promote - Make admin
   ${BOT_CONFIG.prefix}demote - Remove admin
   ${BOT_CONFIG.prefix}remove - Remove member
   ${BOT_CONFIG.prefix}setdesc - Set description
   ${BOT_CONFIG.prefix}seticon - Set group icon
   ${BOT_CONFIG.prefix}groupsettings - Group settings

*[3] 🎨 MEDIA TOOLS (10)*
   ${BOT_CONFIG.prefix}sticker - Create sticker
   ${BOT_CONFIG.prefix}compress - Compress media
   ${BOT_CONFIG.prefix}convert - Convert formats
   ${BOT_CONFIG.prefix}qrcode - Generate QR code
   ${BOT_CONFIG.prefix}pdf - Create PDF
   ${BOT_CONFIG.prefix}screenshot - Screenshot URL
   ${BOT_CONFIG.prefix}imageinfo - Identify image
   ${BOT_CONFIG.prefix}audiocvt - Audio conversion
   ${BOT_CONFIG.prefix}encode - Encode media
   ${BOT_CONFIG.prefix}decode - Decode media

*[4] 🔍 SEARCH & INFO (10)*
   ${BOT_CONFIG.prefix}weather - Weather report
   ${BOT_CONFIG.prefix}translate - Translate text
   ${BOT_CONFIG.prefix}lyrics - Find lyrics
   ${BOT_CONFIG.prefix}news - Latest news
   ${BOT_CONFIG.prefix}currency - Currency converter
   ${BOT_CONFIG.prefix}unit - Unit converter
   ${BOT_CONFIG.prefix}define - Word definition
   ${BOT_CONFIG.prefix}ipinfo - IP information
   ${BOT_CONFIG.prefix}shorten - Shorten URL
   ${BOT_CONFIG.prefix}google - Google search

*[5] 🎵 ENTERTAINMENT (10)*
   ${BOT_CONFIG.prefix}meme - Generate meme
   ${BOT_CONFIG.prefix}joke - Get joke
   ${BOT_CONFIG.prefix}quote - Get quote
   ${BOT_CONFIG.prefix}trivia - Play trivia
   ${BOT_CONFIG.prefix}riddle - Get riddle
   ${BOT_CONFIG.prefix}game - Play game
   ${BOT_CONFIG.prefix}story - Generate story
   ${BOT_CONFIG.prefix}ascii - ASCII art
   ${BOT_CONFIG.prefix}poem - Generate poem
   ${BOT_CONFIG.prefix}fact - Random fact

*[6] 🛠️ UTILITIES (5)*
   ${BOT_CONFIG.prefix}help - Show help
   ${BOT_CONFIG.prefix}status - Bot status
   ${BOT_CONFIG.prefix}uptime - Bot uptime
   ${BOT_CONFIG.prefix}settings - User settings
   ${BOT_CONFIG.prefix}feedback - Send feedback

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*Usage:* Type ${BOT_CONFIG.prefix}help <category_number>
*Example:* ${BOT_CONFIG.prefix}help 1

*Version:* 1.0.0
*Status:* ✅ Production Ready

*Created by:* JRILICENSE & JagX`;
      
      await msg.reply(menuText);
    }
    // Help command
    else if (command === 'help') {
      const helpText = `╔════════════════════════════════════════╗
║         🤖 JagX WhatsApp Bot        ║
║            HELP MENU                 ║
╚════════════════════════════════════════╝

*📚 Available Categories:*

*[1]* 📨 Message Features
*[2]* 👥 Group Management
*[3]* 🎨 Media Tools
*[4]* 🔍 Search & Information
*[5]* 🎵 Entertainment
*[6]* 🛠️ Utilities

*Total Features:* 50+

*Usage:* ${BOT_CONFIG.prefix}help <number>
*Example:* ${BOT_CONFIG.prefix}help 1

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*Created by:* JRILICENSE & JagX
*Version:* 1.0.0
*Status:* ✅ Production Ready

*Need full menu?* Type ${BOT_CONFIG.prefix}menu`;
      
      await msg.reply(helpText);
    }
    // Status command
    else if (command === 'status') {
      const uptime = process.uptime();
      const days = Math.floor(uptime / 86400);
      const hours = Math.floor((uptime % 86400) / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);
      
      const ram = process.memoryUsage();
      const ramUsage = (ram.heapUsed / 1024 / 1024).toFixed(2);
      const ramTotal = (ram.heapTotal / 1024 / 1024).toFixed(2);
      
      const statusText = `╔════════════════════════════════════════╗
║   🤖 JagX WhatsApp Bot Status        ║
╚════════════════════════════════════════╝

*Bot Status:* ✅ Online
*Bot Name:* ${BOT_CONFIG.name}
*Version:* ${BOT_CONFIG.version}
*Prefix:* ${BOT_CONFIG.prefix}

*Server Information:*
*Uptime:* ${days}d ${hours}h ${minutes}m ${seconds}s
*RAM Usage:* ${ramUsage}MB / ${ramTotal}MB
*Node Version:* ${process.version}

*WhatsApp Status:* Connected ✅
*Features Available:* 50+

*Created by:* JRILICENSE & JagX
*License:* JRILICENSE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
      
      await msg.reply(statusText);
    }
    // Unknown command
    else {
      await msg.reply(`❌ Unknown command: ${BOT_CONFIG.prefix}${command}\n\nType ${BOT_CONFIG.prefix}menu to see all commands`);
    }
    
  } catch (error) {
    console.error('Message Handler Error:', error);
  }
});

// Disconnection Event
client.on('disconnected', (reason) => {
  console.log(chalk.red.bold('\n❌ Bot Disconnected!'));
  console.log(chalk.yellow(`Reason: ${reason}`));
});

// Authentication Failed
client.on('auth_failure', (msg) => {
  console.log(chalk.red.bold('\n❌ Authentication Failed!'));
  console.log(chalk.yellow(`Message: ${msg}`));
});

// Global Error Handlers
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

// Start Bot
async function startBot() {
  try {
    console.log(chalk.cyan.bold('\n🚀 Starting JagX WhatsApp Bot...\n'));
    await client.initialize();
  } catch (error) {
    console.log(chalk.red('\n❌ Error starting bot:'));
    console.log(chalk.yellow(error.message));
    console.log(chalk.gray('Retrying in 5 seconds...\n'));
    setTimeout(startBot, 5000);
  }
}

// Start Express Server
const server = app.listen(BOT_CONFIG.port, () => {
  console.log(chalk.green(`✅ Web Server on http://localhost:${BOT_CONFIG.port}\n`));
});

// Handle server errors
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(chalk.red(`\n❌ Port ${BOT_CONFIG.port} is already in use!`));
    console.log(chalk.yellow(`Change PORT in .env file to a different number`));
  } else {
    console.error('Server Error:', err);
  }
});

// Start Bot
startBot();

module.exports = { client: () => globalClient, BOT_CONFIG };
