export function toParamsUrl(params: any) {
  let url = '?';
  let i = 0;
  for (const [key, value] of Object.entries(params)) {
    url += `${i === 0 ? '' : '&'}${key}=${value}`;
    i++;
  }
  return url;
}

export const regExpNumber = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
);

// eslint-disable-next-line no-useless-escape
export const regExpEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
