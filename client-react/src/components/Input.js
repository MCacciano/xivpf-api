import React from 'react';

const Input = ({ type = 'text', className = '', id = '', label = '', ...props }) => {
  return (
    <label htmlFor={id} className="flex flex-col my-2">
      {label}
      <input
        id={id}
        type={type}
        className={`border border-gray-500 rounded shadow p-1 ${className}`}
        {...props}
      />
    </label>
  );
};

export default Input;
