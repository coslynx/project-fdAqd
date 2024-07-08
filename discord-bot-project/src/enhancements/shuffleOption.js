const shuffleOption = (queue) => {
  if (!Array.isArray(queue) || queue.length === 0) {
    return "Queue is empty or invalid.";
  }

  for (let i = queue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [queue[i], queue[j]] = [queue[j], queue[i]];
  }

  return queue;
};

module.exports = shuffleOption;