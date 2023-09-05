// @ts-check

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import { test, expect } from '@jest/globals';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);
const readFile = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf-8').toString();

const files = [['filepath1.json', 'filepath2.json'], ['filepath1.yaml', 'filepath2.yaml'], ['filepath1.yml', 'filepath2.yml']];

test.each(files)('comparison of "json" files', (file1, file2) => {
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  const result = readFile('json.txt');
  expect((gendiff(filepath1, filepath2))).toEqual(result);
});
