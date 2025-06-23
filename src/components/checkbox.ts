import { Component } from "../app";

export class CheckboxComponent<P> extends Component<P, HTMLDivElement> {

  checkbox: HTMLInputElement;

  constructor(payload: P, label?: string) {
    super(payload, document.createElement('div'));
    this.element.classList.add('form-check');
    this.checkbox = document.createElement('input');
    this.checkbox.type = 'checkbox';
    this.checkbox.classList.add('form-check-input');
    this.element.appendChild(this.checkbox);
    if (label) {
      const labelElement = document.createElement('label');
      labelElement.classList.add('form-check-label');
      labelElement.textContent = label;
      this.element.appendChild(labelElement);
    }
    this.element.addEventListener('click', () => {
      if (this.checkbox.checked)
        this.select();
      else
        this.unselect();
    });
  }

  select(): void { }
  unselect(): void { }
}