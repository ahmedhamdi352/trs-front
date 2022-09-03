import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import EditEventForm from './editEventForm';
import bookActions from '../../redux/book/actions';

const UserModal = ({ visible, handleCancel, editable }) => {
    const dispatch = useDispatch()
    const { getBooks, flushBooks } = bookActions
    const [defaultValues, setDefaultValues] = useState(null);
    useEffect(() => {
        if (editable) {
            dispatch(getBooks(editable?.internalId));
            return () => {
                dispatch(flushBooks());
            };
        }
    }, [editable, dispatch, getBooks, flushBooks]);

    useEffect(() => {
        if (editable) {
            const {
                eventName,
                hotelName,
                startDate,
                endDate,
                roomOnly,
                busOnly,
                numberOfBuses,
                numberOfRooms,
                typeOfAccommodation
            } = editable;
            setDefaultValues({
                eventName, hotelName, startDate, endDate,
                typeOfAccommodation, roomOnly, busOnly, numberOfBuses, numberOfRooms
            });
        }
    }, [editable]);



    return (
        <Modal title={`Edit ${editable?.eventName} event`} visible={visible} onCancel={handleCancel} footer={null}>
            <EditEventForm eventId={editable?.internalId} defaultValues={defaultValues} eventData={editable} />
        </Modal>
    );
};

export default UserModal;
