import createAsyncTypes from '../../utils/redux/createAsyncTypes';

const LOGIN_ASYNC = createAsyncTypes('LOGIN');
const REGISTER_ASYNC = createAsyncTypes('REGISTER');
const LOGIN_FORM = { RESET: 'LOGIN_FORM_RESET' };
const CURRENT_USER = { SET: 'SET_CURRENT_USER', LOGOUT: 'LOGOUT_CURRENT_USER' };

export { LOGIN_ASYNC, REGISTER_ASYNC, LOGIN_FORM, CURRENT_USER };