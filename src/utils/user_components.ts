import { Modal } from 'bootstrap';
import { App, Component } from '../app';
import { ButtonComponent } from '../components/button';
import { Connection, ConnectionListener } from './connection';

/**
 * Button to create a new user.
 */
export class NewUserButton extends ButtonComponent<void> implements ConnectionListener {

  /**
   * Creates a new button element for triggering the display of a modal dialog.
   * 
   * @param modal_id - The ID of the modal element to be shown when the button is clicked. Defaults to 'newUserModal'.
   */
  constructor(modal_id: string = 'newUserModal') {
    super();
    this.element.type = 'button';
    this.element.classList.add('btn', 'btn-primary');
    this.element.textContent = 'New User';
    this.element.style.marginLeft = 'auto';
    this.element.style.display = 'inline-block';
    this.element.addEventListener('click', () => Modal.getOrCreateInstance(document.getElementById(modal_id)!).show());

    Connection.get_instance().add_connection_listener(this);
  }

  connected(): void { }
  logged_in(_info: any): void {
    // Hide the button if the user is already logged in
    this.element.style.display = 'none';
  }
  received_message(_message: any): void { }
  logged_out(): void {
    // Show the button if the user is logged out
    this.element.style.display = 'inline-block';
  }
  disconnected(): void { }
  connection_error(_error: any): void { }

  override unmounting(): void {
    Connection.get_instance().remove_connection_listener(this);
  }
}

/**
 * Button to log in.
 */
export class LogInButton extends ButtonComponent<void> implements ConnectionListener {

  /**
   * Creates a new button element for triggering the display of a login modal dialog.
   * 
   * @param modal_id - The ID of the modal element to be shown when the button is clicked. Defaults to 'loginModal'.
   */
  constructor(modal_id: string = 'loginModal') {
    super();
    this.element.type = 'button';
    this.element.classList.add('btn', 'btn-primary');
    this.element.textContent = 'Log In';
    this.element.style.marginLeft = '10px';
    this.element.style.display = 'inline-block';
    this.element.addEventListener('click', () => Modal.getOrCreateInstance(document.getElementById(modal_id)!).show());

    Connection.get_instance().add_connection_listener(this);
  }

  connected(): void { }
  logged_in(_info: any): void {
    // Hide the button if the user is already logged in
    this.element.style.display = 'none';
  }
  received_message(_message: any): void { }
  logged_out(): void {
    // Show the button if the user is logged out
    this.element.style.display = 'inline-block';
  }
  disconnected(): void { }
  connection_error(_error: any): void { }

  override unmounting(): void {
    Connection.get_instance().remove_connection_listener(this);
  }
}

/**
 * Button to log out.
 */
export class LogOutButton extends ButtonComponent<void> implements ConnectionListener {

  /**
   * Creates a new button element for logging out the user.
   */
  constructor() {
    super();
    this.element.type = 'button';
    this.element.classList.add('btn', 'btn-primary');
    this.element.textContent = 'Log Out';
    this.element.addEventListener('click', () => Connection.get_instance().logout());
    this.element.style.marginLeft = 'auto';
    this.element.style.display = 'none';

    Connection.get_instance().add_connection_listener(this);
  }

  connected(): void { }
  logged_in(_info: any): void {
    // Show the button if the user is logged in
    this.element.style.display = 'inline-block';
  }
  received_message(_message: any): void { }
  logged_out(): void {
    // Hide the button if the user is logged out
    this.element.style.display = 'none';
  }
  disconnected(): void { }
  connection_error(_error: any): void { }

  override unmounting(): void {
    Connection.get_instance().remove_connection_listener(this);
  }
}

/**
 * Modal to log in.
 */
export class LogInModal extends Component<void, HTMLDivElement> {

  private username_input: string = '';
  private password_input: string = '';
  private remember_input: boolean = true;

  /**
   * Optional callback to run when the modal is hiding.
   */
  public on_hide: () => void;

  constructor() {
    super(undefined, document.createElement('div'));
    this.on_hide = () => { this.element.parentElement?.focus(); };
    this.element.classList.add('modal', 'fade');
    this.element.id = 'loginModal';
    this.element.setAttribute('tabindex', '-1');
    this.element.setAttribute('aria-labelledby', 'loginModalLabel');
    this.element.setAttribute('aria-hidden', 'true');
    this.element.addEventListener('hide.bs.modal', () => {
      if (this.on_hide)
        this.on_hide();
    });

    const dialog = document.createElement('div');
    dialog.classList.add('modal-dialog');

    const content = document.createElement('div');
    content.classList.add('modal-content');

    const header = document.createElement('div');
    header.classList.add('modal-header');

    const title = document.createElement('h5');
    title.classList.add('modal-title');
    title.id = 'loginModalLabel';
    title.textContent = 'Log In';
    header.appendChild(title);

    const close_button = document.createElement('button');
    close_button.type = 'button';
    close_button.classList.add('btn-close');
    close_button.setAttribute('data-bs-dismiss', 'modal');
    close_button.setAttribute('aria-label', 'Close');
    header.appendChild(close_button);

    content.appendChild(header);

    const body = document.createElement('div');
    body.classList.add('modal-body');

    const form = document.createElement('form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.login();
    });

    const username_group = document.createElement('div');
    username_group.classList.add('form-floating');
    username_group.style.marginBottom = '1rem';

    const username_input = document.createElement('input');
    username_input.type = 'email';
    username_input.autocomplete = 'email';
    username_input.classList.add('form-control');
    username_input.id = 'login_username';
    username_input.placeholder = 'Username';
    username_input.required = true;
    username_input.addEventListener('input', () => this.username_input = username_input.value);
    username_group.appendChild(username_input);

    const username_label = document.createElement('label');
    username_label.htmlFor = 'login_username';
    username_label.textContent = 'Username';
    username_group.appendChild(username_label);

    form.appendChild(username_group);

    const password_group = document.createElement('div');
    password_group.classList.add('form-floating');
    password_group.style.marginBottom = '1rem';

    const password_input = document.createElement('input');
    password_input.type = 'password';
    password_input.autocomplete = 'current-password';
    password_input.classList.add('form-control');
    password_input.id = 'login_password';
    password_input.placeholder = 'Password';
    password_input.required = true;
    password_input.addEventListener('input', () => this.password_input = password_input.value);
    password_group.appendChild(password_input);

    const password_label = document.createElement('label');
    password_label.htmlFor = 'login_password';
    password_label.textContent = 'Password';
    password_group.appendChild(password_label);
    form.appendChild(password_group);

    const remember_group = document.createElement('div');
    remember_group.classList.add('form-check');
    remember_group.style.marginBottom = '1rem';

    const remember_input = document.createElement('input');
    remember_input.type = 'checkbox';
    remember_input.classList.add('form-check-input');
    remember_input.id = 'remember';
    remember_input.checked = this.remember_input;
    remember_input.addEventListener('input', () => this.remember_input = remember_input.checked);
    remember_group.appendChild(remember_input);

    const remember_label = document.createElement('label');
    remember_label.classList.add('form-check-label');
    remember_label.htmlFor = 'remember';
    remember_label.textContent = 'Remember me';
    remember_group.appendChild(remember_label);
    form.appendChild(remember_group);

    body.appendChild(form);

    content.appendChild(body);

    const footer = document.createElement('div');
    footer.classList.add('modal-footer');

    const close = document.createElement('button');
    close.type = 'button';
    close.classList.add('btn', 'btn-secondary');
    close.setAttribute('data-bs-dismiss', 'modal');
    close.textContent = 'Close';
    footer.appendChild(close);

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.classList.add('btn', 'btn-primary');
    submit.textContent = 'Log In';
    submit.addEventListener('click', () => this.login());
    footer.appendChild(submit);

    content.appendChild(footer);

    dialog.appendChild(content);

    this.element.appendChild(dialog);
  }

  private login(): void {
    Connection.get_instance().login(this.username_input, this.password_input, this.remember_input)
      .then((result: boolean) => {
        if (result)
          Modal.getOrCreateInstance(this.element).hide();
      });
  }
}

/**
 * Modal to create a new user.
 */
export class NewUserModal extends Component<void, HTMLDivElement> {

  private username_input: string = '';
  private password_input: string = '';
  private confirm_password_input: string = '';

  /**
   * Optional callback to run when the modal is hiding.
   */
  public on_hide: () => void;

  constructor() {
    super(undefined, document.createElement('div'));
    this.on_hide = () => { this.element.parentElement?.focus(); };
    this.element.classList.add('modal', 'fade');
    this.element.id = 'newUserModal';
    this.element.setAttribute('tabindex', '-1');
    this.element.setAttribute('aria-labelledby', 'newUserModalLabel');
    this.element.setAttribute('aria-hidden', 'true');
    this.element.addEventListener('hide.bs.modal', () => {
      if (this.on_hide)
        this.on_hide();
    });

    const dialog = document.createElement('div');
    dialog.classList.add('modal-dialog');

    const content = document.createElement('div');
    content.classList.add('modal-content');

    const header = document.createElement('div');
    header.classList.add('modal-header');

    const title = document.createElement('h5');
    title.classList.add('modal-title');
    title.id = 'newUserModalLabel';
    title.textContent = 'Create New User';
    header.appendChild(title);

    const close_button = document.createElement('button');
    close_button.type = 'button';
    close_button.classList.add('btn-close');
    close_button.setAttribute('data-bs-dismiss', 'modal');
    close_button.setAttribute('aria-label', 'Close');
    header.appendChild(close_button);

    content.appendChild(header);

    const body = document.createElement('div');
    body.classList.add('modal-body');

    const form = document.createElement('form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.create_user();
    });

    const username_group = document.createElement('div');
    username_group.classList.add('form-floating');
    username_group.style.marginBottom = '1rem';

    const username_input = document.createElement('input');
    username_input.type = 'email';
    username_input.autocomplete = 'email';
    username_input.classList.add('form-control');
    username_input.id = 'newuser_username';
    username_input.placeholder = 'Username';
    username_input.required = true;
    username_input.addEventListener('input', () => this.username_input = username_input.value);
    username_group.appendChild(username_input);

    const username_label = document.createElement('label');
    username_label.htmlFor = 'newuser_username';
    username_label.textContent = 'Username';
    username_group.appendChild(username_label);

    form.appendChild(username_group);

    const password_group = document.createElement('div');
    password_group.classList.add('form-floating');
    password_group.style.marginBottom = '1rem';

    const password_input = document.createElement('input');
    password_input.type = 'password';
    password_input.autocomplete = 'current-password';
    password_input.classList.add('form-control');
    password_input.id = 'newuser_password';
    password_input.placeholder = 'Password';
    password_input.required = true;
    password_input.addEventListener('input', () => this.password_input = password_input.value);
    password_group.appendChild(password_input);

    const password_label = document.createElement('label');
    password_label.htmlFor = 'newuser_password';
    password_label.textContent = 'Password';
    password_group.appendChild(password_label);
    form.appendChild(password_group);

    const confirm_password_group = document.createElement('div');
    confirm_password_group.classList.add('form-floating');
    confirm_password_group.style.marginBottom = '1rem';

    const confirm_password_input = document.createElement('input');
    confirm_password_input.type = 'password';
    confirm_password_input.autocomplete = 'current-password';
    confirm_password_input.classList.add('form-control');
    confirm_password_input.id = 'confirm_password';
    confirm_password_input.placeholder = 'Confirm Password';
    confirm_password_input.required = true;
    confirm_password_input.addEventListener('input', () => this.confirm_password_input = confirm_password_input.value);
    confirm_password_group.appendChild(confirm_password_input);

    const confirm_password_label = document.createElement('label');
    confirm_password_label.htmlFor = 'confirm_password';
    confirm_password_label.textContent = 'Confirm Password';
    confirm_password_group.appendChild(confirm_password_label);
    form.appendChild(confirm_password_group);

    body.appendChild(form);

    content.appendChild(body);

    const footer = document.createElement('div');
    footer.classList.add('modal-footer');

    const close = document.createElement('button');
    close.type = 'button';
    close.classList.add('btn', 'btn-secondary');
    close.setAttribute('data-bs-dismiss', 'modal');
    close.textContent = 'Close';
    footer.appendChild(close);

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.classList.add('btn', 'btn-primary');
    submit.textContent = 'Create User';
    submit.addEventListener('click', () => this.create_user());
    footer.appendChild(submit);

    content.appendChild(footer);

    dialog.appendChild(content);

    this.element.appendChild(dialog);
  }

  private create_user(): void {
    if (this.password_input !== this.confirm_password_input) {
      App.get_instance().toast('Passwords do not match.');
      return;
    }
    Connection.get_instance().create_user(this.username_input, this.password_input)
      .then((result: boolean) => {
        if (result)
          Modal.getOrCreateInstance(this.element).hide();
      });
  }
}