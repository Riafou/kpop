module.exports = {
    name: "daily",
    aliases: [],
    run: async (message, args, cmd, client) => {
        try {
            const channel = await client.channels.fetch('1375132758820524154');
            await channel.send('daily');
            console.log('Commande daily exécutée avec succès');
        } catch (error) {
            console.error('Erreur lors de l\'exécution de la commande daily:', error);
        }
    }
} 