import { Settings } from "./settings";

/**
 * Singleton class that manages the connection to the server.
 */
export class Connection {

  private static instance: Connection;
  private socket: WebSocket | null = null;
  private connection_listeners: Set<ConnectionListener> = new Set();
  private token: string | null = null;

  private constructor() {
    console.debug('localStorage available: ', typeof localStorage !== 'undefined');
    console.debug('localStorage token: ', localStorage.getItem('token'));
  }

  static get_instance() {
    if (!Connection.instance)
      Connection.instance = new Connection();
    return Connection.instance;
  }

  /**
   * Connects to the server.
   * 
   * @param token Optional token to use for the connection.
   * @param remember_token Whether to remember the token.
   * @param timeout Timeout in milliseconds to wait before reconnecting.
   */
  connect(token: string | null = null, remember_token: boolean = false, timeout = 5000) {
    if (this.socket)
      this.socket.close();

    console.info('Connecting to server: ', Settings.get_instance().get_ws_host());
    this.socket = new WebSocket(Settings.get_instance().get_ws_host());

    this.socket.onopen = () => {
      console.info('Connected to server');
      for (const listener of this.connection_listeners) { listener.connected(); }
      if (token)
        this.socket!.send(JSON.stringify({ msg_type: 'login', token }));
    };

    this.socket.onmessage = (event) => {
      console.trace('Received message from server: ', event.data);
      const message = JSON.parse(event.data);
      if (message.msg_type === 'login') {
        this.token = token!;
        if (remember_token)
          localStorage.setItem('token', token!);
        for (const listener of this.connection_listeners) { listener.logged_in(message.personal_data); }
      }
      else
        for (const listener of this.connection_listeners) { listener.received_message(message); }
    };

    this.socket.onclose = () => {
      console.info('Disconnected from server');
      for (const listener of this.connection_listeners) { listener.disconnected(); }
    };

    this.socket.onerror = (ev: Event) => {
      console.error('Connection error: ', ev);
      for (const listener of this.connection_listeners) { listener.connection_error(ev); }
      setTimeout(() => this.connect(token, remember_token, timeout), timeout);
    };
  }

  /**
   * Logs in a user.
   * 
   * @param username Username.
   * @param password Password.
   * @param remember_token Whether to remember the token.
   * @returns Whether the login was successful.
   */
  async login(username: string, password: string, remember_token: boolean = false): Promise<boolean> {
    console.debug('Logging in user: ', username);
    const response = await fetch(Settings.get_instance().get_host() + '/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ username: username, password: password }) });
    if (response.ok) { // Login successful
      const data = await response.json();
      this.connect(data.token, remember_token);
      return true;
    } else { // Login failed
      console.error('Login failed: ', response.statusText);
      for (const listener of this.connection_listeners) listener.connection_error(new Event(response.statusText));
      return false;
    }
  }

  /**
   * Creates a new user.
   *
   * @param username Username for the new user.
   * @param password Password for the new user.
   * @param personal_data Additional user data to store.
   * @param remember_token Whether to remember the token.
   * @param token Optional token to use for the request.
   * @returns Whether the user creation was successful.
   */
  async create_user(username: string, password: string, personal_data: Record<string, any> = {}, remember_token: boolean = true): Promise<boolean> {
    console.debug('Creating new user: ', username);
    const headers: { 'content-type': string, 'authorization'?: string } = { 'content-type': 'application/json' };
    if (this.token)
      headers['authorization'] = `Bearer ${this.token}`;
    const body: any = { username, password };
    if (Object.keys(personal_data).length > 0)
      body.user_data = personal_data;
    const response = await fetch(Settings.get_instance().get_host() + '/users', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    });
    if (response.ok) { // User creation successful
      const data = await response.json();
      this.connect(data.token, remember_token);
      return true;
    } else { // User creation failed
      console.error('User creation failed: ', response.statusText);
      for (const listener of this.connection_listeners) listener.connection_error(new Event(response.statusText));
      return false;
    }
  }

  /**
   * Logs out the user.
   */
  logout(): void {
    console.debug('Logging out user');
    this.socket!.send(JSON.stringify({ msg_type: 'logout' }));
    this.token = null;
    localStorage.removeItem('token');
    for (const listener of this.connection_listeners) { listener.logged_out(); }
    this.socket!.close();
  }

  /**
   * Checks whether the WebSocket connection is currently open.
   *
   * @returns {boolean} `true` if the socket exists and its ready state is `WebSocket.OPEN`, otherwise `false`.
   */
  is_connected(): boolean { return this.socket !== null && this.socket.readyState === WebSocket.OPEN; }

  /**
   * Returns the current token.
   *
   * @returns {string | null} The current token, or `null` if not set.
   */
  get_token(): string | null { return this.token; }

  /**
   * Adds a connection listener.
   * 
   * @param listener Connection listener to add.
   */
  add_connection_listener(listener: ConnectionListener): void { this.connection_listeners.add(listener); }

  /**
   * Removes a connection listener.
   * 
   * @param listener Connection listener to remove.
   */
  remove_connection_listener(listener: ConnectionListener): void { this.connection_listeners.delete(listener); }
}

/**
 * Interface that defines the methods that a connection listener must implement.
 */
export interface ConnectionListener {

  /**
   * Called when the connection to the server is established.
   */
  connected(): void;

  /**
   * Called when the user is logged in.
   *
   * @param info Information about the logged-in user.
   */
  logged_in(info: any): void;

  /**
   * Called when a message is received from the server.
   *
   * @param message Message received from the server.
   */
  received_message(message: any): void;

  /**
   * Called when the user is logged out.
   */
  logged_out(): void;

  /**
   * Called when the connection to the server is closed.
   */
  disconnected(): void;

  /**
   * Called when an error occurs in the connection to the server.
   *
   * @param error Error that occurred.
   */
  connection_error(error: any): void;
}