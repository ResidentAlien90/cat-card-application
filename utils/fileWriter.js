import { join } from 'path';
import { writeFile } from 'fs';
import { promisify } from 'util';

export const writeImageToFile = async (image, filename = 'test') => {
  try {
    const writeFilePromise = promisify(writeFile);

    const baseFolder = 'images';
    const modifiedFilename = `${filename}-${Date.now()}.jpg`;
    const fileOut = join(process.cwd(), baseFolder, modifiedFilename);

    await writeFilePromise(fileOut, image, 'binary');
    console.log('The file was saved!');
  } catch (error) {
    throw error;
  }
};
