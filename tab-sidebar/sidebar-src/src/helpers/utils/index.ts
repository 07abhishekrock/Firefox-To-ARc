export const debounce = <T>(debounceFn: (arg: T)=>void, durationInMs = 50) => {

  const timeoutId = 0;

  return (arg: T) => {
    clearTimeout(timeoutId);
    setTimeout(() => {
      debounceFn(arg);
    }, durationInMs);
  };

};
