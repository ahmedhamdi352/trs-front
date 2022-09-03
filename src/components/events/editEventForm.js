import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import eventsActions from '../../redux/events/actions';
import { InputField, Button, SwitchField, DatePickerField, SelectField } from '../inputs';
import moment from 'moment';
import { isEmpty } from '../../helpers/utility';

const { updateEvent } = eventsActions;

const UserForm = ({ eventId, defaultValues, eventData }) => {
  const { loading } = useSelector(({ events }) => events.isLoading);
  const booksData = useSelector(({ books }) => books.books);


  const dispatch = useDispatch();
  const { handleSubmit, control, formState, errors, reset } = useForm({
    defaultValues: {
      eventName: '', hotelName: '', startDate: '', endDate: '', busOnly: true,
      roomOnly: '', numberOfBuses: '', numberOfRooms: ''
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (defaultValues) {
      reset({ ...defaultValues, startDate: moment(defaultValues?.startDate), endDate: moment(defaultValues?.endDate) });
    }
  }, [defaultValues, reset]);

  const onSubmit = (values) => {
    console.log(booksData)
    let totalClients = 0;
    let totalRooms = 0;
    if (!isEmpty(booksData)) {
      booksData.map(item => {
        console.log(item)
        totalClients += item.numberOfClients;
        totalRooms += item.numberOfRooms;
      })
    }
    console.log(totalRooms)
    dispatch(updateEvent(eventId, {
      ...values,
      remainingRooms: values?.numberOfRooms - totalRooms,
      remainingChairs: (values?.numberOfBuses * 48) - totalClients,
      color: eventData?.color
    }));
  };
  return (
    <form className="row" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-12 col-lg-6">
        <div className="form-group">
          <Controller
            as={InputField}
            control={control}
            label="Event Name:"
            name="eventName"
            type="text"
            errors={errors}
            rules={{ required: 'Required Field' }}
          />
        </div>
      </div>
      <div className="col-12 col-lg-6">
        <div className="form-group">
          <Controller
            as={InputField}
            control={control}
            label="Hotel Name:"
            name="hotelName"
            type="text"
            errors={errors}
            rules={{ required: 'Required Field' }}
          />
        </div>
      </div>
      <div className="col-12 col-lg-6">
        <div className="form-group">
          <Controller
            as={InputField}
            control={control}
            label="number of buses:"
            name="numberOfBuses"
            type="number"
            errors={errors}
            rules={{ required: 'Required Field' }}
          />
        </div>
      </div>
      <div className="col-12 col-lg-6">
        <div className="form-group">
          <Controller
            as={InputField}
            control={control}
            label="Number of rooms:"
            name="numberOfRooms"
            type="number"
            errors={errors}
            rules={{ required: 'Required Field' }}
          />
        </div>
      </div>
      <div className="col-12 col-lg-6">
        <div className="form-group">
          <Controller
            as={DatePickerField}
            control={control}
            label="Start Date:"
            name="startDate"
            errors={errors}
            rules={{ required: 'Required Field' }}
          />
        </div>
      </div>
      <div className="col-12 col-lg-6">
        <div className="form-group">
          <Controller
            as={DatePickerField}
            control={control}
            label="End Date:"
            name="endDate"
            errors={errors}
            rules={{ required: 'Required Field' }}
          />
        </div>
      </div>
      <div className="form-group col-12 col-lg-5" style={{ width: '100%', margin: '10px' }}>
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

      <div className="col-12 col-lg-6">
        <div className="form-group">
          <Controller as={SwitchField} control={control} label="Bus Only:" name="busOnly" errors={errors} />
        </div>
      </div>
      <div className="col-12 col-lg-6">
        <div className="form-group">
          <Controller as={SwitchField} control={control} label="Room Only:" name="roomOnly" errors={errors} />
        </div>
      </div>
      <div className="col-12 ">
        <Button htmlType="submit" type="primary" disabled={!formState.isValid} loading={loading}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
