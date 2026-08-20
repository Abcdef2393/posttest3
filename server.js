console.log("Token exists:", !!process.env.DISCORD_TOKEN);
client.login(process.env.DISCORD_TOKEN);
import { Client, GatewayIntentBits } from 'discord.js';
import express from "express";
const app = express();

app.get("/", (req, res) => {
    res.send("Bot is running");
});

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,          
        GatewayIntentBits.GuildMessages,   
        GatewayIntentBits.MessageContent   
    ]
});

const TARGET_CHANNEL_ID = process.env.CHANNEL_ID; 
const channel = await client.channels.fetch(TARGET_CHANNEL_ID);
const messages = await channel.messages.fetch();
const newestMessage = messages.first();
const currentMessages = [];

for (const message of messages.values()) {
    if (message.id !== newestMessage.id) {
        await message.delete();
    }
}
    

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
    currentMessages.push({
        sendertype: messageSenderType,
        messagelocation: messageLocation,
        content: robloxRawContent,
        sender: messageAuthorIdentity
    });
    

    // and run 'await message.delete()' once the kitchen is done cooking.

});

app.listen(process.env.PORT || 3000, () => {
    console.log("Web server running");
});
