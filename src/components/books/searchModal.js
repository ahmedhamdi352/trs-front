import React from 'react';
import { Modal } from 'antd';
import SearchBookForm from './searchBookForm';

const SearchModal = ({ visible, handleCancel }) => {

  return (
    <Modal title={'Search By Phone'} visible={visible} onCancel={handleCancel} footer={null}>
      <SearchBookForm handleCancel={handleCancel} />
    </Modal>
  );
};

export default SearchModal;
