const queue = {
  songs: [],
  playing: false,
  connection: null,
  dispatcher: null,
  
  async execute(message, serverQueue) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.channel.send('You need to be in a voice channel to play music!');
    }
    
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
      return message.channel.send('I need the permissions to join and speak in your voice channel!');
    }
    
    const songInfo = await ytdl.getInfo(serverQueue.songs[0].url);
    const song = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url,
    };
    
    if (!serverQueue) {
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true,
      };
      
      queueContruct.songs.push(song);
      
      this.songs.set(message.guild.id, queueContruct);
  
      try {
        var connection = await voiceChannel.join();
        queueContruct.connection = connection;
        this.play(message.guild, queueContruct.songs[0]);
      } catch (err) {
        console.error(err);
        this.songs.delete(message.guild.id);
        return message.channel.send(err);
      }
    } else {
      serverQueue.songs.push(song);
      return message.channel.send(`${song.title} has been added to the queue!`);
    }
  },
  
  play(guild, song) {
    const serverQueue = this.songs.get(guild.id);
    
    if (!song) {
      serverQueue.voiceChannel.leave();
      this.songs.delete(guild.id);
      return;
    }
    
    const dispatcher = serverQueue.connection.play(ytdl(song.url, { filter: 'audioonly' }))
      .on('finish', () => {
        serverQueue.songs.shift();
        this.play(guild, serverQueue.songs[0]);
      })
      .on('error', error => {
        console.error(error);
      });
    
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Start playing: **${song.title}**`);
  }
};

module.exports = queue;