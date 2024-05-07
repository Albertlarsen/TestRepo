/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import { Router } from '@/routes/Router/Router';

import store from './rtk/app/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  // if you ever wonder why the components render twice it's because of React.StrictMode
  // comment it out if it causes trouble: https://react.dev/reference/react/StrictMode
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <RouterProvider router={Router}></RouterProvider>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
);
