import axios from 'axios';

export const getMultipleImages = (textArr, config) => {
  return textArr.map((text) => getRandomImage(text, config));
};

export const getRandomImage = (text, config) => {
  try {
    const { width, height, color, size } = config;

    const baseURL = 'https://cataas.com/cat/says/';
    const request = `${text}?width=${width}&height=${height}&c=${color}&s=${size}`;

    const instance = axios.create({
      baseURL,
      timeout: 5000,
      responseType: 'arraybuffer',
    });
    return instance.get(request);
  } catch (error) {
    throw error;
  }
};
