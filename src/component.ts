/**
 * Abstract base class representing a UI component backed by a DOM Node.
 * 
 * @typeParam N - The type of DOM Node associated with this component.
 * 
 * @remarks
 * - Manages mounting state and child components.
 * - Handles DOM node insertion and removal.
 * - Provides lifecycle hooks for mounting and unmounting.
 * 
 * @example
 * ```typescript
 * class MyComponent extends Component<HTMLElement> {
 *   mounted() {
 *     // Called when the component is mounted
 *   }
 *   unmounting() {
 *     // Called before the component is unmounted
 *   }
 * }
 * ```
 * 
 * @property node - The DOM node associated with this component.
 * @property is_mounted - Indicates whether the component is currently mounted.
 * @property child_nodes - The set of child components.
 * 
 * @method add_child - Adds a child component and appends its node.
 * @method remove_child - Removes a child component and its node.
 * @method remove - Unmounts and removes this component's node from the DOM.
 * @method mount - Mounts this component to a parent component.
 * @method mounted - Lifecycle hook called after mounting.
 * @method unmounting - Lifecycle hook called before unmounting.
 */
export abstract class Component<N extends Node> {

  readonly node: N; // The element of the component
  private is_mounted: boolean; // Whether the component is mounted
  private readonly child_nodes: Set<Component<Node>> = new Set(); // The children of the component

  constructor(node: N) {
    this.node = node;
    this.is_mounted = node.isConnected;
  }

  /**
   * Adds a child component to this component.
   * 
   * This method appends the child's node to this component's node and adds the child to the internal set of child nodes.
   * If this component is already mounted, the child will also be marked as mounted.
   *
   * @param child - The child component to add.
   */
  add_child(child: Component<Node>): void {
    this.child_nodes.add(child);
    this.node.appendChild(child.node);
    if (this.is_mounted)
      child.set_mounted();
  }

  /**
   * Adds a child component before a specified node within this component.
   *
   * This method inserts the child's node before the specified node in this component's node
   * and adds the child to the internal set of child nodes.
   * If this component is already mounted, the child will also be marked as mounted.
   *
   * @param child - The child component to add.
   * @param node - The node before which the child's node will be inserted.
   */
  add_child_before(child: Component<Node>, node: Node): void {
    this.child_nodes.add(child);
    this.node.insertBefore(child.node, node);
    if (this.is_mounted)
      child.set_mounted();
  }

  /**
   * Removes a child component from the current component.
   *
   * Attempts to delete the specified child from the `child_nodes` collection.
   * If successful, it also calls the child's `remove()` method.
   * Throws an error if the child is not found in the collection.
   *
   * @param child - The child component to remove.
   * @throws {Error} If the child is not found in the `child_nodes` collection.
   */
  remove_child(child: Component<Node>): void {
    if (this.child_nodes.delete(child))
      child.remove();
    else
      throw new Error('Child not found');
  }

  /**
   * Removes the component from the DOM and marks it as unmounted.
   *
   * This method first sets the component's state to unmounted by calling `set_unmounted()`.
   * If the associated node is an instance of `HTMLElement`, it removes the node from the DOM.
   */
  remove(): void {
    this.set_unmounted();
    if (this.node instanceof HTMLElement)
      this.node.remove();
  }

  private set_mounted(): void {
    this.is_mounted = true;
    for (const child of this.child_nodes)
      child.set_mounted();
    this.mounted();
  }

  private set_unmounted(): void {
    this.unmounting();
    for (const child of this.child_nodes)
      child.set_unmounted();
    this.is_mounted = false;
  }

  /**
   * Attaches this component to a parent component.
   * 
   * This method performs the following steps:
   * 1. Adds all child nodes of this component to the parent's child node set.
   * 2. Appends this component's DOM node to the parent's DOM node.
   * 3. Marks all child nodes of this component as mounted.
   * 
   * @param parent - The parent component to attach this component to.
   */
  attach_to(parent: Component<Node>): void {
    for (const child of this.child_nodes)
      parent.child_nodes.add(child);
    parent.node.appendChild(this.node);
    for (const child of this.child_nodes)
      child.set_mounted();
  }

  /**
   * Lifecycle hook called after the component has been mounted to the DOM.
   * Override this method to perform initialization tasks such as fetching data or setting up event listeners.
   */
  mounted(): void { }
  /**
   * Called when the component is about to be unmounted from the DOM.
   * Override this method to perform cleanup tasks such as removing event listeners,
   * cancelling network requests, or releasing resources.
   */
  unmounting(): void { }
}

/**
 * An abstract component class that associates a payload of type `P` with a DOM node of type `N`.
 * 
 * @typeParam P - The type of the payload data associated with the component.
 * @typeParam N - The type of the DOM node, extending `Node`, that this component wraps.
 * @extends Component<N>
 * 
 * @property payload - The payload data associated with this component.
 * 
 * @param node - The DOM node to associate with this component.
 * @param payload - The payload data to associate with this component.
 */
export abstract class PayloadComponent<N extends Node, P> extends Component<N> {

  readonly payload: P; // The payload of the component

  constructor(node: N, payload: P) {
    super(node);
    this.payload = payload;
  }
}

export class Fragment extends Component<DocumentFragment> {

  constructor() {
    super(document.createDocumentFragment());
  }
}