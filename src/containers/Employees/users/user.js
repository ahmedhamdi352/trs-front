import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import Loader from '../../../components/utility/loader';
import userActions from '../../../redux/user/actions';
import DocumentsTable from '../../../components/documentsTable';
import { appPermissions } from '../../../helpers/utility';
import { Layout } from 'antd';
import { AlertMessage } from '../../../components/common';
import { capitalize } from '../../../helpers/utility'
import MButton from '@material-ui/core/Button';
import AddUserModal from './addUserModal';

const { getUsers, flushUsers } = userActions;

const { Content } = Layout;

const AllDocuments = (props) => {
  const { url } = props.match;

  const [addUserModalVisible, setAddUserModalVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [userPermissions] = useState(useSelector(({ Auth }) => Auth.user.permissions));
  const usersData = useSelector(({ users }) => users.usersData);
  const isLoading = useSelector(({ users }) => users.isLoading);
  const roles = useSelector(({ role }) => role.roles);


  const dispatch = useDispatch();

  const openModal = () => {
    setAddUserModalVisible(true);
  };
  const handleCancel = () => {
    setAddUserModalVisible(false);
  };

  const getRole = () => {
    if (url.split('/')[3] === 'receptionist') {
      const role = roles?.filter(item => item.name === 'sales')
      if (role) {
        return role[0]?.internalId
      }
    }
    else {
      const role = roles?.filter(item => item.name === url.split('/')[3])
      if (role) {
        return role[0]?.internalId
      }
    }
  }
  useEffect(() => {
    if (userPermissions[appPermissions.viewClients]) {
      dispatch(getUsers(url.split('/')[3]));
    } else {
      setIsAuthorized(false);
    }
    return () => {
      dispatch(flushUsers());
    };
  }, [url, userPermissions, dispatch]);

  useEffect(() => {
    if (usersData) {
      setUsers(usersData);
    }
  }, [usersData]);
  return (
    <LayoutWrapper>
      <Content style={{ padding: '0 20px', marginTop: '-10px' }}>
        {!isAuthorized && <AlertMessage className="mb-2" message={"Insufficient privileges, you don't have permission to access this feature!"} />}

        {isLoading ? (
          <Loader />
        ) : (
          <div style={{
            display: 'flex', flexDirection: 'column'
          }}>
            <MButton
              style={{
                fontFamily: "'Montserrat', sans-serif",
                alignSelf: 'flex-end', marginBottom: '10px', width: '25%',
                textTransform: 'capitalize'
              }}
              variant="contained"
              color='primary'
              onClick={() => openModal()}
            >
              {`create new ${capitalize(url.split('/')[3])}`}
            </MButton>
            <div
              style={{
                borderRadius: '10px',
                boxShadow: '0 7px 12px 0 rgba(22,37,63,.09)',
                background: '#fff',
              }}
            >
              <DocumentsTable users={users} title={`${capitalize(url.split('/')[3])}s`}
                model={url.split('/')[3]}
              />
            </div>
          </div>

        )}
      </Content>
      {/* <ToastContainer autoClose={4000} hideProgressBar={true} /> */}
      <AddUserModal visible={addUserModalVisible} handleCancel={() => handleCancel()} role={getRole()} model={url.split('/')[3]} />
    </LayoutWrapper>
  );
};

export default AllDocuments;