import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from 'antd';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import Loader from '../../components/utility/loader';
import eventActions from '../../redux/events/actions';
import ShowEvents from '../../components/events/showEvents'
import MButton from '@material-ui/core/Button';
import { appPermissions } from '../../helpers/utility';
import SeachEvent from '../../components/events/searchModal';

const { getEvents, flushEvents } = eventActions;

const { Content } = Layout;

const AllDocuments = ({ history }) => {
  const dispatch = useDispatch();
  const { events, isLoading } = useSelector(({ events }) => {
    return {
      events: events.events,
      isLoading: events.isLoading
    }
  });
  const [userPermissions] = useState(useSelector(({ Auth }) => Auth.user.permissions));
  const [searchModalVisible, setSearchModalVisible] = useState(false);


  useEffect(() => {
    dispatch(getEvents())
    return () => {
      dispatch(flushEvents());
    };
  }, [dispatch]);

  return (
    <>
      <LayoutWrapper>
        {isLoading && <Loader />}
        <Content style={{ marginTop: '-35px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', width: '100%' }}>
            {userPermissions[appPermissions.createEvent] &&
              <MButton
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  alignSelf: 'flex-end', marginBottom: '10px', width: '15%', marginRight: '8px',
                  textTransform: 'capitalize'
                }}
                variant="contained"
                color='primary'
                onClick={() => history.push('/dashboard/create/event')}
              >
                Create Event
              </MButton>
            }
            <MButton
              style={{
                fontFamily: "'Montserrat', sans-serif",
                alignSelf: 'flex-end', marginBottom: '10px', width: '15%',
                textTransform: 'capitalize'
              }}
              variant="contained"
              color='primary'
              onClick={() => setSearchModalVisible(true)}
            >
              Search
            </MButton>
          </div>
          <ShowEvents events={events} admin={userPermissions[appPermissions.createEvent]} />
          <SeachEvent visible={searchModalVisible} handleCancel={() => setSearchModalVisible(false)} />
        </Content>
      </LayoutWrapper>
    </>
  );
};

export default AllDocuments;
