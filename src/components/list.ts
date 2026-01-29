import { h, VNode, VNodeChildren } from 'snabbdom';

export function ListGroupItem(content: VNodeChildren, onClick?: () => void, active: boolean = false, disabled: boolean = false): VNode {
  return h('button.list-group-item.list-group-item-action' + (active ? '.active.rounded' : ''), {
    props: {
      type: 'button',
      disabled: disabled
    },
    attrs: {
      'aria-current': active ? 'true' : 'false'
    },
    on: { click: onClick || (() => { }) }
  }, content);
}

export function ListGroup(items: VNodeChildren[]): VNode {
  return h('div.list-group.list-group-flush', items);
}