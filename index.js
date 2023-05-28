import { mergeImages } from './merge.js';

(() => {
  try {
    mergeImages();
  } catch (error) {
    console.error('Caught here');
  }
})();
