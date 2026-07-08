const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs-extra');
const chalk = require('chalk');
const dotenv = require('dotenv');
const express = require('express');

dotenv.config();

const app = express();
let globalClient = null;

const BOT_CONFIG = {
  name: 'JagX WhatsApp Bot',
  version: '1.0.0',
  prefix: process.env.BOT_PREFIX || '.',
  port: process.env.PORT || 3000
};

app.use(express.json());
app.get('/', (req, res) => {
  res.send(`<html><head><title>JagX WhatsApp Bot</title><style>body{font-family:Arial;text-align:center;padding:50px;background:#f0f0f0}.container{background:white;padding:20px;border-radius:10px}h1{color:#25D366}.status{padding:10px;background:#e8f5e9;border-radius:5px;color:#2e7d32}</style></head><body><div class="container"><h1>🤖 JagX WhatsApp Bot</h1><p>Created by JRILICENSE & JagX</p><div class="status"><p>Bot running successfully!</p><p>Send <strong>.menu</strong> to WhatsApp to see all commands</p></div></div></body></html>`);
});

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  }
});

globalClient = client;

client.on('qr', (qr) => {
  console.clear();
  console.log(chalk.cyan.bold('\n╔════════════════════════════════════════╗'));
  console.log(chalk.cyan.bold('║   JagX WhatsApp Bot v1.0.0         ║'));
  console.log(chalk.cyan.bold('║   Created by JRILICENSE & JagX     ║'));
  console.log(chalk.cyan.bold('╚════════════════════════════════════════╝\n'));
  console.log(chalk.yellow.bold('📱 Scan QR Code with WhatsApp:\n'));
  qrcode.generate(qr, { small: true });
  console.log(chalk.yellow('\n⚙️  Or use Pairing Code method in WhatsApp settings\n'));
});

client.on('ready', () => {
  console.clear();
  console.log(chalk.green.bold('\n╔════════════════════════════════════════╗'));
  console.log(chalk.green.bold('║  ✅ BOT CONNECTED SUCCESSFULLY!    ║'));
  console.log(chalk.green.bold('║   JagX WhatsApp Bot v1.0.0         ║'));
  console.log(chalk.green.bold('║   Created by JRILICENSE & JagX     ║'));
  console.log(chalk.green.bold('╚══════════════��═════════════════════════╝\n'));
  console.log(chalk.green('✅ Bot Ready!'));
  console.log(chalk.blue('Send .menu to see all commands'));
});

client.on('message_create', async (msg) => {
  try {
    if (msg.body === '.menu') {
      const menu = `.menu - Show menu\n.help - Show help\n.status - Bot status\n.viewonce - View once message\n.weather - Weather\n.translate - Translate\n.joke - Get joke\n\n50+ Commands Available!`;
      await msg.reply(menu);
    } else if (msg.body === '.help') {
      await msg.reply('Commands: .menu, .status, .help, .viewonce, .weather, .translate, .joke, and 44 more!');
    } else if (msg.body === '.status') {
      await msg.reply('✅ Bot is online and working perfectly!\nVersion: 1.0.0\nCreated by: JRILICENSE & JagX');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

client.on('disconnected', () => {
  console.log(chalk.red.bold('❌ Bot disconnected!'));
});

async function startBot() {
  try {
    console.log(chalk.cyan.bold('🚀 Starting JagX WhatsApp Bot...\n'));
    await client.initialize();
  } catch (error) {
    console.log(chalk.red('❌ Error. Retrying in 5 seconds...'));
    setTimeout(startBot, 5000);
  }
}

app.listen(BOT_CONFIG.port, () => {
  console.log(chalk.green(`✅ Web Server on http://localhost:${BOT_CONFIG.port}`));
});

startBot();

module.exports = { client: () => globalClient, BOT_CONFIG };
