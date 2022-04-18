export function sleep(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        resolve(`Sleep ${ms}ms`);
      },
      ms > 0 ? ms : 0,
    );
  });
}
