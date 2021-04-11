import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  adornedEnd: {
    paddingRight: 0
  },
  button: {
    marginRight: theme.spacing(0.5)
  }
}));

const useTogglePasswordVisibility = () => {
  const [shouldShowPassword, setShouldShowPassword] = useState(false);

  const classes = useStyles();

  const handleToggleShowPassword = () => {
    setShouldShowPassword(!shouldShowPassword);
  };

  return {
    type: !shouldShowPassword ? 'password' : 'text',
    InputProps: {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            className={classes.button}
            aria-label="Toggle password visibility"
            onClick={handleToggleShowPassword}
          >
            {shouldShowPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ),
      classes: {
        adornedEnd: classes.adornedEnd
      }
    }
  };
};

export default useTogglePasswordVisibility;
