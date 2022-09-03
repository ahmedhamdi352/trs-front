import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import clientActions from '../../redux/clients/actions';
import { useDispatch, useSelector } from 'react-redux';
import { InputField, Button } from '../inputs';

const SearchForm = ({ setFound, setSearchPhone }) => {
  const dispatch = useDispatch();
  const { clientSearch } = clientActions;
  const { isLoading } = useSelector(({ clients }) => {
    return {
      isLoading: clients.isLoading,
    }
  });

  const { handleSubmit, control, formState, errors, reset } = useForm({
    defaultValues: { phone: '' },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = (values) => {
    setSearchPhone(values?.phone)
    dispatch(clientSearch(values?.phone))
    setFound(false)
    reset()
  }
  return (
    <form className="row" onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="col-12 col-lg-6">
        <div className="form-group">
          <Controller
            as={InputField}
            control={control}
            label="Phone Number:"
            name="phone"
            type="number"
            errors={errors}
            rules={{ required: 'Required Field', maxLength: { value: 11, message: "wrong Phone number Format" }, minLength: { value: 11, message: "wrong Phone number Format" } }}
          />
        </div>
      </div>
      <div style={{ marginTop: '8px' }}>
        <Button onClick={handleSubmit(onSubmit)} type="primary" style={{ display: 'flex' }} disabled={!formState.isValid} loading={isLoading}>
          Search
        </Button>
      </div>
    </form>
  )
}

export default SearchForm;
