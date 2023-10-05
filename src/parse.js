import { load } from 'js-yaml';

const parse = (data, fileFormat) => {
  switch (fileFormat) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
      return load(data);
    case '.yml':
      return load(data);
    default:
      throw new Error(`Unknown file format ${fileFormat}`);
  }
};

export default parse;
