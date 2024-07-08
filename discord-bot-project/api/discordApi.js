const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg-static');

const client = new Discord.Client();

const queue = new Map();

client.once('ready', () => {
    console.log('Bot is ready to play music!');
});

client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith('!play')) return;

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');

    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
        return message.channel.send('I need the permissions to join and speak in your voice channel!');
    }

    const songInfo = await ytdl.getInfo(args[0]);
    const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
    };

    if (!queue.has(message.guild.id)) {
        queue.set(message.guild.id, {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true,
        });
    }

    const serverQueue = queue.get(message.guild.id);
    serverQueue.songs.push(song);

    if (!serverQueue.connection) {
        serverQueue.connection = await voiceChannel.join();
        play(message.guild, serverQueue.songs[0]);
    }
});

const play = (guild, song) => {
    const serverQueue = queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }

    const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on('finish', () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on('error', error => console.error(error));
    
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Now playing: ${song.title}`);
};

client.login('your-token-goes-here');