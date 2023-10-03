import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  } if (_.isString(value)) {
    return `'${value}'`;
  } return value;
};

const getPlain = (data) => {
  const iter = (value, path) => value.flatMap((node) => {
    const fullPath = [...path, node.key].join('.');

    switch (node.status) {
      case 'added':
        return `Property '${fullPath}' was added with value: ${getValue(node.value)}`;
      case 'deleted':
        return `Property '${fullPath}' was removed`;
      case 'unchanged':
        return [];
      case 'changed':
        return `Property '${fullPath}' was updated. From ${getValue(node.value1)} to ${getValue(node.value2)}`;
      case 'nested':
        return iter(node.value, [fullPath]);
      default:
        throw new Error(`Type: ${node.status} is undefined`);
    }
  });
  return iter(data, '').join('\n');
};
export default getPlain;
