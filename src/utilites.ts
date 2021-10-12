import {AppPaths} from './constants';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const snakeToCamelAdapter = function f(data: any): any {

  const wordAdapter = (word: string) => {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  };

  const stringAdapter = (string: string) => {
    if (!string.includes(`_`)) {
      return string;
    }
    const words = string.split(`_`);
    return words.map((word, i) => i === 0
      ? word.toLowerCase()
      : wordAdapter(word)
    ).join(``);
  };

  if (data instanceof Array) {
    return data.map((item) => f(item));
  } else if (data instanceof Object) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = {};
    Object.keys(data).forEach((key) => {
      if (data[key] instanceof Object) {
        result[stringAdapter(key)] = f(data[key]);
      } else {
        result[stringAdapter(key)] = data[key];
      }
    });
    return result;
  }
  return data;
};

export const makeLink = function(path: typeof AppPaths[keyof typeof AppPaths], id: number): string {
  switch(path) {
    case AppPaths.ADD_REVIEW:
      return `/films/${id}/review`;
    case AppPaths.FILM:
      return `/films/${id}`;
    case AppPaths.PLAYER:
      return `/player/${id}`;
  }
  return ``;
}
