import React from 'react';
import { useDispatch } from 'react-redux';
import { Divider } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { Button, DatePickerField, } from '../inputs';
import eventsActions from '../../redux/events/actions';

const { seachEvent } = eventsActions;

const SeachEventForm = ({ handleCancel }) => {
  const dispatch = useDispatch();
  const { handleSubmit, control, formState, errors, reset } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      startDate: ''
    },
  });

  const onSubmit = (values) => {
    dispatch(seachEvent(values));
    reset()
    handleCancel()
  };

  return (
    <form className="col-12" onSubmit={handleSubmit(onSubmit)} style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      alignItems: 'flex-start'
    }}>
      <div style={{ flex: '1', margin: '10px' }} >
        <div className="form-group col-12 col-lg-5" style={{ width: '100%' }}>
          <Controller
            as={DatePickerField}
            control={control}
            label="Start Event"
            name="startDate"
            errors={errors}
            rules={{
              required: 'Required Field',
            }}
          />
        </div>
      </div>
      <Divider />
      <div  >
        <div className="form-group col-4 col-lg-1">
          <Button size="large" htmlType="submit" type="primary" disabled={!formState.isValid}>
            Search
          </Button>
        </div>
      </div>
    </form >
  );
};

export default SeachEventForm;
