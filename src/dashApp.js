import React from 'react';
import { Provider } from 'react-redux';
import { store, history } from './redux/store';
import PublicRoutes from './router';
import Boot from './redux/boot';


const DashApp = () => (
  <Provider store={store}>
    <PublicRoutes history={history} />
  </Provider>
);

Boot()
  .then(() => DashApp())
  .catch((error) => console.error(error));

export default DashApp;
