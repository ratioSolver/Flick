import { h, VNode, VNodeChildren } from 'snabbdom';

export function Header(cells: VNodeChildren[]): VNode {
  return h('tr', cells.map(cell => h('th', { props: { scope: 'col' } }, cell)));
}

export function Row(cells: VNodeChildren[], onClick?: () => void, active: boolean = false): VNode {
  return h('tr' + (active ? '.table-active' : ''), {
    style: { cursor: onClick ? 'pointer' : 'default' },
    on: { click: onClick || (() => { }) }
  }, cells.map(cell => h('td', cell)));
}

export function Table(header: VNode, rows: VNode[]): VNode {
  return h('table.table.table-striped.table-hover', [
    h('thead', header),
    h('tbody', rows)
  ]);
}