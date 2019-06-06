import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Dashboard = React.lazy(() => import('./containers/Pages/Dashboard/Dashboard'));
const ReduxSaga = React.lazy(() => import('./containers/Pages/ReduxSaga/ReduxSaga'));
const User = React.lazy(() => import('./containers/Pages/User/User'));
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/demo/redux-saga', name: 'ReduxSaga', component: ReduxSaga },
  { path: '/user', name: 'User', component: User }
];

export default routes;
