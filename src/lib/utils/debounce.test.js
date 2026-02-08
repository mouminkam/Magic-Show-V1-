import { debounce } from './debounce';

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('delays function execution', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('cancels previous call when called again within wait', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    jest.advanceTimersByTime(50);
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('passes arguments to the function', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn('a', 'b');
    jest.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledWith('a', 'b');
  });
});
