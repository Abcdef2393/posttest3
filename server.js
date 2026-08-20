
import { Client, GatewayIntentBits } from 'discord.js';


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,          
        GatewayIntentBits.GuildMessages,   
        GatewayIntentBits.MessageContent   
    ]
});

const TARGET_CHANNEL_ID = process.env.CHANNEL_ID; 

client.once('ready', () => {
    console.log(`🤖 clocked in as ${client.user.tag}! Ready to catch orders.`);
});

client.on('messageCreate', async (message) => {
    
    let messageSenderType = message.webhookId;    // Tracks if it came from a Roblox Webhook
    let messageLocation = message.channelId;       // Tracks which channel the message landed in
    let robloxRawContent = message.content;       // Tracks the raw text string (e.g., "hello")
    let botSelfIdentity = client.user.id;         // Tracks the bot's own ID to prevent loops
    let messageAuthorIdentity = message.author.id; // Tracks the ID of who sent the message

    if (!messageSenderType || messageLocation !== TARGET_CHANNEL_ID) return;
    if (messageAuthorIdentity === botSelfIdentity) return;

    console.log(`captured valid ticket:"${robloxRawContent}"`);

    // and run 'await message.delete()' once the kitchen is done cooking.

});


client.login(process.env.DISCORD_TOKEN);
