import { Component } from "../app";

/**
 * The `CheckboxComponent` class represents a checkbox component in the application.
 * It manages the payload and element of the checkbox component and its selection state.
 *
 * @template P The type of the payload.
 */
export class CheckboxComponent<P> extends Component<P, HTMLDivElement> {

  private readonly checkbox: HTMLInputElement;

  /**
   * Creates a new CheckboxComponent.
   * 
   * @param payload The payload associated with the checkbox.
   * @param id_factory A function to generate the ID for the checkbox based on the payload.
   * @param selected Whether the checkbox is initially selected.
   * @param label Optional label for the checkbox.
   */
  constructor(payload: P, id_factory: (payload: P) => string, selected: boolean = false, label?: string) {
    super(payload, document.createElement('div'));
    this.element.classList.add('form-check');

    this.checkbox = document.createElement('input');
    this.checkbox.type = 'checkbox';
    this.checkbox.classList.add('form-check-input');
    this.checkbox.checked = selected;
    this.checkbox.id = id_factory(payload);
    this.element.appendChild(this.checkbox);

    if (label) {
      const labelElement = document.createElement('label');
      labelElement.classList.add('form-check-label');
      labelElement.textContent = label;
      labelElement.setAttribute('for', this.checkbox.id);
      this.element.appendChild(labelElement);
    }

    this.checkbox.addEventListener('click', () => {
      if (this.checkbox.checked)
        this.selected();
      else
        this.unselected();
    });
  }

  /**
   * Sets the checked state of the checkbox.
   * 
   * @param checked The new checked state.
   */
  set_checked(checked: boolean): void {
    this.checkbox.checked = checked;
    if (checked)
      this.selected();
    else
      this.unselected();
  }

  /**
   * Callback when the checkbox is selected.
   * Override this method to define custom behavior when the checkbox is selected.
   */
  selected(): void { }

  /**
   * Callback when the checkbox is unselected.
   * Override this method to define custom behavior when the checkbox is unselected.
   */
  unselected(): void { }
}