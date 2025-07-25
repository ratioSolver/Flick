/**
 * The `App` class implements the singleton pattern and manages the state and behavior of the application.
 * It allows for the selection of components and notifies registered listeners of various events.
 * 
 * @implements {AppListener}
 */
export class App implements AppListener {

  private static instance: App;
  private selected_comp: Component<any, HTMLElement> | null = null;
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
   * @returns {Component<any, HTMLElement> | null} The selected component.
   */
  get_selected_component(): Component<any, HTMLElement> | null { return this.selected_comp; }

  /**
   * Set the selected component.
   * 
   * @param {Component<any, HTMLElement> | null} component The component to select.
   */
  selected_component(component: Component<any, HTMLElement> | null): void {
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
   * @param {Component<any, HTMLElement> | null} component The selected component.
   */
  selected_component(component: Component<any, HTMLElement> | null): void;
}

/**
 * The `Component` class represents a component in the application.
 * It manages the payload and element of the component and its children.
 * 
 * @template P The type of the payload.
 * @template E The type of the element.
 */
export abstract class Component<P, E extends HTMLElement> {

  payload: P; // The payload of the component
  element: E; // The element of the component
  protected child_nodes: Set<Component<any, HTMLElement>> = new Set(); // The children of the component

  constructor(payload: P, element: E) {
    this.payload = payload;
    this.element = element;
  }

  /**
   * Add a child component.
   * 
   * @param {Component<any, HTMLElement>} child The child component to add.
   */
  add_child(child: Component<any, HTMLElement>): void {
    this.child_nodes.add(child);
    this.element.appendChild(child.element);
    child.mounted();
  }

  /**
   * Remove a child component.
   * 
   * @param {Component<any, HTMLElement>} child The child component to remove.
   * @throws {Error} If the child is not found.
   */
  remove_child(child: Component<any, HTMLElement>): void {
    if (this.child_nodes.has(child)) {
      this.child_nodes.delete(child);
      child.remove();
    } else
      throw new Error('Child not found');
  }

  /**
   * Remove the component.
   */
  remove(): void {
    for (const child of this.child_nodes)
      child.unmounting();
    this.unmounting();
    this.element.remove();
  }

  /**
   * Notify that the component has been mounted.
   * Override this method to perform actions when the component is mounted.
   */
  mounted(): void { }

  /**
   * Notify that the component is being unmounted.
   * Override this method to perform actions when the component is being unmounted.
   */
  unmounting(): void { }
}