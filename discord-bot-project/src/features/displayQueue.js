const displayQueue = (currentSong, queue) => {
  console.log(`Current Song: ${currentSong}`);
  console.log("Upcoming Songs:");
  queue.forEach((song, index) => {
    console.log(`${index + 1}. ${song}`);
  });
};

module.exports = displayQueue;