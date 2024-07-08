const playMusic = (message, serverQueue) => {
  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel) {
    return message.channel.send('You need to be in a voice channel to play music!');
  }
  
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
    return message.channel.send('I need the permissions to join and speak in your voice channel!');
  }
  
  const song = serverQueue.songs[0];
  
  const dispatcher = serverQueue.connection.play(ytdl(song.url, { filter: 'audioonly' }))
    .on('finish', () => {
      serverQueue.songs.shift();
      playMusic(message, serverQueue);
    })
    .on('error', error => {
      console.error(error);
      message.channel.send('An error occurred while playing the song.');
    });
  
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  
  message.channel.send(`Now playing: ${song.title}`);
};

module.exports = playMusic;