import React from 'react';
import { Modal } from 'antd';
import AddUserForm from '../../../components/setting/userManagment/addSaleManForm';

const UserModal = ({ visible, handleCancel }) => {


  return (
    <Modal title="Add new user" visible={visible} onCancel={handleCancel} footer={null}>
      <AddUserForm />
    </Modal>
  );
};

export default UserModal;
