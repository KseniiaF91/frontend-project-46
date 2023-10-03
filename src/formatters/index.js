import getStylish from './stylish.js';
import getPlain from './plain.js';

const getFotmatName = (data, formatName) => {
  switch (formatName) {
    case 'stylish':
      return getStylish(data);
    case 'plain':
      return getPlain(data);
    default:
      throw new Error(`Unknown format: '${formatName}'!`);
  }
};
export default getFotmatName;
