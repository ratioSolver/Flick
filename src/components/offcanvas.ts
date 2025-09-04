import { Component } from "../component";
import { Selector, SelectorGroup } from "../utils/selector";

export class Offcanvas extends Component<HTMLDivElement> {

  constructor(id: string, group: SelectorGroup, top: Map<HTMLAnchorElement, Selector>, bottom?: Map<HTMLAnchorElement, Selector>) {
    super(document.createElement('div'));

    this.node.classList.add('offcanvas', 'offcanvas-start', 'd-flex');
    this.node.tabIndex = -1;
    this.node.id = id;

    const body = document.createElement('div');
    body.classList.add('offcanvas-body', 'flex-column', 'flex-shrink-0', 'p-3', 'bg-light');

    const ul = document.createElement('ul');
    ul.classList.add('nav', 'nav-pills', 'flex-column', 'mb-auto');

    for (const [a, sel] of top) {
      const li = document.createElement('li');
      li.classList.add('nav-item');

      a.classList.add('nav-link');
      group.add_selector(sel);

      li.appendChild(a);
      ul.appendChild(li);
    }

    body.appendChild(ul);

    if (bottom) {
      const hr = document.createElement('hr');
      body.appendChild(hr);

      const footer_ul = document.createElement('ul');
      footer_ul.classList.add('nav', 'nav-pills', 'flex-column', 'mb-0');

      for (const [a, sel] of bottom) {
        const li = document.createElement('li');
        li.classList.add('nav-item');

        a.classList.add('nav-link');
        group.add_selector(sel);

        li.appendChild(a);
        footer_ul.appendChild(li);
      }

      body.appendChild(footer_ul);
    }

    this.node.append(body);
  }
}