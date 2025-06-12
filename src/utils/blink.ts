/**
 * Adds a custom CSS class to one or more HTML elements for a specified duration,
 * creating a temporary visual effect.
 *
 * @param elements - A single HTML element or an array of elements to apply the effect to.
 * @param options - Configuration options for the blinking effect:
 *   - className: The CSS class to apply (defaults to 'blink')
 *   - duration: The duration in milliseconds for the effect (defaults to 500ms)
 * @returns A function that can be called to cancel the effect before the duration expires
 */
export function blink(elements: HTMLElement | HTMLElement[], options: { className?: string; duration?: number } = {}): () => void {
  const className = options.className || 'blink';
  const duration = options.duration || 500;

  // Convert single element to array for consistent handling
  const elementArray = Array.isArray(elements) ? elements : [elements];

  // Add the class to all elements
  elementArray.forEach(el => el.classList.add(className));

  // Set a single timeout for all elements
  const timeoutId = setTimeout(() => {
    elementArray.forEach(el => el.classList.remove(className));
  }, duration);

  // Return a cancellation function
  return () => {
    clearTimeout(timeoutId);
    elementArray.forEach(el => el.classList.remove(className));
  };
}