export const pick = <
  objct extends Record<string, unknown>,
  ke extends keyof objct
>(
  obj: objct,
  keys: ke[]
) => {
  const finalObj: Partial<objct> = {};

  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  }

  return finalObj;
};
