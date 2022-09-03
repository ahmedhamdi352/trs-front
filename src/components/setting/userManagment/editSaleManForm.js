import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import settingActions from '../../../redux/setting/actions';
import { InputField, Button, SwitchField } from '../../inputs';

const { updateSaleMan } = settingActions;

const UserForm = ({ userId, defaultValues }) => {
    const { loading, } = useSelector(({ setting }) => setting.updateUser);

    const dispatch = useDispatch();
    const { handleSubmit, control, formState, errors, reset } = useForm({
        defaultValues: { firstName: '', lastName: '', username: '', phone: '', isActive: true, percentage: '' },
        mode: 'onChange',
        reValidateMode: 'onChange',
    });

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);
    const onSubmit = (values) => {
        dispatch(updateSaleMan(userId, values));
    };
    return (
        <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-12 col-lg-6">
                <div className="form-group">
                    <Controller
                        as={InputField}
                        control={control}
                        label="First Name:"
                        name="firstName"
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
                        label="Last Name:"
                        name="lastName"
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
                        label="User name:"
                        name="username"
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
                        label="Phone:"
                        name="phone"
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
                        label="Percentage:"
                        name="percentage"
                        type="number"
                        errors={errors}
                        rules={{ required: 'Required Field' }}
                    />
                </div>
            </div>
            <div className="col-12 col-lg-6">
                <div className="form-group">
                    <Controller as={SwitchField} control={control} label="Active:" name="isActive" errors={errors} />
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
