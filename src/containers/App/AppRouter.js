import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import asyncComponent from '../../helpers/AsyncFunc';

const routes = [
  {
    path: 'sss',
    component: asyncComponent(() => <>test</>),
  },
  {
    path: 'company/new',
    component: asyncComponent(() => <></>),
  },
  {
    path: 'events',
    component: asyncComponent(() => import('../Events')),
  },
  {
    path: 'create/event',
    component: asyncComponent(() => import('../Events/createEvent')),
  },
  {
    path: 'employees/admin',
    component: asyncComponent(() => import('../Employees/users/user')),
  },
  {
    path: 'book-room/:eventId',
    component: asyncComponent(() => import('../Books/roomBook')),
  },
  {
    path: 'book-bus/:eventId',
    component: asyncComponent(() => import('../Books/busBook')),
  },
  {
    path: 'book/:eventId',
    component: asyncComponent(() => import('../Books/normalBook')),
  },
  {
    path: 'view-books/:eventId',
    component: asyncComponent(() => import('../Books/booksView')),
  },
  {
    path: 'employees/receptionist',
    component: asyncComponent(() => import('../Employees/users/user')),
  },
  {
    path: 'employees/finance',
    component: asyncComponent(() => import('../Employees/users/user')),
  },
  {
    path: 'employees/sales',
    component: asyncComponent(() => import('../Employees/users/saleMen')),
  },
  {
    path: 'clients',
    component: asyncComponent(() => import('../Employees/users/clients')),
  },
  {
    path: 'doc/json/:documentId',
    component: asyncComponent(() => <></>),
  },
  {
    path: 'settings/change-paasword',
    component: asyncComponent(() => import('../ChangePassword')),
  },
];

class AppRouter extends Component {
  render() {
    const { url, style } = this.props;
    return (
      <div style={style}>
        {routes.map((singleRoute) => {
          const { path, exact, ...otherProps } = singleRoute;
          return <Route exact={exact === false ? false : true} key={singleRoute.path} path={`${url}/${singleRoute.path}`} {...otherProps} />;
        })}
      </div>
    );
  }
}

export default AppRouter;
