const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// Web server for Render to ping
app.get('/', (req, res) => res.send('Bot is active!'));
app.listen(process.env.PORT || 3000);

const bot = mineflayer.createBot({
    host: 'GlitchNova_7.aternos.me',
    port: 14568,
    username: 'GlitchBot_AFK',
    version: false // Auto-detects your 26.1.2 version
});

// Anti-AFK Jump
setInterval(() => {
    if (bot.entity) {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
    }
}, 30000);

// Auto-Reconnect if kicked
bot.on('end', () => setTimeout(() => { location.reload(); }, 10000));
bot.on('error', (err) => console.log('Error:', err));

console.log("Bot script is running...");
