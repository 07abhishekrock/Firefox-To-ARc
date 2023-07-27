export const safeJsonParse = (jsonString: string): object | Array<unknown> | null => {
  try {

    if (!jsonString) return null;
    const data = JSON.parse(jsonString);

    return data;

  } catch (e) {
    return null;
  }
};

export const limitToMaxChars = (stringToLimit: string, charLength: number) => {
  if (stringToLimit.length <= charLength) {
    return stringToLimit;
  }

  return stringToLimit.slice(0, charLength - 3).concat('...');
};
