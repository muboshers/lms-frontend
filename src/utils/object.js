/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
export function hasEmptyValues(obj) {
  for (const key in obj) {
    if (
      obj.hasOwnProperty(key) &&
      (obj[key] === '' || obj[key] === null || obj[key] === undefined)
    ) {
      return true;
    }
  }
  return false;
}
