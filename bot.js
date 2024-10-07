import { Client, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';

config();
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions
    ] 
});

const TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;


client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    // Ignore messages from bots
    if (message.author.bot) return;

    // Check if the message is from the specified channel
    if (message.channel.id === CHANNEL_ID) {

        const emojiMap = {
            'avant garde': '1202544420197634159',
            'avantgarde': '1202544420197634159',
            'conventional': '1205887752608940033',
            'abstract': '1205887749182197810',
            'assemblage': '1205887751069765642',
            'illusion': '1205887754777657414',
            'human': '1223500235800838246',
            'post': '1205887758535761920',
            'impression': '1205887756593533010',
            'surreal': '1205887760741961788',
            'imperial': '1208493660250054716',
            'trans': '1253497562535694447',
            'transgender': '1253497562535694447'
        };

        for (const [keyword, emojiId] of Object.entries(emojiMap)) {
            if (message.content.toLowerCase().includes(keyword)) {
                await reactWithEmoji(message, emojiId);
            }
        }
    }
});

async function reactWithEmoji (message, emojiId) {
    const emoji = message.guild.emojis.cache.get(emojiId);
    if (emoji) {
        await message.react(emoji);
    } else {
        console.error(`Emoji with ID ${emojiId} not found`);
    }
}

client.login(TOKEN);