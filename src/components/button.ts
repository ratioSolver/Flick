import { Component } from "../app";

/**
 * The `ButtonComponent` class represents a button component in the application.
 * It manages the payload and element of the button component.
 *
 * @template P The type of the payload.
 */
export class ButtonComponent<P> extends Component<P, HTMLButtonElement> {

  constructor(payload: P) { super(payload, document.createElement('button')); }
}
