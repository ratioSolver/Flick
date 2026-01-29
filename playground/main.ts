import { h } from 'snabbdom';
import { App, Navbar, NavbarItem, NavbarList, OffcanvasBrand } from '../src/components/app';
import { flick, ListGroup, ListGroupItem, Offcanvas, OffcanvasBody, OffcanvasHeader } from '../src/index';

enum Pages {
  Dashboard,
  Settings,
  Profile,
  Help
}

let currentPage: Pages = Pages.Dashboard;

flick.mount(() => {
  const navbar = Navbar(OffcanvasBrand('Flick'), NavbarList([
    NavbarItem('Home', '#home', true),
    NavbarItem('About', '#about'),
    NavbarItem('Contact', '#contact')
  ]));

  const offcanvas_content = ListGroup([
    ListGroupItem('Dashboard', () => {
      currentPage = Pages.Dashboard;
      flick.redraw();
    }, currentPage === Pages.Dashboard),
    ListGroupItem('Settings', () => {
      currentPage = Pages.Settings;
      flick.redraw();
    }, currentPage === Pages.Settings),
    ListGroupItem('Profile', () => {
      currentPage = Pages.Profile;
      flick.redraw();
    }, currentPage === Pages.Profile),
    ListGroupItem('Help', () => {
      currentPage = Pages.Help;
      flick.redraw();
    }, currentPage === Pages.Help)
  ]);

  const content = h('div.container.mt-4', [
    h('h1', 'Welcome to Flick!'),
    h('p', 'This is a sample application using the Flick framework with Snabbdom and Bootstrap.'),
    Offcanvas(
      OffcanvasBody(offcanvas_content),
      OffcanvasHeader('Flick Offcanvas')
    )
  ]);

  return App(navbar, content);
});