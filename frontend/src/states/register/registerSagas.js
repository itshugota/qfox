/* eslint-disable no-console */
import { call, put, takeLatest } from 'redux-saga/effects';

import { REGISTER_ASYNC } from './registerActionTypes';
import registerActions from './registerActions';
import registerRequests from './registerRequests';

import authActions from '../auth/authActions';

import { openSnackbar } from '../../components/Notification';

function* registerUser(action) {
  try {
    yield call(registerRequests.requestRegister, action.payload);

    yield put(registerActions.register.success());
    openSnackbar('Registered successfully. Welcome to QFox.');

    yield put(authActions.login.pending(action.payload));
  } catch (error) {
    console.error(error);
    openSnackbar('Failed to register. Please check your information.');
    yield put(registerActions.register.error(error));
  }
}

function* watchRegisterUser() {
  yield takeLatest(REGISTER_ASYNC.PENDING, registerUser);
}

export default watchRegisterUser;