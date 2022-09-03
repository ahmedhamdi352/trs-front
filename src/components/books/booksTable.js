import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import MUIDataTable from 'mui-datatables';
import { isEmpty } from '../../helpers/utility';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import UpdateUserModal from '../../containers/Employees/users/updateSaleManModal';
import bookActions from '../../redux/book/actions'
const DocumentsTable = ({ users, title }) => {

  const { deleteBook } = bookActions;
  const dispatch = useDispatch();
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
      name: 'bookOwner',
      label: 'Book Owner',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'bookPhone',
      label: 'Book Phone',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'totalPrice',
      label: 'Total Price',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'remainingMoney',
      label: 'Remaining Money',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'internalId',
      label: 'Clients',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const data = tableMeta?.tableData?.filter(item => item.internalId === value)
          if (data[0]?.clients?.length !== data[0]?.numberOfClients) {
            return (
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', color: 'red' }}>
                Need Update
              </div>
            )
          }
          return (
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', color: '#53e206' }}>
              Updated
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
        customBodyRender: (value, tableMeta) => {
          return (
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              {/* <Button onClick={() => openEditUserModal(value)}>
                <EditIcon style={{ color: '#1890FF' }} />
              </Button> */}
              <Button onClick={() => {
                const data = tableMeta?.tableData?.filter(item => item.internalId === value)
                dispatch(deleteBook(value, data[0]?.event?.internalId))
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
    selectableRows: false,
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
