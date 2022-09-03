import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { InputField, Button } from '../inputs';
import clientsActions from '../../redux/clients/actions';
import { isEmpty } from '../../helpers/utility';

const { saveClient } = clientsActions;

const AddClientForm = ({ searchPhone }) => {
  const dispatch = useDispatch();
  const [userFound, setUserFound] = useState(false)
  const { searchClients } = useSelector(({ clients }) => {
    return {
      searchClients: clients.searchClients,
    }
  });
  const { handleSubmit, control, formState, errors, reset } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '', address: '', phone: '', userId: ''
    },
  });

  useEffect(() => {
    if (!isEmpty(searchClients.filter(item => item.phone === searchPhone))) {
      setUserFound(true)
      const data = searchClients.filter(item => item.phone === searchPhone)?.[0]
      reset(data);
    }

  }, [searchPhone, searchClients, reset])

  const onSubmit = (values) => {
    dispatch(saveClient(values));
  };

  return (
    <>
      <form className="col-12" onSubmit={handleSubmit(onSubmit)} style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
        <div style={{ flex: '1 0 15%', margin: '10px' }} >
          <div className="form-group col-12 col-lg-5" style={{ width: '100%' }}>
            <Controller
              as={InputField}
              control={control}
              label="Name"
              name="name"
              errors={errors}
              rules={{ required: 'Required Field' }}
              disabled={userFound}
            />
          </div>
        </div>

        <div style={{ flex: '1 0 15%', margin: '10px' }} >
          <div className="form-group col-12 col-lg-5" style={{ width: '100%' }}>
            <Controller
              as={InputField}
              control={control}
              label="Address"
              name="address"
              errors={errors}
              rules={{
                required: 'Required Field',
              }}
              disabled={userFound}
            />
          </div>
        </div>
        <div style={{ flex: '1 0 15%', margin: '10px' }}>
          <div className="form-group col-12 col-lg-5" style={{ width: '100%' }}>
            <Controller
              as={InputField}
              control={control}
              label="Phone"
              name="phone"
              type="number"
              errors={errors}
              disabled={userFound}
              rules={{ required: 'Required Field', maxLength: { value: 11, message: "wrong Phone number Format" }, minLength: { value: 11, message: "wrong Phone number Format" } }}
            />
          </div>
        </div>

        <div style={{ flex: '1 0  15%', margin: '10px' }}  >
          <div className="form-group col-12 col-lg-5" style={{ width: '100%' }}>
            <Controller
              as={InputField}
              control={control}
              label="User Id"
              name="userId"
              type="number"
              errors={errors}
              rules={{ required: 'Required Field' }}
              disabled={userFound}
            />
          </div>
        </div>
        {!userFound && <div style={{ flex: '1 0  10%', margin: '10px' }}>
          <div className="form-group col-4 col-lg-1">
            <Button size="large" onClick={handleSubmit(onSubmit)} type="primary" disabled={!formState.isValid}>
              Save
            </Button>
          </div>
        </div>}
      </form>
      <Divider />
    </>
  );
};

export default AddClientForm;
