import { init, classModule, propsModule, styleModule, eventListenersModule, attributesModule, type VNode } from 'snabbdom';
import { App } from './components/app';

const patch = init([classModule, propsModule, styleModule, eventListenersModule, attributesModule]);

export type Component = () => VNode;

export function flick(container_id: string = 'app', rootComponent: Component = () => App()): () => void {
    let oldVnode: VNode | Element = document.getElementById(container_id)!;

    // This is the actual function we call whenever state changes
    return function rerender() {
        oldVnode = patch(oldVnode, rootComponent());
    };
}
