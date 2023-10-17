export function parseJWT(jwt) {
  if (!jwt) return false;
  const base64Url = jwt.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

export function isTokenExpried(token) {
  if (!token) return false;

  const decoded = parseJWT(token);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
}
