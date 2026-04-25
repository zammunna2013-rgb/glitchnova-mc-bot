const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// 1. WEB SERVER: This keeps Render from shutting down your bot.
app.get('/', (req, res) => {
    res.send('GlitchBot is awake and running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Web server listening on port ${PORT}`);
});

// 2. BOT SETTINGS: Manually setting version to 1.21 to fix your error.
const botArgs = {
    host: 'GlitchNova_7.aternos.me',
    port: 14568,
    username: 'GlitchBot_AFK',
    version: '1.21' // Forced version to stop the "No data available" error
};

let bot;

function createBot() {
    console.log("Attempting to join the server...");
    bot = mineflayer.createBot(botArgs);

    bot.on('login', () => {
        console.log('✅ Success! GlitchBot has joined the server.');
    });

    // Anti-AFK: Makes the bot jump every 30 seconds
    setInterval(() => {
        if (bot.entity) {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }
    }, 30000);

    // Auto-Reconnect: If the bot is kicked or the server restarts
    bot.on('end', (reason) => {
        console.log(`❌ Disconnected: ${reason}. Retrying in 15 seconds...`);
        setTimeout(createBot, 15000);
    });

    bot.on('error', (err) => {
        console.log('⚠️ Connection Error:', err.message);
    });
}

// Start the bot process
createBot();

