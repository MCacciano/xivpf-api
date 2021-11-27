import React from 'react';
import { useField } from 'formik';

const Input = ({ label = '', className = '', ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label className="flex flex-col" htmlFor={props.id || props.name}>
        <span className="text-sm font-medium">{label}</span>
        <input
          {...field}
          {...props}
          className={`border border-gray-400 p-1 rounded ${className}`}
        />
        {meta.touched && meta.error ? (
          <div className="text-red-600 text-sm italic">{meta.error}</div>
        ) : null}
      </label>
    </>
  );
};

export default Input;
