import React from 'react';
import { Modal } from 'antd';

const GeneralModal = ({ visible, handleCancel, deleteAction }) => {

  return (
    <Modal title={`Warring`} visible={visible} onCancel={handleCancel} onOk={deleteAction}>
      <p>All related books on this event will deleted</p>
    </Modal>
  );
};

export default GeneralModal;
