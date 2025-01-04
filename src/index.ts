function dboun(fn: Function, delay = 400) {
  let timeout: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

export default dboun