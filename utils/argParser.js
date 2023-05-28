import minimist from 'minimist';

export const parseArgs = () => {
  const {
    greeting = 'Hello',
    who = 'You',
    width = 400,
    height = 500,
    color = 'Pink',
    size = 100,
  } = minimist(process.argv.slice(2));

  return { greeting, who, config: { width, height, color, size } };
};
