import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { InputField, Button, SelectField } from '../inputs';
import Loader from '../../components/utility/loader';
import ClientsForm from './clientsForm';
import booksActions from '../../redux/book/actions';
import clientsActions from '../../redux/clients/actions';
import BusPlaces from './busPlaces';

const { createBook, getBooks, flushBooks } = booksActions;
const { clearSearchClients } = clientsActions;

const BookForm = ({ salesManList, event }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(({ books }) => books.isLoading);
  const savedClients = useSelector(({ clients }) => clients.savedClients);
  const searchClients = useSelector(({ clients }) => clients.searchClients);

  const books = useSelector(({ books }) => books.books);
  const [chairs, setChairs] = useState([])
  const [selectedChairs, setSelectedChairs] = useState([])

  const [options] = useState(salesManList?.map((item) => ({ id: item?.internalId, value: item?.username })));
  const { handleSubmit, control, formState, errors, watch } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      bookOwner: '', bookPhone: '', numberOfClients: '', numberOfRooms: '',
      totalPrice: '', paymentMethod: '', paid: '', saleMan: ''
    },
  });

  useEffect(() => {
    dispatch(clearSearchClients())
  }, [watch('numberOfClients'), dispatch])

  useEffect(() => {
    dispatch(getBooks(event))
    return () => {
      dispatch(flushBooks());
    };
  }, [event, dispatch])

  useEffect(() => {
    books.map(item => {
      if (item.numberOfChairs !== null) {
        setChairs(item.numberOfChairs.split(','))
      }
    })
  }, [books])

  const onSubmit = (values) => {
    dispatch(createBook({
      ...values,
      clients: [...savedClients, ...searchClients],
      event: event,
      remainingMoney: values.totalPrice - values.paid,
      numberOfChairs: selectedChairs.length === 0 ? null : selectedChairs.join(','),
      type: 'normal'

    }))
  };

  return (
    <>
      {isLoading && <Loader />}
      <form className="col-12" onSubmit={handleSubmit(onSubmit)} style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
      }}>
        <div style={{ flex: '1 0 21%', margin: '10px' }} >
          <div className="form-group col-12 col-lg-5" style={{ width: '100%' }}>
            <Controller
              as={InputField}
              control={control}
              label="Book Owner"
              name="bookOwner"
              errors={errors}
              rules={{ required: 'Required Field' }}
            />
          </div>
        </div>
        <div style={{ flex: '1 0 21%', margin: '10px' }} >
          <div className="form-group col-12 col-lg-5" style={{ width: '100%' }}>
            <Controller
              as={InputField}
              control={control}
              label="Book Phone"
              name="bookPhone"
              type="number"
              errors={errors}
              rules={{ required: 'Required Field', maxLength: { value: 11, message: "wrong Phone number Format" }, minLength: { value: 11, message: "wrong Phone number Format" } }}
            />
          </div>
        </div>
        <div style={{ flex: '1 0 21%', margin: '10px' }}>
          <div className="form-group col-12 col-lg-5" style={{ width: '100%' }}>
            <Controller
              as={InputField}
              control={control}
              label="Number Of Clients"
              name="numberOfClients"
              type="number"
              errors={errors}
              rules={{
                required: 'Required Field',
              }}
            />
          </div>
        </div>
        <div style={{ flex: '1 0 21%', margin: '10px' }}  >
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
        <div style={{ flex: '1 0 21%', margin: '10px' }}>
          <div className="form-group col-12 col-lg-5" style={{ width: '100%' }}>
            <Controller
              as={InputField}
              control={control}
              label="Total Price"
              name="totalPrice"
              type="number"
              errors={errors}
              rules={{
                required: 'Required Field',
              }}
            />
          </div>
        </div>
        <div style={{ flex: '1 0 21%', margin: '10px' }}>
          <div className="form-group col-12 col-lg-5" style={{ width: '100%' }}>
            <Controller
              as={InputField}
              control={control}
              label="Paid Money"
              name="paid"
              type="number"
              errors={errors}
              rules={{
                required: 'Required Field',
              }}
            />
          </div>
        </div>
        <div style={{ flex: '1 0 21%', margin: '10px' }}  >
          <div className="form-group col-12 col-lg-5" style={{ width: '100%' }}>
            <Controller
              as={SelectField}
              control={control}
              label="Sales:"
              name="salesMan"
              errors={errors}
              options={options}
            />
          </div>
        </div>

        <div style={{ flex: '1 0 21%', margin: '10px' }}  >
          <div className="form-group col-12 col-lg-5" style={{ width: '100%' }}>
            <Controller
              as={SelectField}
              control={control}
              label="Payment Method:"
              name="paymentMethod"
              errors={errors}
              rules={{
                required: 'Required Field',
              }}
              options={[{ id: 'Cash', value: 'Cash' }, { id: 'Vissa', value: 'Vissa' }, { id: 'Vodafone Cash', value: 'Vodafone Cash' }]}
            />
          </div>
        </div>
        <Divider />
        <div style={{ width: '80%', }}>
          <ClientsForm numberOfClients={watch('numberOfClients')} />
          <BusPlaces chairs={chairs} selectedChairs={selectedChairs} setSelectedChairs={setSelectedChairs} />
          <div className="col-12 " style={{ marginTop: '5px' }}>
            <Button htmlType="submit" type="primary" disabled={!formState.isValid}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default BookForm;
