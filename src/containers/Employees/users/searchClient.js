import React from 'react';
import { Modal } from 'antd';
import SearhClientForm from '../../../components/setting/userManagment/searchClientForm';

const UserModal = ({ visible, handleCancel }) => {


  return (
    <Modal title="Search by Phone" visible={visible} onCancel={handleCancel} footer={null}>
      <SearhClientForm handleCancel={handleCancel} />
    </Modal>
  );
};

export default UserModal;
