const fs = require('fs-extra');
const readline = require('readline');
const path = require('path');
const chalk = require('chalk');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function runSetup() {
  console.clear();
  console.log(chalk.cyan.bold('╔════════════════════════════════════════╗'));
  console.log(chalk.cyan.bold('║  🤖 JagX WhatsApp Bot v2.0.0          ║'));
  console.log(chalk.cyan.bold('║  Created by JRILICENSE & JagX         ║'));
  console.log(chalk.cyan.bold('║     SETUP WIZARD                       ║'));
  console.log(chalk.cyan.bold('╚════════════════════════════════════════╝\n'));

  // Get phone number
  console.log(chalk.yellow('📱 STEP 1: Enter Your WhatsApp Phone Number\n'));
  console.log(chalk.gray('Format: 234xxxxxxxxxx (Country code + number)'));
  console.log(chalk.gray('Example: 2349160654415\n'));
  
  let phoneNumber = await question(chalk.blue('Enter phone number: '));
  phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
  
  if (!phoneNumber || phoneNumber.length < 10) {
    console.log(chalk.red('\n❌ Invalid phone number!'));
    rl.close();
    return;
  }

  // Bot name
  console.log(chalk.yellow('\n🤖 STEP 2: Bot Name\n'));
  const botName = await question(chalk.blue('Enter bot name (default: JagX Bot): ')) || 'JagX Bot';

  // Bot prefix
  console.log(chalk.yellow('\n⚙️  STEP 3: Bot Prefix\n'));
  const prefix = await question(chalk.blue('Enter command prefix (default: .): ')) || '.';

  // Create .env file
  const envContent = `# JagX WhatsApp Bot Configuration
PHONE_NUMBER=${phoneNumber}
BOT_NAME=${botName}
BOT_PREFIX=${prefix}
AUTO_READ=true
AUTO_TYPING=true
DEBUG=false
`;

  fs.writeFileSync('.env', envContent);

  // Create directories
  fs.ensureDirSync('sessions');
  fs.ensureDirSync('logs');
  fs.ensureDirSync('credentials');

  // Create config file
  const config = {
    phoneNumber,
    botName,
    prefix,
    createdAt: new Date().toISOString()
  };

  fs.writeFileSync('config.json', JSON.stringify(config, null, 2));

  console.log(chalk.green.bold('\n✅ Setup Complete!\n'));
  console.log(chalk.blue('Configuration saved:'));
  console.log(chalk.gray(`  Phone: ${phoneNumber}`));
  console.log(chalk.gray(`  Bot Name: ${botName}`));
  console.log(chalk.gray(`  Prefix: ${prefix}`));
  console.log(chalk.yellow('\n📝 Next Steps:\n'));
  console.log(chalk.green('1. Run: npm start'));
  console.log(chalk.green('2. Scan QR code with your WhatsApp'));
  console.log(chalk.green('3. Send .menu to see all commands\n'));
  console.log(chalk.gray('Need to restart setup? Run: npm run setup\n'));

  rl.close();
}

runSetup().catch(err => {
  console.error(chalk.red('Error during setup:'), err);
  rl.close();
});
