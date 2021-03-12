/* eslint-disable prettier/prettier */
import { takeEvery } from "redux-saga/effects";
import * as actionTypes from '../actionTypes';
import { delayedIncreaseSaga } from './counter';

export function* watchCounter() {
  yield takeEvery(actionTypes.INCREASE_SAGA, delayedIncreaseSaga);  
}