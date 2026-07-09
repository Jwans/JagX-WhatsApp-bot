const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode');
const fs = require('fs-extra');
const chalk = require('chalk');
const path = require('path');
require('dotenv').config();

// Config
const config = fs.existsSync('config.json') ? JSON.parse(fs.readFileSync('config.json', 'utf8')) : {
  phoneNumber: process.env.PHONE_NUMBER || '2349160654415',
  botName: process.env.BOT_NAME || 'JagX Bot',
  prefix: process.env.BOT_PREFIX || '.'
};

const PREFIX = config.prefix;
const BOT_NAME = config.botName;
const PHONE = config.phoneNumber;

// Ensure directories exist
fs.ensureDirSync('sessions');
fs.ensureDirSync('logs');
fs.ensureDirSync('credentials');

let sock = null;
let isConnected = false;

const logger = (msg, type = 'info') => {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${msg}\n`;
  
  try {
    fs.appendFileSync('logs/bot.log', logEntry);
  } catch (err) {
    console.error('Failed to write to log file:', err.message);
  }
  
  switch(type) {
    case 'success':
      console.log(chalk.green(`✅ ${msg}`));
      break;
    case 'error':
      console.log(chalk.red(`❌ ${msg}`));
      break;
    case 'warn':
      console.log(chalk.yellow(`⚠️  ${msg}`));
      break;
    default:
      console.log(chalk.blue(`ℹ️  ${msg}`));
  }
};

const showMenu = () => {
  return `╔════════════════════════════════════════╗
║    🤖 JagX WhatsApp Bot v2.0.0      ║
║   Created by JRILICENSE & JagX      ║
╚════════════════════════════════════════╝

📋 *MAIN MENU - 50+ FEATURES:*

*[1] 📨 MESSAGE FEATURES (10)*
   ${PREFIX}viewonce - View once messages
   ${PREFIX}recall - Recover deleted messages
   ${PREFIX}autoreply - Set auto responses
   ${PREFIX}schedule - Schedule messages
   ${PREFIX}bulk - Bulk messaging
   ${PREFIX}react - React to messages
   ${PREFIX}edit - Edit messages
   ${PREFIX}forward - Forward messages
   ${PREFIX}pin - Pin messages
   ${PREFIX}search - Search messages

*[2] 👥 GROUP MANAGEMENT (10)*
   ${PREFIX}groupinfo - Group information
   ${PREFIX}welcome - Toggle welcome
   ${PREFIX}rules - Show group rules
   ${PREFIX}members - Count members
   ${PREFIX}promote - Make admin
   ${PREFIX}demote - Remove admin
   ${PREFIX}remove - Remove member
   ${PREFIX}setdesc - Set description
   ${PREFIX}seticon - Set group icon
   ${PREFIX}groupsettings - Group settings

*[3] 🎨 MEDIA TOOLS (10)*
   ${PREFIX}sticker - Create sticker
   ${PREFIX}compress - Compress media
   ${PREFIX}convert - Convert formats
   ${PREFIX}qrcode - Generate QR code
   ${PREFIX}pdf - Create PDF
   ${PREFIX}screenshot - Screenshot URL
   ${PREFIX}imageinfo - Identify image
   ${PREFIX}audiocvt - Audio conversion
   ${PREFIX}encode - Encode media
   ${PREFIX}decode - Decode media

*[4] 🔍 SEARCH & INFO (10)*
   ${PREFIX}weather - Weather report
   ${PREFIX}translate - Translate text
   ${PREFIX}lyrics - Find lyrics
   ${PREFIX}news - Latest news
   ${PREFIX}currency - Currency converter
   ${PREFIX}unit - Unit converter
   ${PREFIX}define - Word definition
   ${PREFIX}ipinfo - IP information
   ${PREFIX}shorten - Shorten URL
   ${PREFIX}google - Google search

*[5] 🎵 ENTERTAINMENT (10)*
   ${PREFIX}meme - Generate meme
   ${PREFIX}joke - Get joke
   ${PREFIX}quote - Get quote
   ${PREFIX}trivia - Play trivia
   ${PREFIX}riddle - Get riddle
   ${PREFIX}game - Play game
   ${PREFIX}story - Generate story
   ${PREFIX}ascii - ASCII art
   ${PREFIX}poem - Generate poem
   ${PREFIX}fact - Random fact

*[6] 🛠️ UTILITIES (5)*
   ${PREFIX}help - Show help
   ${PREFIX}status - Bot status
   ${PREFIX}uptime - Bot uptime
   ${PREFIX}settings - User settings
   ${PREFIX}feedback - Send feedback

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*Version:* 2.0.0
*Status:* ✅ Production Ready
*Created by:* JRILICENSE & JagX`;
};

const showHelp = () => {
  return `╔════════════════════════════════════════╗
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
*Bot Name:* ${BOT_NAME}
*Prefix:* ${PREFIX}
*Phone:* ${PHONE}

*Usage:* ${PREFIX}help <number>
*Example:* ${PREFIX}help 1

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*Created by:* JRILICENSE & JagX
*Version:* 2.0.0
*Status:* ✅ Production Ready

*Need full menu?* Type ${PREFIX}menu`;
};

const showStatus = () => {
  const uptime = process.uptime();
  const days = Math.floor(uptime / 86400);
  const hours = Math.floor((uptime % 86400) / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);
  
  const ram = process.memoryUsage();
  const ramUsage = (ram.heapUsed / 1024 / 1024).toFixed(2);
  const ramTotal = (ram.heapTotal / 1024 / 1024).toFixed(2);
  
  return `╔════════════════════════════════════════╗
║   🤖 JagX WhatsApp Bot Status        ║
╚════════════════════════════════════════╝

*Bot Status:* ✅ Online
*Bot Name:* ${BOT_NAME}
*Version:* 2.0.0
*Prefix:* ${PREFIX}
*Phone:* ${PHONE}

*Server Information:*
*Uptime:* ${days}d ${hours}h ${minutes}m ${seconds}s
*RAM Usage:* ${ramUsage}MB / ${ramTotal}MB
*Node Version:* ${process.version}

*WhatsApp Status:* Connected ✅
*Features Available:* 50+

*Created by:* JRILICENSE & JagX
*License:* JRILICENSE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
};

// Simple logger object for Baileys - no logger.child() method
const baileyLogger = {
  child: () => baileyLogger,
  trace: () => {},
  debug: () => {},
  info: (msg) => logger(msg),
  warn: (msg) => logger(msg, 'warn'),
  error: (msg) => logger(msg, 'error'),
  fatal: (msg) => logger(msg, 'error')
};

async function startBot() {
  try {
    console.clear();
    console.log(chalk.cyan.bold('\n╔════════════════════════════════════════╗'));
    console.log(chalk.cyan.bold('║  🤖 JagX WhatsApp Bot v2.0.0          ║'));
    console.log(chalk.cyan.bold('║  Created by JRILICENSE & JagX         ║'));
    console.log(chalk.cyan.bold('╚════════════════════════════════════════╝\n'));
    
    logger(`Starting bot for phone: ${PHONE}`);
    logger(`Bot Name: ${BOT_NAME}`);
    logger(`Prefix: ${PREFIX}`);

    const { state, saveCreds } = await useMultiFileAuthState('sessions');

    sock = makeWASocket({
  auth: state,
  printQRInTerminal: false,
  pairingCode: true,           // Enables pairing code
  logger: baileyLogger,
  connectTimeoutMs: 60000,
  defaultQueryTimeoutMs: 0,
  keepAliveIntervalMs: 30000,
});

    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect } = update;

      if (connection === 'close') {
        isConnected = false;
        const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
        logger('❌ Connection closed', 'error');
        
        if (shouldReconnect) {
          logger('Reconnecting in 3 seconds...', 'warn');
          setTimeout(() => startBot(), 3000);
        }
      } else if (connection === 'connecting') {
        logger('Connecting to WhatsApp...');
      } else if (connection === 'open') {
        isConnected = true;
        logger('✅ Bot Connected Successfully!', 'success');
        console.log(chalk.green('\n✅ BOT READY!\n'));
        console.log(chalk.blue(`Send "${PREFIX}menu" to see all commands\n`));
      }
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', async (m) => {
      try {
        const msg = m.messages[0];
        if (!msg.message) return;
        if (msg.key.fromMe) return;
        if (msg.key.remoteJid === 'status@broadcast') return;

        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
        if (!text.startsWith(PREFIX)) return;

        const args = text.slice(PREFIX.length).split(/\s+/);
        const cmd = args[0].toLowerCase();

        logger(`Command: ${cmd} from ${msg.key.remoteJid}`);

        if (cmd === 'menu') {
          await sock.sendMessage(msg.key.remoteJid, { text: showMenu() });
        } else if (cmd === 'help') {
          await sock.sendMessage(msg.key.remoteJid, { text: showHelp() });
        } else if (cmd === 'status') {
          await sock.sendMessage(msg.key.remoteJid, { text: showStatus() });
        } else if (cmd === 'ping') {
          await sock.sendMessage(msg.key.remoteJid, { text: '🏓 Pong! Bot is working!' });
        } else if (cmd === 'hello' || cmd === 'hi') {
          await sock.sendMessage(msg.key.remoteJid, { text: `👋 Hello! I'm ${BOT_NAME}. Send ${PREFIX}menu to see all commands!` });
        } else {
          await sock.sendMessage(msg.key.remoteJid, { text: `❌ Unknown command: ${PREFIX}${cmd}\n\nType ${PREFIX}menu to see all commands` });
        }
      } catch (error) {
        logger(`Error handling message: ${error.message}`, 'error');
      }
    });

  } catch (error) {
    logger(`Fatal error: ${error.message}`, 'error');
    setTimeout(() => startBot(), 5000);
  }
}

startBot().catch(err => {
  logger(`Failed to start: ${err.message}`, 'error');
  process.exit(1);
});

process.on('SIGINT', () => {
  logger('Bot shutting down...');
  process.exit(0);
});
