import { h, VNode, VNodeChildren } from 'snabbdom';
import * as bootstrap from 'bootstrap';

export function Toast(id: string, role: 'alert' | 'status', body: VNodeChildren, header?: VNodeChildren, autohide: boolean = true, onClose?: () => void): VNode {
  return h('div.toast', {
    props: { id, role },
    attrs: {
      'aria-live': role === 'alert' ? 'assertive' : 'polite',
      'aria-atomic': 'true',
      'data-bs-autohide': autohide ? 'true' : 'false'
    },
    hook: {
      insert: (vnode) => {
        const el = vnode.elm as HTMLElement;
        const toast = new bootstrap.Toast(el, { autohide });
        el.addEventListener('hidden.bs.toast', () => { onClose && onClose(); });
        toast.show();
      }
    }
  }, [
    header ? h('div.toast-header', header) : null,
    h('div.toast-body', body)
  ]);
}

export function ToastContainer(toasts: VNodeChildren[]): VNode {
  return h('div.toast-container.position-fixed.bottom-0.end-0.p-3', toasts);
}