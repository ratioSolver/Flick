import { h, VNode } from "snabbdom";

export function Brand(name: string): VNode {
  return h('a.navbar-brand', { props: { href: '#' } }, name);
}

export function IconBrand(icon: string, width: number = 30, height: number = 30, name?: string): VNode {
  return h('a.navbar-brand', { props: { href: '#' } }, [
    h('img', {
      props: {
        src: icon,
        width: width,
        height: height,
        alt: name || 'Brand Icon'
      }
    }),
    name ? ` ${name}` : ''
  ]);
}

function Navbar(brand: VNode, content: VNode): VNode {
  return h('nav.navbar.navbar-expand-lg.bg-body-tertiary', [
    h('div.container-fluid', [
      brand,
      h('button.navbar-toggler', {
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
      h('div#navbarSupportedContent.collapse.navbar-collapse', [content])
    ])
  ]);
}

export function App(brand: VNode = Brand('Flick'), content: VNode = h('!')): VNode {
  return h('div', [
    Navbar(brand, content),
  ]);
}