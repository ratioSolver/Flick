let activeEffect: (() => void) | null = null;

/**
 * A Signal is a wrapper around a value that tracks its subscribers
 */
export function signal<T>(initialValue: T) {
  let value = initialValue;
  const subscribers = new Set<(() => void)>();

  return {
    get() {
      // If an effect is running, it's 'reading' this signal.
      // Add it to our subscribers list.
      if (activeEffect)
        subscribers.add(activeEffect);
      return value;
    },
    set(newValue: T) {
      if (value !== newValue) {
        value = newValue;
        // Notify all subscribers that the value changed
        subscribers.forEach((fn) => fn());
      }
    }
  };
}

/**
 * An Effect runs a function and tracks any signals accessed inside it
 */
export function effect(fn: () => void) {
  const execute = () => {
    activeEffect = execute;
    try {
      fn();
    } finally {
      activeEffect = null;
    }
  };

  execute(); // Run immediately to establish dependencies
}