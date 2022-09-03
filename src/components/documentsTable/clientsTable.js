import React, { useState } from 'react';
import { Button } from 'antd';
import MUIDataTable from 'mui-datatables';
import { isEmpty } from '../../helpers/utility';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import UpdateUserModal from '../../containers/Employees/users/updateSaleManModal';

const DocumentsTable = ({ users, title }) => {
    const [editable, setEditable] = useState(null);
    const [updateUserModalVisible, setUpdateUserModalVisible] = useState(false);
    const openEditUserModal = (id) => {
        const user = users.filter(item => item.internalId === id)
        setUpdateUserModalVisible(true);
        if (!isEmpty(user)) {
            setEditable(user[0]);
        }
    };
    const closeEditUserModal = () => {
        setUpdateUserModalVisible(false);
        setEditable(null);
    };
    const columns = [
        {
            name: 'name',
            label: 'Name',
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: 'address',
            label: 'Address',
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: 'phone',
            label: 'Phone Number',
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: 'userId',
            label: 'National ID',
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: 'isActive',
            label: 'Active',
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    if (value === true) {
                        return (
                            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                Active
                            </div>
                        )
                    }
                    return (
                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            Not Active
                        </div>
                    );
                },
            },
        },
        {
            name: 'internalId',
            label: 'Actions',
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value) => {
                    return (
                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Button onClick={() => openEditUserModal(value)}>
                                <EditIcon style={{ color: '#1890FF' }} />
                            </Button>
                            <Button >
                                <DeleteIcon style={{ color: 'red' }} />
                            </Button>
                        </div>
                    );
                },
            },
        },

    ];

    const options = {
        filter: false,
        search: false,
        download: false,
        print: false,
        responsive: 'vertical',
        fixedSelectColumn: false,
        selectableRowsHeader: true,
        selectableRows: true,
        scrollY: true
    };
    return (
        <>
            <MUIDataTable
                title={
                    <p
                        className="pt-2"
                        style={{
                            fontSize: '18px',
                            fontFamily: "'Montserrat', sans-serif",
                        }}
                    >
                        {title}
                    </p>
                }
                data={users}
                columns={columns}
                options={options}
            />
            <UpdateUserModal editable={editable} visible={updateUserModalVisible} handleCancel={() => closeEditUserModal()} />
        </>
    );
};

export default DocumentsTable;
