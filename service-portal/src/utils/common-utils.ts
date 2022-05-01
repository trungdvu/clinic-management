export function toParamsUrl(params: any) {
  let url = '?';
  let i = 0;
  for (const [key, value] of Object.entries(params)) {
    url += `${i === 0 ? '' : '&'}${key}=${value}`;
    i++;
  }
  return url;
}

export function uniqueBy<T>(arr: T[], attribute: keyof T) {
  return arr.filter(function (this: any, item: any) {
    return !this.has(item[attribute]) && this.add(item[attribute]);
  }, new Set());
}

export function formatVND(amount: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

export const regExpNumber = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
);

// eslint-disable-next-line no-useless-escape
export const regExpEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
