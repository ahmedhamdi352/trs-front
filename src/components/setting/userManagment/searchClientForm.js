import React from 'react';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import clientsActions from '../../../redux/clients/actions';
import { InputField, Button } from '../../inputs';

const { allClientSearch } = clientsActions;

const SearchClientForm = ({ handleCancel }) => {
  const dispatch = useDispatch();
  const { handleSubmit, control, formState, errors, reset } = useForm({
    defaultValues: { phone: '' },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = (values) => {
    dispatch(allClientSearch(values?.phone));
    reset();
    handleCancel();
  };
  return (
    <form className="row" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-12 col-lg-6">
        <div className="form-group">
          <Controller
            as={InputField}
            control={control}
            label="Phone:"
            name="phone"
            type="number"
            errors={errors}
            rules={{ required: 'Required Field' }}
          />
        </div>
      </div>
      <div className="col-12 ">
        <Button htmlType="submit" type="primary" disabled={!formState.isValid}>
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchClientForm;
