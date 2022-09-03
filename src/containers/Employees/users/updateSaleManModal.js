import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import EditUserForm from '../../../components/setting/userManagment/editSaleManForm';

const UserModal = ({ visible, handleCancel, editable, model }) => {
    const [defaultValues, setDefaultValues] = useState(null);
    useEffect(() => {
        if (editable) {
            const {
                firstName,
                lastName,
                username,
                percentage,
                phone,
                isActive,
            } = editable;
            setDefaultValues({ firstName, lastName, username, percentage, phone, isActive });
        }
    }, [editable]);



    return (
        <Modal title={`Edit ${editable?.username}`} visible={visible} onCancel={handleCancel} footer={null}>
            <EditUserForm userId={editable?.internalId} defaultValues={defaultValues} />
        </Modal>
    );
};

export default UserModal;
