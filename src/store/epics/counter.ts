/* eslint-disable prettier/prettier */
import { Epic, ofType } from 'redux-observable';
import { Observable, of, timer } from 'rxjs';
import { concatMap, delay, mapTo, mergeMap, switchMap } from 'rxjs/operators';
import * as actionTypes from '../actionTypes';

export const increaseEpic: Epic = action$ =>
  action$.pipe(
    ofType(actionTypes.INCREASE_EPIC),
    mergeMap(action => {
      return new Observable(observer => {
        observer.next({ type: actionTypes.TOGGLE_PROCESSING });
        new Promise((resolve, reject) => {
          setTimeout(resolve, 2000);
        }).then(value => {
          observer.next({ type: actionTypes.INCREASE });
          observer.next({ type: actionTypes.TOGGLE_PROCESSING });
          observer.complete();
        });
      });
    }),
  );
