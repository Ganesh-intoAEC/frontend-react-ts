import React, { useState, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

interface CustomTextFieldProps {
  label: string;
}

const CustomInputText: React.FC<CustomTextFieldProps> = ({ label, ...props }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, "");
    setInputValue(event.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <TextField
      {...props}
      variant="standard"
      helperText=" "
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">₹</InputAdornment>
        ),
        inputProps: {
          pattern: "^[0-9]*$", // This pattern allows only numbers
        },
      }}
      InputLabelProps={{
        shrink: inputValue !== '' || isFocused,
        style: {
          paddingLeft: isFocused ? '0' : '20px',
          transition: 'padding 0.2s',
        },
      }}
      label={label}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleInputChange}
      value={inputValue}
    />
  );
};

export default CustomInputText;
