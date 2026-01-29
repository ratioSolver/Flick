import { h, VNode } from 'snabbdom';

export function OffcanvasHeader(id: string, title: string): VNode {
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

export function OffcanvasBody(content: VNode): VNode {
  return h('div.offcanvas-body', [content]);
}

export function Offcanvas(id: string, header: VNode, body: VNode): VNode {
  return h(`div#${id}.offcanvas.offcanvas-start`, {
    props: {
      tabindex: -1
    },
    attrs: {
      'aria-labelledby': `${id}Label`
    }
  }, [header, body]);
}