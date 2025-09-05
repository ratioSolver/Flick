import { Collapse } from "bootstrap";
import { App, AppListener } from "../app";
import { Component, Fragment } from "../component";
import { Connection, ConnectionListener } from "../utils/connection";

class NavbarComponent extends Component<HTMLElement> {

  constructor(brand: BrandComponent, content: NavbarContent) {
    super(document.createElement('nav'));
    this.node.classList.add('navbar', 'navbar-expand-lg');

    this.add_child(new NavbarContainer(brand, content));
  }
}

class NavbarContainer extends Component<HTMLDivElement> {

  constructor(brand: BrandComponent, content: NavbarContent) {
    super(document.createElement('div'));
    this.node.classList.add('container-fluid');

    // Add the brand..
    this.add_child(brand);

    // Add the toggler..
    const toggler = document.createElement('button');
    toggler.classList.add('navbar-toggler');
    toggler.type = 'button';
    toggler.setAttribute('aria-controls', 'navbarContent');
    toggler.setAttribute('aria-expanded', 'false');
    toggler.setAttribute('aria-label', 'Toggle navigation');
    const toggler_span = document.createElement('span');
    toggler_span.classList.add('navbar-toggler-icon');
    toggler.appendChild(toggler_span);
    this.node.appendChild(toggler);

    // Add the content..
    this.add_child(content);

    toggler.addEventListener('click', (event) => {
      event.preventDefault();
      Collapse.getOrCreateInstance(content.node).toggle();
    });
  }
}

export class BrandComponent extends Component<HTMLAnchorElement> {

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
    super(document.createElement('a'));
    this.node.classList.add('navbar-brand', 'd-flex', 'align-items-center', 'gap-2');

    this.node.style.display = 'flex';
    this.node.style.alignItems = 'center';
    this.node.style.gap = '0.5rem'; // Add space between icon and text

    const brand_icon = document.createElement('img');
    brand_icon.src = icon;
    brand_icon.alt = name;
    brand_icon.width = icon_width;
    brand_icon.height = icon_height;
    brand_icon.classList.add('d-inline-block', 'align-text-top');
    this.node.appendChild(brand_icon);

    if (name) {
      brand_icon.classList.add('me-1');

      const brand_text = document.createElement('span');
      brand_text.textContent = name;
      brand_text.style.fontWeight = '500'; // Make text slightly bolder

      this.node.appendChild(brand_text);
    }
  }
}

export class NavbarContent extends Component<HTMLDivElement> {

  constructor() {
    super(document.createElement('div'));
    this.node.classList.add('collapse', 'navbar-collapse');
    this.node.id = 'navbarContent';
  }
}

export class AppComponent extends Component<HTMLDivElement> implements AppListener, ConnectionListener {

  /**
   * Create an instance of the AppComponent.
   * 
   * @param {string} id The ID of the element to use as the root of the application.
   */
  constructor(brand: BrandComponent = new BrandComponent(), content: NavbarContent = new NavbarContent(), id: string = 'app') {
    super(document.querySelector('#' + id) as HTMLDivElement);
    this.node.classList.add('d-flex', 'flex-column', 'h-100');

    const fragment = new Fragment();
    fragment.add_child(new NavbarComponent(brand, content));

    // Add the toast container..
    const toast_container = document.createElement('div');
    toast_container.classList.add('toast-container', 'position-fixed', 'bottom-0', 'end-0', 'p-3');
    fragment.node.appendChild(toast_container);
    fragment.attach_to(this);

    App.get_instance().add_app_listener(this);
    Connection.get_instance().add_connection_listener(this);
  }

  toast(info: string): void {
    const toast_container = this.node.querySelector('.toast-container') as HTMLDivElement;
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.setAttribute('data-bs-autohide', 'true');
    toast.setAttribute('data-bs-delay', '5000');
    const toast_header = document.createElement('div');
    toast_header.classList.add('toast-header');
    const toast_title = document.createElement('strong');
    toast_title.classList.add('me-auto');
    toast_title.innerText = 'Info';
    toast_header.appendChild(toast_title);
    const toast_button = document.createElement('button');
    toast_button.classList.add('btn-close');
    toast_button.setAttribute('type', 'button');
    toast_button.setAttribute('data-bs-dismiss', 'toast');
    toast_button.setAttribute('aria-label', 'Close');
    toast_header.appendChild(toast_button);
    toast.appendChild(toast_header);
    const toast_body = document.createElement('div');
    toast_body.classList.add('toast-body');
    toast_body.innerText = info;
    toast.appendChild(toast_body);
    toast_container.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
  }

  selected_component(component: Component<Node> | null): void {
    if (component)
      this.add_child(component);
  }

  connected(): void { }
  logged_in(_info: any): void { }
  received_message(_message: any): void { }
  disconnected(): void { }
  logged_out(): void { }
  connection_error(_error: any): void { }

  override unmounting(): void {
    App.get_instance().remove_app_listener(this);
    Connection.get_instance().remove_connection_listener(this);
  }
}
