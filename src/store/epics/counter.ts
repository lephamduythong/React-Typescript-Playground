/* eslint-disable prettier/prettier */
import { Epic, ofType } from 'redux-observable';
import { delay, mapTo, map } from 'rxjs/operators';
import * as actionTypes from '../actionTypes';

export const increaseEpic: Epic = action$ =>
  action$.pipe(
    ofType(actionTypes.CLGT),
    map(value => {
      console.log(value);
      return {
        ...value,
        type: actionTypes.TOGGLE_PROCESSING,
      };
    }),
    delay(2000),
    mapTo({ type: actionTypes.TOGGLE_PROCESSING }),
    mapTo({ type: actionTypes.INCREASE }),
  );
