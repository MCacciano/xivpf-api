import React from 'react';
import { Formik, Form as FormikForm } from 'formik';

const Form = ({
  initialValues,
  validaitonSchema,
  onSubmit,
  label = '',
  className = '',
  children
}) => {
  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validaitonSchema}>
      {formik => {
        console.log('formik :>> ', formik);
        return (
          <FormikForm className={className}>
            <div className="flex justify-center">
              <h1 className="text-3xl font-medium">{label}</h1>
            </div>
            {children}
          </FormikForm>
        );
      }}
    </Formik>
  );
};

export default Form;
