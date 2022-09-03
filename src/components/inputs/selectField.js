import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';
import ErrorMessage from './errorMessage';
import './style.css'
class SelectField extends React.Component {
  render() {
    const { name, label, errors, options } = this.props;
    const errorMessage = errors[name] ? errors[name].message : '';
    const validateStatus = errorMessage ? 'error' : '';
    return (
      <Form.Item label={label || ''} validateStatus={validateStatus} help={<ErrorMessage name={name || 'NULL'} errors={errors || {}} />}
        style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column' }}
      >
        <Select {...this.props} >
          {options &&
            options.map(({ id, label, value, data }) => {
              return (
                <Select.Option key={id} value={id}>
                  {value || data}
                </Select.Option>
              );
            })}
        </Select>
      </Form.Item>
    );
  }
}

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
};
export default SelectField;
