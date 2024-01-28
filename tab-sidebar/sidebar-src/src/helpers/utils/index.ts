export const debounce = (debounceFn: (...args: any)=>void, durationInMs = 50) => {

  const timeoutId = 0;

  return (...args: any) => {
    clearTimeout(timeoutId);
    setTimeout(() => {
      debounceFn(...args);
    }, durationInMs);
  };

};
