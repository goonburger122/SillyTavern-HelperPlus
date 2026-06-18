import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

jQuery(async () => {
    const container = document.createElement('div');
    container.id = 'helper-plus-root';
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(React.createElement(App));
});
