const stopMusic = (message) => {
  const serverQueue = message.client.queue.get(message.guild.id);

  if (!message.member.voice.channel) {
    return message.channel.send('You need to be in a voice channel to stop the music!');
  }

  if (!serverQueue) {
    return message.channel.send('There is no song currently playing.');
  }

  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
};

module.exports = stopMusic;