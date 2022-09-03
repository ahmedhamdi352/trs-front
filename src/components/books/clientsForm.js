import React, { useEffect, useState } from 'react'
import AddClientsForm from './clientsFormItem'
const ClientsForm = ({ numberOfClients }) => {
  const [clients, setClients] = useState([])

  useEffect(() => {
    if (numberOfClients) {
      let data = []
      for (let i = 0; i < numberOfClients; i++) {
        data.push(<AddClientsForm />)
      }
      setClients(data)
    }
    else {
      setClients([])
    }
  }, [numberOfClients])

  return (
    <div>
      {clients.map(item => item)}
    </div>
  )
}

export default ClientsForm;