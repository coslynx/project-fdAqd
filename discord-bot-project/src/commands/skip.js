const { VoiceConnectionStatus } = require('@discordjs/voice');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    name: 'skip',
    description: 'Skip the current song in the queue',

    async execute(message, args) {
        const voiceConnection = getVoiceConnection(message.guild.id);

        if (!voiceConnection || voiceConnection.state.status !== VoiceConnectionStatus.Ready) {
            return message.channel.send('I need to be in a voice channel to skip a song!');
        }

        const queue = message.client.queue.get(message.guild.id);

        if (!queue || queue.songs.length === 0) {
            return message.channel.send('There are no songs in the queue to skip!');
        }

        // Skip the current song
        queue.songs.shift();

        if (queue.songs.length === 0) {
            queue.player.stop();
            message.client.queue.delete(message.guild.id);
            return message.channel.send('There are no more songs in the queue to play!');
        }

        // Play the next song in the queue
        queue.player.play(queue.songs[0]);

        return message.channel.send('Skipped the current song!');
    }
};