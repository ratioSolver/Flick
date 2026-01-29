import { App, Brand } from '../src/components/app';
import { flick } from '../src/index';

const rerender = flick('app', App(Brand('MyApp')));
rerender();