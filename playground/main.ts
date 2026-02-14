import { h } from 'snabbdom';
import { App, Navbar, NavbarItem, NavbarList, OffcanvasBrand } from '../src/components/app';
import { Button, flick, Header, ListGroup, ListGroupCheckbox, ListGroupItem, Offcanvas, OffcanvasBody, OffcanvasHeader, Row, Table, Toast, ToastContainer } from '../src/index';

enum Tabs {
  Home,
  About,
  Contact
}

enum Pages {
  Dashboard,
  Settings,
  Profile,
  Help
}

const table_headers = ['ID', 'Name', 'Role'];
const table = [
  { id: 1, name: 'Alice', role: 'Admin' },
  { id: 2, name: 'Bob', role: 'User' },
  { id: 3, name: 'Charlie', role: 'Moderator' }
]

flick.mount(() => {
  const navbar = Navbar(OffcanvasBrand('Flick'), NavbarList([
    NavbarItem('Home', () => {
      flick.ctx.currentTab = Tabs.Home;
      flick.redraw();
    }, flick.ctx.currentTab === Tabs.Home),
    NavbarItem('About', () => {
      flick.ctx.currentTab = Tabs.About;
      flick.redraw();
    }, flick.ctx.currentTab === Tabs.About),
    NavbarItem('Contact', () => {
      flick.ctx.currentTab = Tabs.Contact;
      flick.redraw();
    }, flick.ctx.currentTab === Tabs.Contact)
  ]));

  const offcanvas_content = ListGroup([
    ListGroupItem('Dashboard', () => {
      flick.ctx.currentPage = Pages.Dashboard;
      flick.redraw();
    }, flick.ctx.currentPage === Pages.Dashboard),
    ListGroupItem('Settings', () => {
      flick.ctx.currentPage = Pages.Settings;
      flick.redraw();
    }, flick.ctx.currentPage === Pages.Settings),
    ListGroupItem('Profile', () => {
      flick.ctx.currentPage = Pages.Profile;
      flick.redraw();
    }, flick.ctx.currentPage === Pages.Profile),
    ListGroupItem('Help', () => {
      flick.ctx.currentPage = Pages.Help;
      flick.redraw();
    }, flick.ctx.currentPage === Pages.Help),
    ListGroupCheckbox('Enable Notifications', false, (checked) => {
      console.log('Notifications toggled:', checked);
    }),
    ListGroupCheckbox('Dark Mode', true, (checked) => {
      console.log('Dark Mode toggled:', checked);
    }, true)
  ]);

  const content = h('div.container.mt-4', [
    h('h1', 'Welcome to Flick!'),
    h('p', 'This is a sample application using the Flick framework with Snabbdom and Bootstrap.'),
    Button('Click Me', () => console.log('Button clicked!')),
    Table(Header(table_headers), table.map(item => Row([item.id.toString(), item.name, item.role], () => {
      console.log('Row clicked:', item);
      flick.ctx.currentRow = item.id;
      flick.redraw();
    }, flick.ctx.currentRow === item.id))),
    Offcanvas(
      OffcanvasBody(offcanvas_content),
      OffcanvasHeader('Flick Offcanvas')
    ),
    ToastContainer([Toast('sampleToast', 'alert', 'This is a sample toast message!', 'Notification', true, () => {
      console.log('Toast closed');
    })])
  ]);

  return App(navbar, content);
});