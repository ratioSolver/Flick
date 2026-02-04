import { h } from 'snabbdom';
import { App, Navbar, NavbarItem, NavbarList, OffcanvasBrand } from '../src/components/app';
import { Button, flick, ListGroup, ListGroupCheckbox, ListGroupItem, Offcanvas, OffcanvasBody, OffcanvasHeader, Row, Table, Toast, ToastContainer } from '../src/index';

enum Tabs {
  Home,
  About,
  Contact
}
let currentTab: Tabs = Tabs.Home;

enum Pages {
  Dashboard,
  Settings,
  Profile,
  Help
}
let currentPage: Pages = Pages.Dashboard;

const table_headers = ['ID', 'Name', 'Role'];
const table = [
  { id: 1, name: 'Alice', role: 'Admin' },
  { id: 2, name: 'Bob', role: 'User' },
  { id: 3, name: 'Charlie', role: 'Moderator' }
]
let current_row: number | null = null;

flick.mount(() => {
  const navbar = Navbar(OffcanvasBrand('Flick'), NavbarList([
    NavbarItem('Home', () => {
      currentTab = Tabs.Home;
      flick.redraw();
    }, currentTab === Tabs.Home),
    NavbarItem('About', () => {
      currentTab = Tabs.About;
      flick.redraw();
    }, currentTab === Tabs.About),
    NavbarItem('Contact', () => {
      currentTab = Tabs.Contact;
      flick.redraw();
    }, currentTab === Tabs.Contact)
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
    }, currentPage === Pages.Help),
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
    Table(table_headers, table.map(item => Row([item.id.toString(), item.name, item.role], () => {
      console.log('Row clicked:', item);
      current_row = item.id;
      flick.redraw();
    }, current_row === item.id))),
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