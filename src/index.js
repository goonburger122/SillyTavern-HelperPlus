import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const initApp = () => {
    const container = document.createElement('div');
    container.id = 'helper-plus-root';
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(React.createElement(App));
};

// Give ST 1.5 seconds to load its own UI before we inject our button
setTimeout(initApp, 1500);
