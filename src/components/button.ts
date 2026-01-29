import { h, VNode, VNodeChildren } from 'snabbdom';

export function Button(label: VNodeChildren, onClick: () => void): VNode {
  return h('button.btn.btn-primary', {
    on: { click: onClick }
  }, label);
}