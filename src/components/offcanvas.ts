import { h, VNode } from "snabbdom";

export function Offcanvas(id: string, content: VNode): VNode {
  return h("div", { attrs: { id, class: "offcanvas" } }, [content]);
}