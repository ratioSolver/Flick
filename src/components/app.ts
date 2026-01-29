import { h, VNode } from "snabbdom";
import { Component } from "../flick";

export function Brand(name: string): VNode {
  return h('span', name);
}

function Navbar(brand: Component, content: Component): VNode {
  return h('nav.navbar.navbar-expand-lg.navbar-light.bg-light', [
    h('a.navbar-brand.ps-4', { props: { href: '#' } }, [brand()]),
    h('button.navbar-toggler.me-3', {
      props: {
        type: 'button',
        'data-bs-toggle': 'collapse',
        'data-bs-target': '#navbarSupportedContent',
        'aria-controls': 'navbarSupportedContent',
        'aria-expanded': 'false',
        'aria-label': 'Toggle navigation'
      }
    }, [
      h('span.navbar-toggler-icon')
    ]),
    h('div#navbarSupportedContent.collapse.navbar-collapse', [
      content()
    ])
  ]);
}

export function App(brand: Component = () => Brand('Flick'), content: Component = () => h('div')): VNode {
  return h('div', [
    Navbar(brand, content),
  ]);
}