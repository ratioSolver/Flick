import { h } from 'snabbdom';
import { App, Navbar, NavbarItem, NavbarList, OffcanvasBrand } from '../src/components/app';
import { flick, ListGroup, ListGroupItem, Offcanvas, OffcanvasBody, OffcanvasHeader } from '../src/index';

const navbar = Navbar(OffcanvasBrand('Flick'), NavbarList([
    NavbarItem('Home', '#home', true),
    NavbarItem('About', '#about'),
    NavbarItem('Contact', '#contact')
]));

const offcanvas_content = ListGroup([
    ListGroupItem('Dashboard', () => alert('Dashboard clicked'), true),
    ListGroupItem('Settings', () => alert('Settings clicked')),
    ListGroupItem('Profile', () => alert('Profile clicked')),
    ListGroupItem('Help', () => alert('Help clicked'))
]);

const content = h('div.container.mt-4', [
    h('h1', 'Welcome to Flick!'),
    h('p', 'This is a sample application using the Flick framework with Snabbdom and Bootstrap.'),
    Offcanvas(
        OffcanvasBody(offcanvas_content),
        OffcanvasHeader('Flick Offcanvas')
    )
]);

const rerender = flick('app', App(navbar, content));
rerender();