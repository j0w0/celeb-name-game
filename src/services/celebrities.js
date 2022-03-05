const celebs = require('../api/celebrities.json');

export const getCelebrities = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: celebs
      });
    }, 500);
  })
}