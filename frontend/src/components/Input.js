import React from 'react';

const Input = ({ name, theme, ...rest }) => (
    <input
      name={name}
      { ...rest }
    />
);

export default Input;
