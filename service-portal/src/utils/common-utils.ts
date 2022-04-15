export function toParamsUrl(params: any) {
  let url = '';

  for (const [key, value] of Object.entries(params)) {
    url += `?${key}=${value}`;
  }
  return url;
}
