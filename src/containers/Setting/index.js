import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {  Menu } from 'antd';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import ScheduledTasksSetting from './ScheduledTasks';
import ChangePassword from './ChangePassword';
import UserManagment from './UserManagment';
import EmailSettings from './EmailSettings';
import ManageNotifications from './ManageNotifications';
import ManageRoles from './ManageRoles';

const Setting = () => {
  const currentUser = useSelector(({ Auth }) => Auth.user);
  let userRole = currentUser.role;
  // const [key, setKey] = useState(userRole === 'admin' ? '1' : '3');
  const [key, setKey] = useState('1');

  const changeTab = (event) => {
    setKey(event.key);
  };
  return (
    <LayoutWrapper>
      <LayoutContent style={{ padding: '0', marginTop: '-10px', height: 'auto', minHeight: '80vh' }}>
        <div className="row">
          <div className="col-lg-3">
            <Menu onClick={changeTab} defaultSelectedKeys={key} mode="inline">
              {/* {userRole === 'admin' && ( */}
              <Menu.Item key={'1'}>
                <span
                  style={{
                    fontWeight: 500,
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '13px',
                  }}
                >
                   Scheduled Tasks
                </span>
              </Menu.Item>
              {/* )} */}

              {/* {userRole === 'admin' && ( */}
              <Menu.Item key={'2'}>
                <span
                  style={{
                    fontWeight: 500,
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '13px',
                  }}
                >
                   User Management
                </span>
              </Menu.Item>
              {/* )} */}

              <Menu.Item key={'3'}>
                <span
                  style={{
                    fontWeight: 500,
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '13px',
                  }}
                >
                  Change Password
                </span>
              </Menu.Item>
              <Menu.Item key={'4'}>
                <span
                  style={{
                    fontWeight: 500,
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '13px',
                  }}
                >
                   E-Mail Settings
                </span>
              </Menu.Item>
              <Menu.Item key={'5'}>
                <span
                  style={{
                    fontWeight: 500,
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '13px',
                  }}
                >
                 Manage Notifications
                </span>
              </Menu.Item>
              <Menu.Item key={'6'}>
                <span
                  style={{
                    fontWeight: 500,
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '13px',
                  }}
                >
                  Manage Roles
                </span>
              </Menu.Item>
            </Menu>
          </div>
          {key === '1' && (
            <div className="col-lg-9">
              <ScheduledTasksSetting />
            </div>
          )}

          {key === '2' && (
            <div className="col-lg-9">
              <UserManagment />
            </div>
          )}
          {key === '3' && (
            <div className="col-lg-9">
              <ChangePassword />
            </div>
          )}
          {key === '4' && (
            <div className="col-lg-9">
              <EmailSettings />
            </div>
          )}
          {key === '5' && (
            <div className="col-lg-9">
              <ManageNotifications />
            </div>
          )}
          {key === '6' && (
            <div className="col-lg-9">
              <ManageRoles />
            </div>
          )}
        </div>
      </LayoutContent>
    </LayoutWrapper>
  );
};

export default Setting;
