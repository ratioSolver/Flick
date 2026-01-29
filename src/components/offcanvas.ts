import { h, VNode, VNodeChildren } from 'snabbdom';

export function OffcanvasHeader(title: string, id: string = 'offcanvasNavbar'): VNode {
  return h('div.offcanvas-header', [
    h('h5.offcanvas-title', { props: { id: `${id}Label` } }, title),
    h('button.btn-close', {
      attrs: {
        'data-bs-dismiss': 'offcanvas',
        'aria-label': 'Close'
      }
    })
  ]);
}

export function OffcanvasBody(content: VNodeChildren): VNode {
  return h('div.offcanvas-body', content);
}

export function Offcanvas(body: VNode, header: VNode = h('!'), id: string = 'offcanvasNavbar'): VNode {
  return h(`div#${id}.offcanvas.offcanvas-start`, {
    props: {
      tabindex: -1
    },
    attrs: {
      'aria-labelledby': `${id}Label`
    }
  }, [header, body]);
}