import _ from 'lodash';

const getIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat((depth * spacesCount) - 2);
const getBrackeIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat((depth * spacesCount) - spacesCount);

const stringify = (data, depth = 1) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }

  const indentForKey = getIndent(depth);
  const indentForBracket = getBrackeIndent(depth);
  const currentValue = Object.entries(data);
  const lines = currentValue.map(([key, value]) => `${indentForKey}  ${key}: ${stringify(value, depth + 1)}`);

  return ['{', ...lines, `${indentForBracket}}`].join('\n');
};

const signs = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
};

const getStylishTree = (tree) => {
  const iter = (currentValue, depth = 1) => currentValue.flatMap((node) => {
    const indent = getIndent(depth);
    const bracketIndent = getBrackeIndent(depth + 1);

    const makeLine = (sign, value) => `${indent}${sign} ${node.key}: ${stringify(value, depth + 1)}`;

    switch (node.status) {
      case 'added':
        return makeLine(signs.added, node.value);
      case 'deleted':
        return makeLine(signs.deleted, node.value);
      case 'unchanged':
        return makeLine(signs.unchanged, node.value);
      case 'changed':
        return [`${makeLine(signs.deleted, node.value1)}`,
          `${makeLine(signs.added, node.value2)}`].join('\n');
      case 'nested':
        return `${indent}  ${node.key}: ${['{', ...iter(node.value, depth + 1), `${bracketIndent}}`].join('\n')}`;
      default:
        throw new Error(`Type: ${node.status} is undefined`);
    }
  });

  const stylishTree = iter(tree);
  return ['{', ...stylishTree, '}'].join('\n');
};

export default getStylishTree;
