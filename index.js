const { Client, GatewayIntentBits, Collection } = require('discord.js-selfbot-v13');
const express = require('express');

// Configuration du client Discord
const client = new Client({
    checkUpdate: false,
});

// Configuration Express pour Railway
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot is running!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Configuration des variables d'environnement
const token = process.env.TOKEN;
const channelId = process.env.CHANNEL_ID;
const APPLICATION_ID = process.env.APPLICATION_ID;

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

var pokemon = [];
client.on('ready', () => {
    console.log('-------------------------------');
    console.log(`${client.user.username} est connecté`);
    console.log('-------------------------------');
    
    startAutomaticCommands();
});

async function executeSlashCommand(channel, commandName) {
    try {
        await channel.sendSlash(APPLICATION_ID, commandName);
        console.log(`Commande ${commandName} exécutée avec succès`);
    } catch (error) {
        console.error(`Erreur lors de l'exécution de la commande ${commandName}:`, error);
    }
}

function startAutomaticCommands() {
    const channel = client.channels.cache.get(channelId);
    if (!channel) return console.log("Canal non trouvé");

    // Commande work toutes les 20 minutes
    setInterval(async () => {
        await executeSlashCommand(channel, 'work');
    }, 20 * 60 * 1000);

    // Commande daily toutes les 24 heures
    setInterval(async () => {
        await executeSlashCommand(channel, 'daily');
    }, 24 * 60 * 60 * 1000);

    // Exécuter les commandes immédiatement au démarrage
    setTimeout(async () => {
        await executeSlashCommand(channel, 'daily');
        setTimeout(async () => {
            await executeSlashCommand(channel, 'work');
        }, 2000);
    }, 5000);
}

// Gestion des erreurs
client.on('error', error => {
    console.error('Erreur Discord:', error);
});

process.on('unhandledRejection', error => {
    console.error('Erreur non gérée:', error);
});

// Connexion du bot
client.login(token);
