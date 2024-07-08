const pauseCommand = {
    name: 'pause',
    description: 'Pause the current music playback',
    execute(message, args) {
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!message.member.voice.channel) {
            return message.channel.send('You need to be in a voice channel to pause the music!');
        }
        if (!serverQueue) {
            return message.channel.send('There is no music currently playing to pause!');
        }
        if (serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            message.channel.send('Music paused!');
        } else {
            message.channel.send('The music is already paused!');
        }
    },
};

module.exports = pauseCommand;