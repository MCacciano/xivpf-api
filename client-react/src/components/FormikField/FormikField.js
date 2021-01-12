import React from 'react';
import { Field } from 'formik';

import Input from '../Input';

const FormikField = ({ control = 'text', ...props }) => {
  switch (control.toUpperCase()) {
    case 'TEXT':
      return (
        <Field {...props}>
          {({ field }) => {
            return <Input {...field} {...props} />;
          }}
        </Field>
      );
    default:
      return null;
  }
};

export default FormikField;
