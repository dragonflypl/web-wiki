import { debug } from './util';

export const add = (a, b) => {
  debug(`Adding ${a} and ${b}`);
  return a + b;
};
