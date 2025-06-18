import { App, AppListener, Component } from "../app";
import { Connection, ConnectionListener } from "../utils/connection";

/**
 * The `NavbarComponent` class represents a navigation bar component in the application.
 * It manages the payload and element of the navigation bar component.
 */
export class NavbarComponent extends Component<App, HTMLDivElement> {

  constructor() {
    super(App.get_instance(), document.createElement('div'));
    this.element.classList.add('collapse', 'navbar-collapse');
    this.element.id = 'navbarNav';
  }
}

/**
 * The `AppComponent` class represents the main application component.
 * It manages the application element and listens to application and connection events.
 */
export class AppComponent extends Component<App, HTMLDivElement> implements AppListener, ConnectionListener {

  /**
   * The Navbar component of the application.
   * 
   * @type {NavbarComponent}
   */
  protected readonly navbar: NavbarComponent;

  /**
   * Create an instance of the AppComponent.
   * 
   * @param {string} id The ID of the element to use as the root of the application.
   */
  constructor(id: string = 'app') {
    super(App.get_instance(), document.querySelector('#' + id) as HTMLDivElement);
    this.element.classList.add('d-flex', 'flex-column', 'h-100');

    const fragment = document.createDocumentFragment();

    // Add the Navbar..
    const navbar = document.createElement('nav');
    navbar.classList.add('navbar', 'navbar-expand-lg');
    const nav_container = document.createElement('div');
    nav_container.classList.add('container-fluid');

    const toggler = document.createElement('button');
    toggler.classList.add('navbar-toggler');
    toggler.type = 'button';
    toggler.setAttribute('data-bs-toggle', 'collapse');
    toggler.setAttribute('data-bs-target', '#navbarNav');
    toggler.setAttribute('aria-controls', 'navbarNav');
    toggler.setAttribute('aria-expanded', 'false');
    toggler.setAttribute('aria-label', 'Toggle navigation');
    const toggler_span = document.createElement('span');
    toggler_span.classList.add('navbar-toggler-icon');
    toggler.appendChild(toggler_span);
    nav_container.appendChild(toggler);

    this.navbar = new NavbarComponent();
    nav_container.appendChild(this.navbar.element);

    navbar.appendChild(nav_container);
    fragment.appendChild(navbar);

    // Add the toast container..
    const toast_container = document.createElement('div');
    toast_container.classList.add('toast-container');
    fragment.appendChild(toast_container);

    this.element.appendChild(fragment);

    App.get_instance().add_app_listener(this);
    Connection.get_instance().add_connection_listener(this);
  }

  toast(info: string): void {
    const toast_container = this.element.querySelector('.toast-container') as HTMLDivElement;
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

  selected_component(component: Component<any, HTMLElement> | null): void {
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
