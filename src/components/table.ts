import { h, VNode, VNodeChildren } from 'snabbdom';

export function Header(cells: VNodeChildren[]): VNode {
  return h('tr', cells.map(cell => h('th', { props: { scope: 'col' } }, cell)));
}

export function Row(cells: VNodeChildren[], onClick?: () => void, active: boolean = false): VNode {
  return h('tr' + (active ? '.table-active' : ''), {
    on: { click: onClick || (() => { }) },
    style: { cursor: onClick ? 'pointer' : 'default' }
  }, cells.map(cell => h('td', cell)));
}

export function Table(header: VNodeChildren[], rows: VNode[]): VNode {
  return h('table.table.table-striped.table-hover', [
    h('thead', Header(header)),
    h('tbody', rows)
  ]);
}