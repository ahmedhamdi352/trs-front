import React from 'react';
import ShowItem from './card'

const ShowEvents = ({ events, admin }) => {

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      alignItems: 'flex-start'
    }}>
      {events.map(item => <ShowItem data={item} admin={admin} />)}
    </div>
  );
}

export default ShowEvents;