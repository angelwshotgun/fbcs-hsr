// plugins/hash.js
import CryptoJS from 'crypto-js';

export default defineNuxtPlugin(() => {
  const generateHashID = (input) => {
    return CryptoJS.SHA256(input.toString()).toString(CryptoJS.enc.Hex).substring(0, 32);
  };

  return {
    provide: {
      generateHashID,
    },
  };
});
