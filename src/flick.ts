import { init, classModule, propsModule, styleModule, eventListenersModule, attributesModule, type VNode } from 'snabbdom';
import { App } from './components/app';

const patch = init([classModule, propsModule, styleModule, eventListenersModule, attributesModule]);

export type Component = () => VNode;

class Flick {
    private old_node: VNode | Element | null = null;
    private root: Component | null = null;

    public mount(root: Component = () => App(), container_id: string = 'app') {
        this.old_node = document.getElementById(container_id)!;
        if (!this.old_node)
            throw new Error(`Container with id "${container_id}" not found.`);
        this.root = root;
        this.redraw();
    }

    public redraw() {
        this.old_node = patch(this.old_node!, this.root!());
    }
}

export const flick = new Flick();