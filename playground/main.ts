import { App, Brand, Navbar, NavbarItem, NavbarList } from '../src/components/app';
import { flick } from '../src/index';

const navbar = Navbar(Brand('Flick'), NavbarList([
    NavbarItem('Home', '#home', true),
    NavbarItem('About', '#about'),
    NavbarItem('Contact', '#contact')
]));

const rerender = flick('app', App(navbar));
rerender();