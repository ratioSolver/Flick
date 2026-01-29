import { init, classModule, propsModule, styleModule, eventListenersModule, type VNode } from "snabbdom";

const patch = init([classModule, propsModule, styleModule, eventListenersModule]);

type Component = () => VNode;

export function flick(containerId: string, rootComponent: Component) {
    let oldVnode: VNode | Element = document.getElementById(containerId)!;

    // This is the actual function we call whenever state changes
    return function rerender() {
        const newVnode = rootComponent();
        oldVnode = patch(oldVnode, newVnode);
    };
}
