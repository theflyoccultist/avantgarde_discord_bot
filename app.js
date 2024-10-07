import('./bot.js')
    .then(() => {
        console.log('Bot has started successfully')
    })
    .catch((err) => {
        console.error('Failed to start the bot:', err);
    })