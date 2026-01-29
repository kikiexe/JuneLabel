import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { CartProvider } from './Contexts/CartContext';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => {
    const pages = import.meta.glob('./Pages/**/*.tsx');
    const path = `./Pages/${name}.tsx`;

    if (pages[path]) {
      return pages[path]();
    }

    throw new Error(`Page not found: ${name} at ${path}`);
  },
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <CartProvider>
        <App {...props} />
      </CartProvider>
    );
  },
  progress: {
    color: '#4B5563',
  },
});
