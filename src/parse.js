import { load } from 'js-yaml';

const parse = (data, fileFormat) => {
  if (fileFormat === '.json') {
    return JSON.parse(data);
  } if (fileFormat === '.yaml' || fileFormat === '.yml') {
    return load(data);
  }
  return console.error(`Unknown file format ${fileFormat}`);
};
export default parse;
