const joinVoiceChannel = (message) => {
  const voiceChannel = message.member.voice.channel;

  if (!voiceChannel) {
    return message.channel.send('You need to be in a voice channel to use this command!');
  }

  voiceChannel.join()
    .then(connection => {
      message.channel.send(`Joined ${voiceChannel.name}!`);
    })
    .catch(error => {
      console.error(`Error joining voice channel: ${error}`);
      message.channel.send('There was an error connecting to the voice channel.');
    });
};

module.exports = joinVoiceChannel;