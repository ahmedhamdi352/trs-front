import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import Loader from '../../../components/utility/loader';
import clientsAction from '../../../redux/clients/actions';
import DocumentsTable from '../../../components/documentsTable/clientsTable';
import { appPermissions } from '../../../helpers/utility';
import { Layout } from 'antd';
import { AlertMessage } from '../../../components/common';
import SearchClientModal from './searchClient';
import MButton from '@material-ui/core/Button';

const { getClients, flushClients } = clientsAction;

const { Content } = Layout;

const Clients = () => {

    const [users, setUsers] = useState([]);
    const [addUserModalVisible, setAddUserModalVisible] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(true);
    const [userPermissions] = useState(useSelector(({ Auth }) => Auth.user.permissions));
    const usersData = useSelector(({ clients }) => clients.clientsData);
    const isLoading = useSelector(({ clients }) => clients.isLoading);

    const dispatch = useDispatch();

    const handleCancel = () => {
        setAddUserModalVisible(false);
    };
    const openModal = () => {
        setAddUserModalVisible(true);
    };
    useEffect(() => {
        if (userPermissions[appPermissions.viewClients]) {
            dispatch(getClients());
        } else {
            setIsAuthorized(false);
        }
        return () => {
            dispatch(flushClients());
        };
    }, [userPermissions, dispatch]);

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
                    <>
                        <div style={{
                            display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'
                        }}>
                            <MButton
                                style={{
                                    fontFamily: "'Montserrat', sans-serif", marginRight: '8px',
                                    alignSelf: 'flex-end', marginBottom: '10px', width: '15%',
                                    textTransform: 'capitalize'
                                }}
                                variant="contained"
                                color='primary'
                            >
                                Send SMS
                            </MButton>
                            <MButton
                                style={{
                                    fontFamily: "'Montserrat', sans-serif",
                                    alignSelf: 'flex-end', marginBottom: '10px', width: '15%',
                                    textTransform: 'capitalize'
                                }}
                                variant="contained"
                                color='primary'
                                onClick={() => openModal()}
                            >
                                Search
                            </MButton>
                        </div>
                        <div
                            style={{
                                borderRadius: '10px',
                                boxShadow: '0 7px 12px 0 rgba(22,37,63,.09)',
                                background: '#fff',
                            }}
                        >
                            <DocumentsTable users={users} title={'Clients'} />
                        </div>
                    </>
                )}
            </Content>
            <SearchClientModal visible={addUserModalVisible} handleCancel={() => handleCancel()} />
        </LayoutWrapper>
    );
};

export default Clients;