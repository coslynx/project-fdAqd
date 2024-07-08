const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg-static');

function extractAudioFromYouTube(url) {
    return new Promise((resolve, reject) => {
        try {
            const stream = ytdl(url, { filter: 'audioonly' });
            const ffmpegProcess = ffmpeg(stream)
                .outputOptions('-f s16le')
                .audioCodec('pcm_s16le')
                .format('s16le')
                .on('error', (err) => {
                    reject(err);
                })
                .on('end', () => {
                    resolve();
                });
            ffmpegProcess.stdout.pipe(process.stdout);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    extractAudioFromYouTube
};