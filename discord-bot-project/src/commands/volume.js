const { CommandInteraction } = require('discord.js');

module.exports = {
    data: {
        name: 'volume',
        description: 'Adjust the volume of the music being played',
        options: [
            {
                name: 'level',
                type: 'INTEGER',
                description: 'The volume level to set (0-100)',
                required: true,
            },
        ],
    },
    async execute(interaction = new CommandInteraction()) {
        const { options } = interaction;
        const volumeLevel = options.getInteger('level');

        if (volumeLevel < 0 || volumeLevel > 100) {
            return interaction.reply({
                content: 'Volume level must be between 0 and 100.',
                ephemeral: true,
            });
        }

        const member = interaction.guild.members.cache.get(interaction.user.id);
        const channel = member.voice.channel;

        if (!channel) {
            return interaction.reply({
                content: 'You need to be in a voice channel to adjust the volume.',
                ephemeral: true,
            });
        }

        const player = interaction.client.music.get(interaction.guild.id);

        if (!player) {
            return interaction.reply({
                content: 'No music is currently playing in this server.',
                ephemeral: true,
            });
        }

        player.setVolume(volumeLevel);
        interaction.reply(`Volume set to ${volumeLevel}%`);
    },
};