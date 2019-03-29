import React, { useState, useEffect } from 'react';
import validator from 'validator';

import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';

import useStyles from './loginDialog/LoginDialog.styles';
import useTextField from '../../hooks/useTextField';
import usePasswordField from '../../hooks/usePasswordField';

import { registerActions } from '../../services/register';

const RegisterDialog = props => {
  const {
    isOpen,
    toggleDialog,
    register,
    registerState,
    authState,
    reset
  } = props;

  const { t } = useTranslation();

  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const usernameFieldProps = useTextField('');
  const [usernameFieldClientError, setUsernameFieldClientError] = useState('');

  const nameFieldProps = useTextField('');
  const [nameFieldClientError, setNameFieldClientError] = useState('');

  const passwordFieldProps = usePasswordField('');
  const [passwordFieldClientError, setPasswordFieldClientError] = useState('');

  useEffect(() => {
    if (!validator.isEmpty(usernameFieldProps.value)) {
      setUsernameFieldClientError('');
    }

    if (!validator.isEmpty(nameFieldProps.value)) {
      setNameFieldClientError('');
    }

    if (!validator.isEmpty(passwordFieldProps.value)) {
      setPasswordFieldClientError('');
    }
  }, [
    usernameFieldProps.value,
    nameFieldProps.value,
    passwordFieldProps.value
  ]);

  useEffect(() => {
    if (authState.isAuthenticated) {
      toggleDialog(false)();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.isAuthenticated]);

  useEffect(() => {
    if (isOpen) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const onFormSubmit = e => {
    e.preventDefault();

    let shouldRegister = true;

    setUsernameFieldClientError('');
    setNameFieldClientError('');
    setPasswordFieldClientError('');

    if (validator.isEmpty(usernameFieldProps.value)) {
      setUsernameFieldClientError('Username is required.');
      shouldRegister = false;
    }

    if (validator.isEmpty(nameFieldProps.value)) {
      setNameFieldClientError('Name is required.');
      shouldRegister = false;
    }

    if (validator.isEmpty(passwordFieldProps.value)) {
      setPasswordFieldClientError('Password is required.');
      shouldRegister = false;
    }

    if (shouldRegister) {
      register({
        username: usernameFieldProps.value,
        name: nameFieldProps.value,
        password: passwordFieldProps.value
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={toggleDialog(false)}
      aria-labelledby="register-form-dialog-title"
      fullScreen={isMobile}
      PaperProps={{
        className: classes.dialogPaper
      }}
    >
      <DialogTitle id="register-form-dialog-title">{t('Register')}</DialogTitle>
      <form name="register-form" noValidate onSubmit={onFormSubmit}>
        <DialogContent>
          <Grid container direction="column">
            <Grid item xs={12}>
              <TextField
                required
                label={t('Username')}
                {...usernameFieldProps}
                margin="normal"
                variant="outlined"
                name="username"
                error={
                  !!usernameFieldClientError || !!registerState.error.username
                }
                helperText={
                  usernameFieldClientError || '' || registerState.error.username
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label={t('Name')}
                {...nameFieldProps}
                margin="normal"
                variant="outlined"
                name="name"
                error={!!nameFieldClientError || !!registerState.error.name}
                helperText={
                  nameFieldClientError || '' || registerState.error.name
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label={t('Password')}
                {...passwordFieldProps}
                margin="normal"
                variant="outlined"
                name="password"
                error={
                  !!passwordFieldClientError || !!registerState.error.password
                }
                helperText={
                  passwordFieldClientError || '' || registerState.error.password
                }
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="reset" onClick={toggleDialog(false)} color="primary">
            {t('Close')}
          </Button>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={registerState.isLoading}
          >
            {t('Register')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const mapStateToProps = state => ({
  registerState: state.registration,
  authState: state.auth
});

const mapDispatchToProps = dispatch => ({
  register: registerData =>
    dispatch(registerActions.register.pending(registerData)),
  reset: () => dispatch(registerActions.registerForm.reset())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterDialog);