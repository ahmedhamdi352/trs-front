import React, { useState } from 'react';
import AddClientForm from './addClientForm'
import SearchForm from './searchForm';


const AddClientsForm = () => {
  const [found, setFound] = useState(true);
  const [searchPhone, setSearchPhone] = useState('')
  if (found) {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column' }}>
        <SearchForm setFound={(data) => setFound(data)} setSearchPhone={(data) => setSearchPhone(data)} />
      </div>
    )
  }
  else {
    return (
      <AddClientForm searchPhone={searchPhone} />
    );
  }

};

export default AddClientsForm;
