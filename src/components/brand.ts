import { App, Component } from "../app";
import { Offcanvas } from "bootstrap";

export class BrandComponent extends Component<App, HTMLAnchorElement> {

  constructor(offcanvas_id: string = 'flick-offcanvas', name: string = 'Flick', icon: string = 'favicon.ico') {
    super(App.get_instance(), document.createElement('a'));
    this.element.classList.add('navbar-brand');
    this.element.href = '#';
    this.element.addEventListener('click', (event) => {
      event.preventDefault();
      const offcanvasElement = document.getElementById(offcanvas_id);
      if (offcanvasElement) {
        Offcanvas.getOrCreateInstance(offcanvasElement).show();
      }
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
