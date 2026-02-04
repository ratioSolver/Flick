import { h, VNode, VNodeChildren } from 'snabbdom';

export function Button(content: VNodeChildren, onClick: () => void): VNode {
  return h('button.btn.btn-primary', { on: { click: onClick } }, content);
}