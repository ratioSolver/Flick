import { h, VNode } from 'snabbdom';

export function Button(label: string, onClick: () => void): VNode {
  return h('button.btn.btn-primary', {
    on: { click: onClick }
  }, label);
}