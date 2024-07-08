const loopFeature = (message, serverQueue) => {
  const server = servers[message.guild.id];

  if (!serverQueue) {
    return message.channel.send('There is no song currently playing.');
  }

  if (!serverQueue.loop) {
    serverQueue.loop = true;
    return message.channel.send('Loop feature enabled for the queue.');
  } else {
    serverQueue.loop = false;
    return message.channel.send('Loop feature disabled for the queue.');
  }
};

module.exports = loopFeature;