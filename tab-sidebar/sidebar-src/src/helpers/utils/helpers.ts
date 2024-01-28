export function gracefullySuppressErrors<T>(
  executor: () => T,
  fallbackReturnValue: T
): T {

  try {
    return executor();

  } catch (e) {
    console.error(e);
    return fallbackReturnValue;
  }

}
