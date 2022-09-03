/* eslint-disable import/no-anonymous-default-export */
import Auth from './auth/reducer';
import Toaster from './toaster/reducer';
import documents from './documents/reducer';
import setting from './setting/reducer';
import notification from './notification/reducer';
import role from './role/reducer';
import users from './user/reducer';
import clients from './clients/reducer';
import events from './events/reducer';
import sales from './sales/reducer';
import books from './book/reducer';

export default {
  Auth,
  documents,
  setting,
  notification,
  role,
  Toaster,
  users,
  clients,
  events,
  sales,
  books
};
