import { App, Brand, NavbarItem, NavbarList } from '../src/components/app';
import { flick } from '../src/index';

const rerender = flick('app', App(Brand('Flick'), NavbarList([
    NavbarItem('Home', '#home', true),
    NavbarItem('About', '#about'),
    NavbarItem('Contact', '#contact')
])));
rerender();