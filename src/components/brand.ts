import { Component } from "../app";

export class BrandComponent extends Component<void, HTMLAnchorElement> {

  /**
   * Creates a new brand component for the navigation bar.
   *
   * @param name - The display name of the brand. Defaults to 'Flick'.
   * @param icon - The source URL or path for the brand icon. Defaults to 'favicon.ico'.
   * @param icon_width - The width of the brand icon in pixels. Defaults to 32.
   * @param icon_height - The height of the brand icon in pixels. Defaults to 32.
   *
   * The constructor initializes the brand element with an icon and text,
   * styled and aligned for use in a navigation bar.
   */
  constructor(name: string = 'Flick', icon: string = 'favicon.ico', icon_width: number = 32, icon_height: number = 32) {
    super(undefined, document.createElement('a'));
    this.element.classList.add('navbar-brand');
    this.element.href = '#';

    const brand_container = document.createElement('div');
    brand_container.style.display = 'flex';
    brand_container.style.alignItems = 'center';
    brand_container.style.gap = '0.5rem'; // Add space between icon and text

    const brand_icon = document.createElement('img');
    brand_icon.src = icon;
    brand_icon.alt = name;
    brand_icon.width = icon_width;
    brand_icon.height = icon_height;
    brand_icon.classList.add('d-inline-block', 'align-text-top');
    brand_container.appendChild(brand_icon);

    if (name) {
      brand_icon.classList.add('me-1');

      const brand_text = document.createElement('span');
      brand_text.textContent = name;
      brand_text.style.fontWeight = '500'; // Make text slightly bolder

      brand_container.appendChild(brand_text);
    }

    this.element.appendChild(brand_container);
  }
}
