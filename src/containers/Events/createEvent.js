import React from 'react';
import { Divider } from 'antd';
import CreateEventForm from '../../components/events/form';

const ChangePassword = () => {
  return (
    <>
      <span className="setting-label">Create New Event</span>
      <Divider className="mt-0 mb-0" />
      <CreateEventForm />
    </>
  );
};

export default ChangePassword;
