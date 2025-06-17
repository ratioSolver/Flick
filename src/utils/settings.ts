export class Settings {

  private secure: boolean = location.protocol === 'https:';
  private hostname: string = location.hostname;
  private port: number = Number(location.port);
  private ws_path: string = '/ws';
  private static instance: Settings;

  private constructor() { }

  public static get_instance(): Settings {
    if (!Settings.instance) {
      Settings.instance = new Settings();
    }
    return Settings.instance;
  }

  /**
   * Checks if the connection is secure.
   *
   * @returns {boolean} Returns true if the connection is secure, otherwise false.
   */
  public is_secure(): boolean { return this.secure; }

  /**
   * Returns the protocol based on the `secure` property.
   *
   * @returns `'https'` if the connection is secure, otherwise `'http'`.
   */
  public get_protocol(): string { return this.secure ? 'https' : 'http'; }
  /**
   * Retrieves the current hostname.
   *
   * @returns The hostname as a string.
   */
  public get_hostname(): string { return this.hostname; }
  /**
   * Retrieves the current port.
   *
   * @returns The port number as a number.
   */
  public get_port(): number { return this.port; }

  /**
   * Returns the appropriate WebSocket protocol based on the security setting.
   *
   * @returns {string} Returns 'wss' if the connection is secure, otherwise returns 'ws'.
   */
  public get_ws_protocol(): string { return this.secure ? 'wss' : 'ws'; }
  /**
   * Retrieves the current WebSocket path.
   *
   * @returns {string} The WebSocket path stored in the instance.
   */
  public get_ws_path(): string { return this.ws_path; }

  /**
   * Constructs and returns the full host URL as a string, including the protocol, hostname, and port.
   *
   * @returns {string} The complete host URL in the format: protocol://hostname:port
   */
  public get_host(): string { return this.get_protocol() + '://' + this.hostname + ':' + this.port; }
  /**
   * Constructs and returns the full WebSocket host URL as a string.
   *
   * The URL is composed of the WebSocket protocol (as determined by `get_ws_protocol()`),
   * the hostname, port, and WebSocket path.
   *
   * @returns {string} The complete WebSocket host URL (e.g., `ws://hostname:port/path`).
   */
  public get_ws_host(): string { return this.get_ws_protocol() + '://' + this.hostname + ':' + this.port + this.ws_path; }

  public load_settings(settings: any): void {
    this.secure = settings.secure || this.secure;
    this.hostname = settings.host || this.hostname;
    this.port = settings.port || this.port;
    this.ws_path = settings.ws_path || this.ws_path;
  }
}