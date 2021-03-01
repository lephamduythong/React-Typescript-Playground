/* eslint-disable prettier/prettier */
import { delay, put, takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';

export function* delayedIncreaseSaga() {
  console.log('co chac yeu la day');
  yield put({
    type: actionTypes.TOGGLE_PROCESSING,
  });
  yield delay(2000);
  yield put({
    type: actionTypes.TOGGLE_PROCESSING,
  });
  yield put({
    type: actionTypes.INCREASE,
  });
}
