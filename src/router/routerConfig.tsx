
import React from 'react';
const Login = React.lazy(() => import('@views/user/login'));
const Settlement = React.lazy(() => import('@views/settlement/Settlement'));

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/app',
    children: [
      {
        path: '/settlement',
        component: Settlement
      },
    ]
  },
];
export default routes;
