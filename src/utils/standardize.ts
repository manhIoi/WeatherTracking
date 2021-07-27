import removeTones from './removeTones';

const standardize = (str: string) => {
  const strRemoveTone = removeTones(str);
  const result = strRemoveTone.replace(/ /g, '').toUpperCase();
  return result;
};

export default standardize;
