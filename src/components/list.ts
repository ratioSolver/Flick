import { Component, Fragment, PayloadComponent } from "../component";
import { Selector, SelectorGroup } from "../utils/selector";

export abstract class ListComponent<L extends HTMLElement, P> extends Component<L> {

  children: PayloadComponent<Node, P>[] = []; // The children of the list component sorted by the comparison function
  compareFn: (a: P, b: P) => number; // The comparison function

  constructor(node: L, children: PayloadComponent<Node, P>[], compareFn: (a: P, b: P) => number = ((_a: P, _b: P) => 0)) {
    super(node);
    this.children = children;
    this.compareFn = compareFn;
    this.children.sort((a, b) => this.compareFn(a.payload, b.payload));
    const fragment = new Fragment();
    for (const child of this.children)
      fragment.add_child(child);
    fragment.attach_to(this);
  }

  override add_child(child: PayloadComponent<Node, P>): void {
    this.children.push(child);
    this.children.sort((a, b) => this.compareFn(a.payload, b.payload));
    const index = this.children.indexOf(child);
    if (index === this.children.length - 1)
      super.add_child(child);
    else
      super.add_child_before(child, this.children[index + 1].node);
  }

  override remove_child(child: PayloadComponent<Node, P>): void {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
      super.remove_child(child);
    } else
      throw new Error('Child not found');
  }
}

export class UListComponent<P> extends ListComponent<HTMLUListElement, P> {

  constructor(payload: PayloadComponent<HTMLLIElement, P>[], compareFn?: (a: P, b: P) => number) {
    super(document.createElement('ul'), payload, compareFn);
  }
}

export class OListComponent<P> extends ListComponent<HTMLOListElement, P> {

  constructor(payload: PayloadComponent<HTMLLIElement, P>[], compareFn?: (a: P, b: P) => number) {
    super(document.createElement('ol'), payload, compareFn);
  }
}

export class DivListComponent<P> extends ListComponent<HTMLDivElement, P> {

  constructor(payload: PayloadComponent<HTMLDivElement, P>[], compareFn?: (a: P, b: P) => number) {
    super(document.createElement('div'), payload, compareFn);
  }
}

export class ListItemComponent<P> extends PayloadComponent<HTMLLIElement, P> implements Selector {

  private readonly group: SelectorGroup;
  private readonly a: HTMLAnchorElement;
  private icn: Element;
  private text: Text;

  /**
   * Creates an instance of UListElement.
   * 
   * @param group The selector group this element belongs to.
   * @param payload The payload associated with this element.
   * @param icn The icon element to be displayed in the list item.
   * @param text The text content of the list item.
   */
  constructor(group: SelectorGroup, payload: P, icn: Element, text: string) {
    super(document.createElement('li'), payload);
    this.group = group;
    this.node.classList.add('nav-item', 'list-group-item');

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

    this.node.append(this.a);
    this.group.add_selector(this);
  }

  set_icon(icn: Element): void {
    this.icn.replaceWith(icn);
    this.icn = icn;
    this.icn.classList.add('me-2');
  }

  set_text(text: string): void { this.text.textContent = text; }

  override unmounting(): void { this.group.remove_selector(this); }

  select(): void { this.a.classList.add('active'); }
  unselect(): void { this.a.classList.remove('active'); }
}

export class CheckboxListItemComponent<P> extends PayloadComponent<HTMLLIElement, P> implements Selector {

  private readonly input: HTMLInputElement;
  private readonly label: HTMLLabelElement;
  private icn: Element;
  private text: Text;

  /**
   * Creates an instance of CheckboxListItemComponent.
   * 
   * @param payload The payload associated with this element.
   * @param id The unique identifier for the checkbox input element.
   * @param icn The icon element to be displayed in the list item.
   * @param text The text content of the list item.
   */
  constructor(payload: P, id: string, icn: Element, text: string) {
    super(document.createElement('li'), payload);
    this.node.classList.add('list-group-item', 'd-flex', 'align-items-center');

    this.input = document.createElement('input');
    this.input.type = 'checkbox';
    this.input.id = id;
    this.input.classList.add('form-check-input', 'me-2');
    this.input.addEventListener('change', () => {
      if (this.input.checked)
        this.select();
      else
        this.unselect();
    });
    this.node.append(this.input);

    this.label = document.createElement('label');
    this.label.classList.add('form-check-label', 'd-flex', 'align-items-center', 'flex-grow-1', 'mb-0');
    this.label.htmlFor = id;
    this.icn = icn;
    this.icn.classList.add('me-2');
    this.label.append(this.icn);
    this.text = document.createTextNode(text);
    this.label.append(this.text);
    this.node.append(this.label);
  }

  set_icon(icn: Element): void {
    this.icn.replaceWith(icn);
    this.icn = icn;
    this.icn.classList.add('me-2');
  }

  set_text(text: string): void { this.text.textContent = text; }

  select(): void { }
  unselect(): void { }
}