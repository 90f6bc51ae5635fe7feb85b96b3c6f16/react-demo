import React from 'react';
const User = React.lazy(() => import('./views/User'));
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/user', name: 'User', component: User },
  { path: '/customer', name: 'Customer', component: User },
];
export default routes;
