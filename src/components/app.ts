import { h, VNode } from "snabbdom";

export function Brand(name: string, href: string = '#'): VNode {
  return h('a.navbar-brand', { props: { href } }, name);
}

export function IconBrand(icon: string, width: number = 30, height: number = 30, name?: string, href: string = '#'): VNode {
  return h('a.navbar-brand', { props: { href } }, [
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

export function NavbarItem(text: string, href: string = '#', active: boolean = false): VNode {
  return h('li.nav-item', [
    h('a.nav-link', {
      class: { active },
      props: { href }
    }, text)
  ]);
}

export function NavbarList(items: VNode[]): VNode {
  return h('ul.navbar-nav.me-auto.mb-2.mb-lg-0', items);
}

function Navbar(brand: VNode, navbar_content: VNode, id = 'navbarSupportedContent'): VNode {
  return h('nav.navbar.navbar-expand-lg.bg-body-tertiary', [
    h('div.container-fluid', [
      brand,
      h('button.navbar-toggler', {
        props: {
          type: 'button',
          'data-bs-toggle': 'collapse',
          'data-bs-target': `#${id}`,
          'aria-controls': id,
          'aria-expanded': 'false',
          'aria-label': 'Toggle navigation'
        }
      }, [
        h('span.navbar-toggler-icon')
      ]),
      h(`div#${id}.collapse.navbar-collapse`, [navbar_content])
    ])
  ]);
}

export function App(brand: VNode = Brand('Flick'), navbar_content: VNode = h('!')): VNode {
  return h('div', [
    Navbar(brand, navbar_content),
  ]);
}