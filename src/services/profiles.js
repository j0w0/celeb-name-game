const profiles = require('../api/profiles.json');

export const getProfiles = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: profiles
      });
    }, 500);
  })
}