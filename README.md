# Flick

Flick is a tiny and focused UI framework designed for clarity and speed. It is built on top of **[Snabbdom](https://github.com/snabbdom/snabbdom)** for efficient Virtual DOM handling and **[Bootstrap](https://getbootstrap.com/)** for styling, providing strictly typed functional components to build reactive web interfaces.

⚡ **Fast Virtual DOM** powered by Snabbdom
🎨 **Bootstrap 5** Integration out-of-the-box
🧩 **Functional Component** architecture
💎 **Written in TypeScript**
🔄 **Explicit Reactivity** model

## Overview

Flick takes a functional approach to UI development. Instead of complex state management systems or class-based components, it relies on simple functions that return Virtual DOM nodes. Reactivity is handled explicitly—you update your state variables and call `flick.redraw()` to update the view.

Key features include:
 - **Declarative UI** – Build views using simple functions.
 - **Built-in Components** – Ready-to-use Bootstrap components like Navbar, Offcanvas, Table, ListGroup, and Toast.
 - **Manual Redraw Control** – Full control over when the UI updates.

## Installation

To install Flick, use npm:

```bash
npm install @ratiosolver/flick
```

## Usage

Flick exports a singleton instance `flick` to manage mounting and redrawing the application. Components are just functions that return Snabbdom VNodes.

Here is a simple interactive counter example:

```typescript
import { flick, Button, App, Navbar, OffcanvasBrand, NavbarList, NavbarItem } from '@ratiosolver/flick';
import { h } from 'snabbdom';

// 1. Define your state
let count = 0;

// 2. Define actions that update state and trigger a redraw
function increment() {
    count++;
    flick.redraw();
}

// 3. Mount the application
flick.mount(() => {
    // The main render function returns the entire app view

    const navbar = Navbar(
        OffcanvasBrand('Counter App'),
        NavbarList([
            NavbarItem('Home', () => console.log('Navigating to Home'), true)
        ])
    );

    const content = h('div.container.mt-5.text-center', [
        h('h1', 'Welcome to Flick'),
        h('p.lead', `Current count is: ${count}`),
        Button('Increment', increment)
    ]);

    // The App component typically wraps the layout
    return App(navbar, content);
});
```

### Components

Flick provides helpers for common Bootstrap components. For example, creating a table:

```typescript
import { Table, Row, flick } from '@ratiosolver/flick';

const headers = ['ID', 'Name', 'Role'];
const users = [
  { id: 1, name: 'Alice', role: 'Admin' },
  { id: 2, name: 'Bob', role: 'User' }
];

const UserTable = () => Table(
    headers, 
    users.map(user => Row(
        [user.id.toString(), user.name, user.role], 
        () => console.log(`Clicked ${user.name}`)
    ))
);
```