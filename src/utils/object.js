/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */

export function hasEmptyValues(arrays) {
  for (let i = 0; i < arrays.length; i += 1) {
    const obj = arrays[i];
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && !obj[key]) {
        return true;
      }
    }
  }
  return false;
}
