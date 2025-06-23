import { App, Component } from "../app";
import { Selector, SelectorGroup } from "../utils/selector";

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
 * The `UListElement` class represents an element in an unordered list component.
 * It manages the payload, icon, and text of the list item.
 *
 * @template P The type of the payload.
 */
export class UListElement<P> extends Component<P, HTMLLIElement> implements Selector {

  private readonly group: SelectorGroup;
  private readonly a: HTMLAnchorElement;
  private icn: Element;
  private text: Text;
  private readonly selected_factory: () => Component<P, HTMLElement>;

  /**
   * Creates an instance of UListElement.
   * 
   * @param group The selector group this element belongs to.
   * @param payload The payload associated with this element.
   * @param icn The icon element to be displayed in the list item.
   * @param text The text content of the list item.
   * @param selected_factory A factory function that returns the selected component when this element is selected.
   */
  constructor(group: SelectorGroup, payload: P, icn: Element, text: string, selected_factory: () => Component<P, HTMLElement>) {
    super(payload, document.createElement('li'));
    this.group = group;
    this.selected_factory = selected_factory;
    this.element.classList.add('nav-item', 'list-group-item');

    this.a = document.createElement('a');
    this.a.classList.add('nav-link', 'd-flex', 'align-items-center');
    this.a.href = '#';
    this.icn = icn;
    this.icn.classList.add('me-2');
    this.a.append(this.icn);
    this.text = document.createTextNode(text);
    this.a.append(this.text);
    this.a.addEventListener('click', (event) => {
      event.preventDefault();
      this.group.set_selected(this);
    });

    this.element.append(this.a);
    this.group.add_selector(this);
  }

  set_icon(icn: Element): void {
    this.icn.replaceWith(icn);
    this.icn = icn;
    this.icn.classList.add('me-2');
  }

  set_text(text: string): void { this.text.textContent = text; }

  override unmounting(): void { this.group.remove_selector(this); }

  select(): void {
    this.a.classList.add('active');
    App.get_instance().selected_component(this.selected_factory());
  }
  unselect(): void { this.a.classList.remove('active'); }
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
