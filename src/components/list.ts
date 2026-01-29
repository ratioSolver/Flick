import { h, VNode } from 'snabbdom';

export function ListGroupItem(text: string, onClick?: () => void, active: boolean = false, disabled: boolean = false): VNode {
  return h('button.list-group-item.list-group-item-action' + (active ? '.active' : ''), {
    props: {
      type: 'button',
      disabled: disabled
    },
    attrs: {
      'aria-current': active ? 'true' : 'false'
    },
    on: { click: onClick || (() => { }) }
  }, text);
}

export function ListGroup(items: VNode[]): VNode {
  return h('div.list-group', items);
}