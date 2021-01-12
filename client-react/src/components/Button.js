import React from 'react';

const Button = ({ type = 'button', className = '', children, ...props }) => {
  return (
    <button
      type={type}
      className={`p-1 mb-2 border border-black rounded shadow bg-black text-white text-sm font-medium font-rubik ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
