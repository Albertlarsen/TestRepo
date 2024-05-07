import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import * as React from 'react';

import { StartPage } from '@/features/StartPage/StartPage';
import { ReadMore } from '@/features/ReadMore/ReadMore';

import { GeneralPath } from '../paths/GeneralPath';

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={'/'}>
      <Route
        path={GeneralPath.Start}
        element={<StartPage />}
      ></Route>
      <Route
        path={GeneralPath.Trip + '/' + `:id`}
        element={<ReadMore />}
      ></Route>
    </Route>,
  ),
  { basename: GeneralPath.BasePath },
);
