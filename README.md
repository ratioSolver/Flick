# Flick

Flick is a tiny and focused UI framework designed for clarity and speed. It provides just the essentials to create reactive, component-based interfaces using clean and predictable patterns.

⚡ Lightweight and fast

🧠 Reactive state management

🧩 Component-driven architecture

💎 Written in TypeScript

🔗 Minimal external dependencies (relies only on Bootstrap)

## Overview

Flick provides the basic utilities for managing components, lists, server connections, and user sessions. The framework is designed to be lightweight and flexible, making it easy to integrate into various web applications. It provides essential utilities for handling:

 - **Component management** – A structured approach to defining and interacting with components.
 - **List management** – Built-in support for managing collections of components.
 - **Server connection** – Tools for handling communication with a server.
 - **User management** – Basic utilities for managing the current user session.

## Installation

To install Flick, you can use npm:

```bash
npm install flick
```

## Usage

Flick provides a set of utilities that can be used to build web applications. Here is an example of how to use the framework to create a simple component:

```javascript
import { AppComponent } from 'flick';

class MyApp extends AppComponent {

    count = 0;
    button = document.createElement('button');

    constructor() {
        super();
        button.textContent = 'Click me';
        button.onclick = () => this.increment();
        this.element.appendChild(button);
    }

    increment() {
        this.count++;
        this.button.textContent = `Clicked ${this.count} times`;
    }
}

const myApp = new MyApp();
```