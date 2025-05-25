module.exports = {
    name: "work",
    aliases: [],
    run: async (message, args, cmd, client) => {
        try {
            message.channel.send('work');
            console.log('Commande work exécutée avec succès');
        } catch (error) {
            console.error('Erreur lors de l\'exécution de la commande work:', error);
        }
    }
} 