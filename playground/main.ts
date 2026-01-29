import { h } from 'snabbdom';
import { App, Navbar, NavbarItem, NavbarList, OffcanvasBrand } from '../src/components/app';
import { flick, Offcanvas, OffcanvasBody, OffcanvasHeader } from '../src/index';

const navbar = Navbar(OffcanvasBrand('Flick'), NavbarList([
    NavbarItem('Home', '#home', true),
    NavbarItem('About', '#about'),
    NavbarItem('Contact', '#contact')
]));

const content = h('div.container.mt-4', [
    h('h1', 'Welcome to Flick!'),
    h('p', 'This is a sample application using the Flick framework with Snabbdom and Bootstrap.'),
    Offcanvas(
        OffcanvasBody(h('p', 'This is the offcanvas content. You can put any content you like here.')),
        OffcanvasHeader('Flick Offcanvas')
    )
]);

const rerender = flick('app', App(navbar, content));
rerender();