import { PayloadComponent } from "../component";

/**
 * Represents a button component that extends {@link PayloadComponent} with a payload of type `P`.
 * 
 * This component creates an HTML `<button>` element and associates it with the provided payload.
 *
 * @typeParam P - The type of the payload associated with the button.
 * @extends PayloadComponent<HTMLButtonElement, P>
 * 
 * @example
 * ```typescript
 * const button = new ButtonComponent<MyPayloadType>(payload);
 * ```
 */
export class ButtonComponent<P> extends PayloadComponent<HTMLButtonElement, P> {

  constructor(payload: P) { super(document.createElement('button'), payload); }
}
