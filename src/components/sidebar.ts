import { Component } from "../component";
import { Selector, SelectorGroup } from "../utils/selector";

export class Sidebar extends Component<HTMLDivElement> {

  constructor(group: SelectorGroup, top: Map<HTMLAnchorElement, Selector>, bottom?: Map<HTMLAnchorElement, Selector>) {
    super(document.createElement('div'));

    this.node.classList.add('d-flex', 'flex-column', 'flex-shrink-0', 'p-3', 'bg-light');
    this.node.style.width = '280px';
    this.node.style.height = 'calc(100vh - 60px)';

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

    this.node.appendChild(ul);

    if (bottom) {
      const hr = document.createElement('hr');
      this.node.appendChild(hr);

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

      this.node.appendChild(footer_ul);
    }
  }
}