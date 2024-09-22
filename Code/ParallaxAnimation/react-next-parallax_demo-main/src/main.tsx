import React from 'react';
import ReactDOM from 'react-dom/client';
import MainDemo from './pages/MainDemo.tsx';
import ControlElementDemo from './pages/ControlElementDemo.tsx';
import AttributesDemo from './pages/AttributesDemo.tsx';
import Error from './pages/Error.tsx';
import './index.css';

// config
import { base } from './config/config.ts';

// react-router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainDemo />,
      errorElement: <Error />,
    },
    {
      path: '/control-element',
      element: <ControlElementDemo />,
    },
    {
      path: '/attributes',
      element: <AttributesDemo />,
    },
    {
      path: '/attributes/offset',
      element: <AttributesDemo attribute="offset" />,
    },
    {
      path: '/attributes/opacity',
      element: <AttributesDemo attribute="opacity" />,
    },
    {
      path: '/attributes/scale',
      element: <AttributesDemo attribute="scale" />,
    },
    {
      path: '/attributes/rotation',
      element: <AttributesDemo attribute="rotation" />,
    },
    {
      path: '/attributes/skew',
      element: <AttributesDemo attribute="skew" />,
    },
  ],
  { basename: base }
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
