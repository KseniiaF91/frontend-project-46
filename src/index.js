import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';


const genDiff = (filepath1, filepath2) =>{
    const readFile = (filepath) => {
        const fullPath = path.resolve(filepath, process.cwd()); 
        const data = readFileSync(fullPath, 'utf-8').toString();
        return data;
      }
const data1 = readFile(filepath1);
const data2 = readFile(filepath2);

const parsedData = JSON.parse(data);

const dataParse1 = parsedData(data1);
const dataParse2 = parsedData(data2);



}
export default genDiff;