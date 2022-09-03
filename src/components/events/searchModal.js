import React from 'react';
import { Modal } from 'antd';
import SearchEventForm from './searchForm';

const SearchModal = ({ visible, handleCancel }) => {

  return (
    <Modal title={'Search By Date'} visible={visible} onCancel={handleCancel} footer={null}>
      <SearchEventForm handleCancel={handleCancel} />
    </Modal>
  );
};

export default SearchModal;
