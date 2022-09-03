import React from 'react';
import GeneralInfo from './roomSteps/generalInfo';
import './style.css';


const BookRoom = (props) => {
  const { eventId } = props.match.params;
  return (
    <>
      <GeneralInfo event={eventId} />
    </>
  );
};

export default BookRoom;