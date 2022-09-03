import { UnorderedListOutlined, PrinterOutlined, AimOutlined } from '@ant-design/icons';
import { Card, Popover } from 'antd';
import React, { useState } from 'react';
import moment from 'moment'
import { Link } from 'react-router-dom';
import eventActions from '../../redux/events/actions';
import { useDispatch } from 'react-redux';
import UpdateEventModal from './updateEventModal';
import { GeneralModal } from '../common';

const ShowEvents = ({ data, admin }) => {

  const dispatch = useDispatch();
  const { deleteEvent } = eventActions;
  const [visible, setVisible] = useState(false);
  const [editable, setEditable] = useState(null);
  const [updateUserModalVisible, setUpdateUserModalVisible] = useState(false);

  const [openDeleteModal, setDeleteModal] = useState(null);

  const openEditUserModal = () => {
    setVisibleAction(false)
    setUpdateUserModalVisible(true);
    setEditable(data);
  };

  const closeEditUserModal = () => {
    setUpdateUserModalVisible(false);
    setEditable(null);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false)
  }
  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  const [visibleAction, setVisibleAction] = useState(false);

  const handleVisibleActionChange = (newVisible) => {
    setVisibleAction(newVisible);
  };

  const [visibleBook, setVisibleBook] = useState(false);

  const handleVisibleBookChange = (newVisible) => {
    setVisibleBook(newVisible);
  };

  const deleteAction = () => {
    dispatch(deleteEvent(data?.internalId))
    setDeleteModal(false)
    setVisibleAction(false)
  }
  return (
    <Card
      style={{ flex: '0 0 33.333333 %', margin: '10px', width: '300px', borderColor: data?.color }}
      actions={[
        // <DeleteOutlined key="delete" onClick={() => dispatch(deleteEvent(data?.internalId))} />,
        // <EditOutlined key="edit" onClick={() => openEditUserModal()} />,
        <Popover
          placement="top"
          content={
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link to={`view-books/${data?.internalId}`}>View Books</Link>
              {admin && <Link onClick={() => openEditUserModal()}>Edit Event</Link>}
              {admin && <Link onClick={() => {
                setDeleteModal(true)
              }}>
                Delete Event</Link>}
            </div>
          }
          trigger="click"
          visible={visibleAction}
          onVisibleChange={handleVisibleActionChange}
        >
          <UnorderedListOutlined style={{ color: data?.color }} />
        </Popover>,
        <Popover
          placement="top"
          content={
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
              {data?.busOnly && (data?.remainingChairs !== 0 || data?.remainingRooms !== 0) && <Link to={`book/${data?.internalId}`}>Book</Link>}
              {data?.busOnly && data?.remainingChairs !== 0 && <Link to={`book-bus/${data?.internalId}`}>Book Bus</Link>}
              {data?.roomOnly && data?.remainingRooms !== 0 && <Link to={`book-room/${data?.internalId}`}>Book Room</Link>}
            </div>
          }
          trigger="click"
          visible={visibleBook}
          onVisibleChange={handleVisibleBookChange}
        >
          <AimOutlined style={{ color: data?.color }} />
        </Popover>,
        <Popover
          placement="top"
          content={
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link>Print Bus</Link>
              <Link>Print Names</Link>
            </div>
          }
          trigger="click"
          visible={visible}
          onVisibleChange={handleVisibleChange}
        >
          <PrinterOutlined style={{ color: data?.color }} />
        </Popover>
      ]}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <p style={{ marginRight: '4px', fontWeight: 'bold', color: data?.color }}>Event:</p>
          <p style={{ color: data?.color }}> {data.eventName}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <p style={{ marginRight: '4px', fontWeight: 'bold', color: data?.color }}>Hotel:</p>
          <p style={{ color: data?.color }}> {data.hotelName}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <p style={{ marginRight: '4px', fontWeight: 'bold', color: data?.color }}>From:</p>
          <p style={{ color: data?.color }}> {moment(data.startDate).format('yyyy/MM/DD')}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <p style={{ marginRight: '4px', fontWeight: 'bold', color: data?.color }}>To:</p>
          <p style={{ color: data?.color }}> {moment(data.endDate).format('yyyy/MM/DD')}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <p style={{ marginRight: '4px', fontWeight: 'bold', color: data?.color }}>Duration:</p>
          <p style={{ color: data?.color }}>{(moment(data?.endDate).diff(moment(data?.startDate), 'd'))}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <p style={{ marginRight: '4px', fontWeight: 'bold', color: data?.color }}>Remaining Rooms:</p>
          <p style={{ color: data?.color }}>{data?.remainingRooms}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <p style={{ marginRight: '4px', fontWeight: 'bold', color: data?.color }}>Remaining Chairs:</p>
          <p style={{ color: data?.color }}>{data?.remainingChairs}</p>
        </div>
      </div >
      <UpdateEventModal editable={editable} visible={updateUserModalVisible} handleCancel={() => closeEditUserModal()} />
      <GeneralModal visible={openDeleteModal}
        handleCancel={() => closeDeleteModal()}
        deleteAction={() => deleteAction()}
      />

    </Card >
  );
}

export default ShowEvents;