const Discord = require('discord.js');
const { joinVoiceChannel, playMusic, stopMusic, displayQueue } = require('./features');
const { loopFeature, shuffleOption, clearQueue, spotifyIntegration, interactiveInterface } = require('./enhancements');

const client = new Discord.Client();

client.once('ready', () => {
  console.log('Bot is ready to play music!');
});

client.on('message', async message => {
  if (message.author.bot) return;
  
  const args = message.content.trim().split(/ +/);
  const command = args.shift().toLowerCase();
  
  if (command === '!play') {
    playMusic(message, args);
  } else if (command === '!pause') {
    stopMusic(message);
  } else if (command === '!skip') {
    stopMusic(message);
    playMusic(message, args);
  } else if (command === '!volume') {
    adjustVolume(message, args);
  } else if (command === '!queue') {
    displayQueue(message);
  }
  
  // Additional enhancements commands
  if (command === '!loop') {
    loopFeature(message, args);
  } else if (command === '!shuffle') {
    shuffleOption(message);
  } else if (command === '!clear') {
    clearQueue(message, args);
  } else if (command === '!spotify') {
    spotifyIntegration(message, args);
  } else if (command === '!interface') {
    interactiveInterface(message);
  }
});

client.login('YOUR_DISCORD_TOKEN');