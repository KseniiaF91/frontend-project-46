import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const readFile = (filepath) => {
  const fullPath = path.resolve('__fixtures__', filepath);
  const data = fs.readFileSync(fullPath).toString();
  return data;
};

const sortedKeys = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const unionKeys = _.union(keys1, keys2);
  const sortKeys = _.sortBy(unionKeys);
  return sortKeys;
};

const genDiff = (filepath1, filepath2) =>{

const data1 = readFile(filepath1);
const data2 = readFile(filepath2);

const dataParse1 = JSON.parse(data1);
const dataParse2 = JSON.parse(data2);

const key1 = sortedKeys(dataParse1);
const key2 = sortedKeys(dataParse2);

const allKeys = [...key1, ...key2];

let diff = {};

for (const keys of allKeys) {
  switch(true) {
case  !key1.includes(keys):
   diff[`+ ${keys}`] = dataParse2[keys];
   break;
case !key2.includes(keys):
   diff[`- ${keys}`] = dataParse1[keys];
break;
case dataParse1[keys] === dataParse2[keys]:
  diff[`  ${keys}`] = dataParse1[keys];
  break;
  case dataParse1[keys] !== dataParse2[keys]:
    diff[`- ${keys}`] = dataParse1[keys];
    diff[`+ ${keys}`] = dataParse2[keys];
    break;
  default:
    break;
  }
}
return diff;
}
export default genDiff;