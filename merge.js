import mergeImg from 'merge-img';

import { parseArgs } from './utils/argParser.js';
import { getMultipleImages } from './utils/apiRequests.js';
import { writeImageToFile } from './utils/fileWriter.js';
import { promisify } from 'util';

export const mergeImages = async () => {
  try {
    const { greeting, who, config } = parseArgs();

    const imageRequests = getMultipleImages([greeting, who], config);
    const resolvedPromises = await Promise.all(imageRequests);
    const imageBuffers = resolvedPromises.map((response, i) => {
      return {
        src: response.data,
        x: i === 1 ? config.width : 0,
        y: 0,
      };
    });

    const mergedImage = await mergeImg(imageBuffers, 'binary');
    const mergedImageBuffer = await getCombinedImageBuffer(mergedImage);

    await writeImageToFile(mergedImageBuffer, 'cat-card');
  } catch (error) {
    throw error;
  }
};

const getCombinedImageBuffer = async (image) => {
  try {
    // Converts callback-based functions to return promises
    const bufferPromise = promisify(image.getBuffer.bind(image));

    //  Retrieves Buffer data from Jimp object
    const imageValue = await bufferPromise('image/jpeg');
    return imageValue;
  } catch (error) {
    throw error;
  }
};
