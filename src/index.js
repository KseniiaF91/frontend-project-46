import path from 'path';
import fs from 'fs';
import parse from './parse.js';
import compareDifference from './comparedifference.js';
import getStylish from './formatters/stylish.js';

const readFile = (filepath) => {
  const fullPath = path.resolve('__fixtures__', filepath);
  const data = fs.readFileSync(fullPath, 'utf-8').toString();
  return data;
};

const getFormat = (filepath) => path.extname(filepath);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  const dataParse1 = parse(data1, getFormat(filepath1));
  const dataParse2 = parse(data2, getFormat(filepath2));

  const diff = compareDifference(dataParse1, dataParse2);
  return getStylish(diff);
};
export default genDiff;
