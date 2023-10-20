export function colorToRGBA(color, alpha = 1.0) {
  if (typeof color === 'string') {
    if (color[0] === '#') {
      color = color.slice(1);
    }
    if (color.length !== 6) {
      return color;
    }

    const r = parseInt(color.slice(0, 2), 16);
    const g = parseInt(color.slice(2, 4), 16);
    const b = parseInt(color.slice(4, 6), 16);

    return [r, g, b, alpha];
  }
  if (Array.isArray(color) && color.length === 3) {
    return [...color, alpha];
  }

  return color;
}
