import { Offcanvas } from 'bootstrap';
import { h, VNode, VNodeChildren } from 'snabbdom';

export function Brand(content: VNodeChildren, onClick?: () => void): VNode {
  return h('a.navbar-brand',
    {
      style: { cursor: onClick ? 'pointer' : 'default' },
      on: { click: onClick || (() => { }) }
    }, content);
}

export function OffcanvasBrand(content: VNodeChildren, id: string = 'offcanvasNavbar'): VNode {
  return h('a.navbar-brand', {
    style: { cursor: 'pointer' },
    attrs: { 'aria-controls': id },
    on: {
      click: () => {
        const el = document.getElementById(id);
        if (el)
          Offcanvas.getOrCreateInstance(el).show();
      }
    }
  }, content);
}

export function IconBrand(icon: string, width: number = 30, height: number = 30, name?: string, onClick?: () => void): VNode {
  return h('a.navbar-brand', [
    h('img', {
      style: { cursor: onClick ? 'pointer' : 'default' },
      props: {
        src: icon,
        width: width,
        height: height,
        alt: name || 'Brand Icon'
      },
      on: { click: onClick || (() => { }) }
    }),
    name ? ` ${name}` : ''
  ]);
}

export function NavbarItem(text: string, onClick?: () => void, active: boolean = false): VNode {
  return h('li.nav-item',
    { style: { cursor: 'pointer' } }, [
    h('a.nav-link', {
      class: { active },
      on: { click: onClick || (() => { }) }
    }, text)
  ]);
}

export function NavbarList(items: VNodeChildren[]): VNode {
  return h('ul.navbar-nav.me-auto.mb-2.mb-lg-0', items);
}

export function Navbar(brand: VNodeChildren = Brand('Flick'), navbar_content?: VNodeChildren, id = 'navbarSupportedContent'): VNode {
  return h('nav.navbar.navbar-expand-lg.bg-body-tertiary', [
    h('div.container-fluid', [
      brand,
      h('button.navbar-toggler', {
        props: {
          type: 'button'
        },
        attrs: {
          'data-bs-toggle': 'collapse',
          'data-bs-target': `#${id}`,
          'aria-controls': id,
          'aria-expanded': 'false',
          'aria-label': 'Toggle navigation'
        }
      }, [
        h('span.navbar-toggler-icon')
      ]),
      h(`div#${id}.collapse.navbar-collapse`, navbar_content)
    ])
  ]);
}

export function App(navbar: VNodeChildren = Navbar(), content?: VNodeChildren): VNode {
  return h('div.min-vh-100.d-flex.flex-column', [
    navbar,
    content
  ]);
}