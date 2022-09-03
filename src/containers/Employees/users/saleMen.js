import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import Loader from '../../../components/utility/loader';
import userActions from '../../../redux/user/actions';
import DocumentsTable from '../../../components/documentsTable/salesTable';
import { appPermissions } from '../../../helpers/utility';
import { Layout } from 'antd';
import { AlertMessage } from '../../../components/common';
import AddUserModal from './addSaleManModal';
import MButton from '@material-ui/core/Button';

const { getSaleMen, flushUsers } = userActions;

const { Content } = Layout;

const SaleMan = () => {

    const [users, setUsers] = useState([]);
    const [addUserModalVisible, setAddUserModalVisible] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(true);
    const [userPermissions] = useState(useSelector(({ Auth }) => Auth.user.permissions));
    const usersData = useSelector(({ users }) => users.usersData);
    const isLoading = useSelector(({ users }) => users.isLoading);

    const dispatch = useDispatch();

    const handleCancel = () => {
        setAddUserModalVisible(false);
    };
    const openModal = () => {
        setAddUserModalVisible(true);
    };
    useEffect(() => {
        if (userPermissions[appPermissions.viewClients]) {
            dispatch(getSaleMen());
        } else {
            setIsAuthorized(false);
        }
        return () => {
            dispatch(flushUsers());
        };
    }, [dispatch, userPermissions]);

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
                            create new Sales
                        </MButton>
                        <div
                            style={{
                                borderRadius: '10px',
                                boxShadow: '0 7px 12px 0 rgba(22,37,63,.09)',
                                background: '#fff',
                            }}
                        >
                            <DocumentsTable users={users} title={'Sales'} />
                        </div>
                    </div>
                )}
            </Content>
            {/* <ToastContainer autoClose={4000} hideProgressBar={true} /> */}
            <AddUserModal visible={addUserModalVisible} handleCancel={() => handleCancel()} />
        </LayoutWrapper>
    );
};

export default SaleMan;