import React from 'react';
import { Modal } from 'antd';
import AddUserForm from '../../../components/setting/userManagment/addUserForm';

const UserModal = ({ visible, handleCancel, role, model }) => {
  return (
    <Modal title="Add new user" visible={visible} onCancel={handleCancel} footer={null}>
      <AddUserForm role={role} model={model} />
    </Modal>
  );
};

export default UserModal;
