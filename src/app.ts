import { Component } from "./component";

/**
 * The `App` class implements the singleton pattern and manages the state and behavior of the application.
 * It allows for the selection of components and notifies registered listeners of various events.
 * 
 * @implements {AppListener}
 */
export class App implements AppListener {

  private static instance: App;
  private selected_comp: Component<Node> | null = null;
  private app_listeners: Set<AppListener> = new Set();

  private constructor() { }

  static get_instance() {
    if (!App.instance)
      App.instance = new App();
    return App.instance;
  }

  /**
   * Display a toast message.
   * 
   * @param {string} info The information to display.
   */
  toast(info: string): void { for (const listener of this.app_listeners) { listener.toast(info); } }

  /**
   * Get the selected component.
   * 
   * @returns {Component<Node> | null} The selected component.
   */
  get_selected_component(): Component<Node> | null { return this.selected_comp; }

  /**
   * Set the selected component.
   * 
   * @param {Component<Node> | null} component The component to select.
   */
  selected_component(component: Component<Node> | null): void {
    if (this.selected_comp)
      this.selected_comp.remove();
    this.selected_comp = component;
    for (const listener of this.app_listeners) { listener.selected_component(component); }
  }

  /**
   * Add an application listener.
   * 
   * @param {AppListener} listener The listener to add.
   */
  add_app_listener(listener: AppListener): void {
    this.app_listeners.add(listener);
  }

  /**
   * Remove an application listener.
   * 
   * @param {AppListener} listener The listener to remove.
   */
  remove_app_listener(listener: AppListener): void {
    this.app_listeners.delete(listener);
  }
}

/**
 * The `AppListener` interface defines the methods that an object must implement to listen to application events.
 */
export interface AppListener {

  /**
   * Request to display a toast message.
   *
   * @param {string} info The information to display.
   */
  toast(info: string): void;

  /**
   * Notification that a component has been selected.
   * 
   * @param {Component<Node> | null} component The selected component.
   */
  selected_component(component: Component<Node> | null): void;
}