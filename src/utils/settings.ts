export class Settings {

  private secure: boolean = location.protocol === 'https:';
  private host: string = location.host;
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

  public is_secure(): boolean { return this.secure; }
  public get_host(): string { return this.host; }
  public get_port(): number { return this.port; }
  public get_ws_path(): string { return this.ws_path; }

  public get_protocol(): string { return this.secure ? 'https' : 'http'; }
  public get_ws_protocol(): string { return this.secure ? 'wss' : 'ws'; }

  public get_hostname(): string { return this.get_protocol() + '://' + this.host + ':' + this.port; }
  public get_ws_hostname(): string { return this.get_ws_protocol() + '://' + this.host + ':' + this.port + this.ws_path; }

  public load_settings(settings: any): void {
    this.secure = settings.secure || this.secure;
    this.host = settings.host || this.host;
    this.port = settings.port || this.port;
    this.ws_path = settings.ws_path || this.ws_path;
  }
}