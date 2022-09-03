import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Divider } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { InputField, Button, SwitchField, DatePickerField, SelectField } from '../inputs';
import eventsActions from '../../redux/events/actions';
import ColorPicker from '../inputs/colorPicker';
const { createEvent } = eventsActions;

const CreateEventForm = () => {
  const dispatch = useDispatch();
  const { handleSubmit, control, formState, errors, } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      eventName: '', hotelName: '', startDate: '', typeOfAccommodation: '',
      endData: '', numberOfBuses: '', numberOfRooms: '', busOnly: true, roomOnly: true
    },
  });
  const [color, setColor] = useState('#0000')


  const onSubmit = (values) => {
    dispatch(createEvent({
      ...values,
      'remainingRooms': values.numberOfRooms,
      'remainingChairs': 48 * values.numberOfBuses,
      color
    }));
  };

  return (
    <form className="col-12" onSubmit={handleSubmit(onSubmit)} style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      alignItems: 'flex-start'
    }}>
      <div style={{ flex: '0 0 33.333333 %', margin: '10px' }} >
        <div className="form-group col-12 col-lg-5" style={{ width: '100%' }}>
          <Controller
            as={InputField}
            control={control}
            label="Event Name"
            name="eventName"
            errors={errors}
            rules={{ required: 'Required Field' }}
          />
        </div>
      </div>

      <div style={{ flex: '0 0 33.333333 %', margin: '10px' }} >
        <div className="form-group col-12 col-lg-5" style={{ width: '100%' }}>
          <Controller
            as={InputField}
            control={control}
            label="Hotel Name"
            name="hotelName"
            errors={errors}
            rules={{
              required: 'Required Field',
            }}
          />
        </div>
      </div>
      <div style={{ flex: '0 0 33.333333 %', margin: '10px' }}>
        <div className="form-group col-12 col-lg-5" style={{ width: '100%' }}>
          <Controller
            as={InputField}
            control={control}
            label="Number Of Buses"
            name="numberOfBuses"
            type="number"
            errors={errors}
            rules={{
              required: 'Required Field',
            }}
          />
        </div>
      </div>

      <div style={{ flex: '0 0 33.333333 %', margin: '10px' }}  >
        <div className="form-group col-12 col-lg-5" style={{ width: '100%' }}>
          <Controller
            as={InputField}
            control={control}
            label="Number Of Rooms"
            name="numberOfRooms"
            type="number"
            errors={errors}
            rules={{
              required: 'Required Field',
            }}
          />
        </div>
      </div>

      <div style={{ flex: '0 0 33.333333 %', margin: '10px' }} >
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

      <div style={{ flex: '0 0 33.333333 %', margin: '10px' }}  >
        <div className="form-group col-12 col-lg-5" style={{ width: '100%' }}>
          <Controller
            as={DatePickerField}
            control={control}
            label="End Event"
            name="endDate"
            errors={errors}
            rules={{
              required: 'Required Field',
            }}
          />
        </div>
      </div>

      <div className="form-group col-12 col-lg-5" style={{ width: '30%', margin: '10px' }}>
        <Controller
          as={SelectField}
          control={control}
          label="Type of accommodation :"
          name="typeOfAccommodation"
          errors={errors}
          rules={{
            required: 'Required Field',
          }}
          options={[{ id: 'breakfast', value: 'breakfast' }, { id: 'half-board', value: 'half-board' }, { id: 'soft-all', value: 'soft-all' }]}
        />
      </div>

      <div style={{ flex: '0 0 33.333333 %', margin: '10px' }}>
        <div className="form-group">
          <Controller as={SwitchField} control={control} label="Bus only:" name="busOnly" errors={errors} />
        </div>
      </div>

      <div style={{ flex: '0 0 33.333333 %', margin: '10px' }}>
        <div className="form-group">
          <Controller as={SwitchField} control={control} label="Room Only:" name="roomOnly" errors={errors} />
        </div>
      </div>

      <ColorPicker color={color} setColor={setColor} />

      <Divider />
      <div  >
        <div className="form-group col-4 col-lg-1">
          <Button size="large" htmlType="submit" type="primary" disabled={!formState.isValid}>
            Save
          </Button>
        </div>
      </div>
    </form >
  );
};

export default CreateEventForm;
