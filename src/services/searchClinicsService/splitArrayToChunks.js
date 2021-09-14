const splitArrayToChunks = (array, chunkSize) => {
  let chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    if((i + chunkSize) > array.length) {
      chunks.push(array.slice(i, array.length + 1));
    } else {
      chunks.push(array.slice(i, i + chunkSize));
    }
  }
  return chunks;
}

module.exports = {splitArrayToChunks};
