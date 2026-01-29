import { init, classModule, propsModule, styleModule, eventListenersModule, attributesModule, type VNode } from 'snabbdom';
import { App } from './components/app';

const patch = init([classModule, propsModule, styleModule, eventListenersModule, attributesModule]);

export type Component = () => VNode;

export function flick(containerId: string = 'app', rootComponent: VNode = App()): () => void {
    let oldVnode: VNode | Element = document.getElementById(containerId)!;

    // This is the actual function we call whenever state changes
    return function rerender() {
        oldVnode = patch(oldVnode, rootComponent);
    };
}
