import { flick } from '../src/flick';
import { h } from 'snabbdom';

const MyComponent = () => {
  return h('div.container.mt-5', [
    h('h1', 'Hello from Flick!'),
    h('button.btn.btn-primary', { 
        on: { click: () => alert('Clicked!') } 
    }, 'Click Me')
  ]);
};

// Initialize
const rerender = flick('app', MyComponent);
rerender();