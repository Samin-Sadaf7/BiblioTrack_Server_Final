import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React from 'react';
const Input = ({ name, handleChange, label, autoFocus, type, handleShowPassword, half }) => {
    const [showPassword, setShowPassword] = React.useState(false);
  
    const handlePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };
  
    return (
      <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField
          name={name}
          onChange={handleChange}
          variant="outlined"
          required
          fullWidth
          label={label}
          autoFocus={autoFocus}
          type={showPassword ? 'text' : type}
          InputProps={
            name === 'password'
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handlePasswordVisibility}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              : {}
          }
        />
      </Grid>
    );
  };
  
  export default Input;
  