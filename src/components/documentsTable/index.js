import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import MUIDataTable from 'mui-datatables';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import userActions from '../../redux/user/actions';
import UpdateUserModal from '../../containers/Employees/users/updateUserModal';
import { isEmpty } from '../../helpers/utility';

const DocumentsTable = ({ users, title, model }) => {
  const [editable, setEditable] = useState(null);
  const [updateUserModalVisible, setUpdateUserModalVisible] = useState(false);


  const { deleteUser } = userActions;

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

  const dispatch = useDispatch();
  const columns = [
    {
      name: 'username',
      label: 'User Name',
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
      name: 'email',
      label: 'Email Address',
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
              <Button onClick={() => {
                dispatch(deleteUser(value, model))
              }}>
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
    // filterType: 'multiselect',
    responsive: 'vertical',
    fixedSelectColumn: false,
    selectableRowsHeader: false,
    selectableRows: 'none'
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
      <UpdateUserModal editable={editable} visible={updateUserModalVisible} handleCancel={() => closeEditUserModal()}
        model={model}
      />
    </>
  );
};

export default DocumentsTable;
