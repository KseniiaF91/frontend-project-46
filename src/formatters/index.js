import getStylish from './stylish.js';
import getPlain from './plain.js';
import getJson from './json.js';

const getFotmatName = (data, formatName) => {
  switch (formatName) {
    case 'stylish':
      return getStylish(data);
    case 'plain':
      return getPlain(data);
    case 'json':
      return getJson(data);
    default:
      throw new Error(`Unknown format: '${formatName}'!`);
  }
};
export default getFotmatName;
