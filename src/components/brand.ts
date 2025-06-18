import { Component } from "../app";
import { Offcanvas } from "bootstrap";

export class BrandComponent extends Component<void, HTMLAnchorElement> {

  /**
   * Creates a new brand component for the navbar.
   *
   * @param name - The display name of the brand. Defaults to 'Flick'.
   * @param icon - The URL or path to the brand icon image. Defaults to 'favicon.ico'.
   * @param offcanvas_id - The ID of the offcanvas element to show when the brand is clicked. Defaults to 'flick-offcanvas'.
   *
   * The constructor initializes the brand element as an anchor tag styled for the navbar,
   * sets up a click event to show the specified offcanvas, and creates a flex container
   * with the brand icon and name.
   */
  constructor(name: string = 'Flick', icon: string = 'favicon.ico', offcanvas_id: string | null = null) {
    super(undefined, document.createElement('a'));
    this.element.classList.add('navbar-brand');
    this.element.href = '#';
    if (offcanvas_id)
      this.element.addEventListener('click', (event) => {
        event.preventDefault();
        Offcanvas.getOrCreateInstance(document.getElementById(offcanvas_id)!).show();
      });

    const brand_container = document.createElement('div');
    brand_container.style.display = 'flex';
    brand_container.style.alignItems = 'center';
    brand_container.style.gap = '0.5rem'; // Add space between icon and text

    const brand_icon = document.createElement('img');
    brand_icon.src = icon;
    brand_icon.alt = name;
    brand_icon.width = 32;
    brand_icon.height = 32;
    brand_icon.classList.add('d-inline-block', 'align-text-top', 'me-1');

    const brand_text = document.createElement('span');
    brand_text.textContent = name;
    brand_text.style.fontWeight = '500'; // Make text slightly bolder

    brand_container.appendChild(brand_icon);
    brand_container.appendChild(brand_text);
    this.element.appendChild(brand_container);
  }
}
