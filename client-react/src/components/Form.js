import React from 'react';

const Form = ({ onSubmit, label = '', className = '', children }) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      <div className="flex justify-center">
        <h1 className="text-3xl font-medium">{label}</h1>
      </div>
      {children}
    </form>
  );
};

export default Form;
