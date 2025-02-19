const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config()
const { exec } = require('child_process');
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.BOT_TOKEN;
const hosthome = process.env.HOSTHOME;
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/status/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Bot @ Aiswarya Ambalappara Up and Running!!!');
});
//commands executions
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if (msg?.text.startsWith('/' + hosthome + ' ')) {
        const commandText=msg?.text?.split('/' + hosthome + ' ').pop()
        console.log('EX::::|'+commandText+'|')
        exec(commandText, (err, stdout, stderr) => {
            if (err) {
                // node couldn't execute the command
                bot.sendMessage(chatId, 'ERROR!!\n ' + JSON.stringify(err));
                return;
            }
            if (stdout) {
                bot.sendMessage(chatId, stdout.substring(0,4090));
                
                return;
            }
            if (stderr) {
                bot.sendMessage(chatId, 'STDERR!!\n  ' + stderr);
                return;
            }
        });
    }
});