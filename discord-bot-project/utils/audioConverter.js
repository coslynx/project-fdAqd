const fs = require('fs');
const path = require('path');
const ffmpeg = require('ffmpeg-static');

const audioConverter = {
  convertToDiscordFormat: (inputFile, outputFile) => {
    return new Promise((resolve, reject) => {
      try {
        const command = `ffmpeg -y -i ${inputFile} -ar 48000 -ac 2 -b:a 128k ${outputFile}`;

        const child = require('child_process').exec(command, (error, stdout, stderr) => {
          if (error) {
            reject(error);
          } else {
            resolve(outputFile);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }
};

module.exports = audioConverter;