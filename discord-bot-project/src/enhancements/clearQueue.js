const clearQueue = (message, queue) => {
    if (!message.member.voice.channel) {
        return message.channel.send("You need to be in a voice channel to clear the queue.");
    }

    if (!queue || !queue.songs || queue.songs.length === 0) {
        return message.channel.send("The queue is already empty.");
    }

    queue.songs = [];
    queue.connection.dispatcher.end();
    return message.channel.send("Queue cleared successfully.");
};

module.exports = clearQueue;