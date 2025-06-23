import { Component } from "../app";

/**
 * The `ListComponent` class represents a list component in the application.
 * It manages the payload and element of the list component and its children.
 * 
 * @template P The type of the payload.
 * @template E The type of the element.
 * @template L The type of the list element.
 */
export abstract class ListComponent<P, E extends HTMLElement, L extends HTMLElement> extends Component<Component<P, E>[], L> {

  compareFn: (a: P, b: P) => number; // The comparison function
  children: Component<P, E>[] = []; // The children of the list component sorted by the comparison function

  constructor(payload: Component<P, E>[], element: L, compareFn?: (a: P, b: P) => number) {
    super(payload, element)
    this.compareFn = compareFn || ((_a: P, _b: P) => 0);
    this.children = payload;
    this.children.sort((a, b) => this.compareFn(a.payload, b.payload));
    const fragment = document.createDocumentFragment();
    for (const child of this.children)
      fragment.appendChild(child.element);
    this.element.appendChild(fragment);
  }

  override add_child(child: Component<P, E>): void {
    super.add_child(child);
    this.children.push(child);
    this.children.sort((a, b) => this.compareFn(a.payload, b.payload));
    const index = this.children.indexOf(child);
    if (index === this.children.length - 1)
      this.element.appendChild(child.element);
    else
      this.element.insertBefore(child.element, this.children[index + 1].element);
  }

  override remove_child(child: Component<P, E>): void {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
      super.remove_child(child);
    } else
      throw new Error('Child not found');
  }
}

/**
 * The `UListComponent` class represents an unordered list component in the application.
 * It manages the payload and element of the unordered list component and its children.
 *
 * @template P The type of the payload.
 */
export class UListComponent<P> extends ListComponent<P, HTMLLIElement, HTMLUListElement> {

  constructor(payload: Component<P, HTMLLIElement>[], compareFn?: (a: P, b: P) => number) {
    super(payload, document.createElement('ul'), compareFn);
  }
}

/**
 * The `DivList` class represents a list component in the application that uses `div` elements.
 * It manages the payload and element of the list component and its children.
 *
 * @template P The type of the payload.
 */
export class DivList<P> extends ListComponent<P, HTMLDivElement, HTMLDivElement> {

  constructor(payload: Component<P, HTMLDivElement>[], compareFn?: (a: P, b: P) => number) {
    super(payload, document.createElement('div'), compareFn);
  }
}
