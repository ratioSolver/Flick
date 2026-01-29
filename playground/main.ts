import { flick, Button } from '../src/index';
import { h } from 'snabbdom';

const MyComponent = () => {
  return h('div.container.mt-5', [
    h('h1', 'Hello from Flick!'),
    Button('Click Me', () => alert('Button Clicked!'))
  ]);
};

// Initialize
// const rerender = flick('app', MyComponent);
const rerender = flick();
rerender();