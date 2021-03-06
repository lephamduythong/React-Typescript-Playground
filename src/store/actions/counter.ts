/* eslint-disable prettier/prettier */
import * as actionTypes from '../actionTypes';

export const toggleLoading = () => {
  return {
    type: actionTypes.TOGGLE_PROCESSING,
  };
};

export const increase = () => {
  return {
    type: actionTypes.INCREASE,
  };
};

export const decrease = () => {
  return {
    type: actionTypes.DECREASE,
  };
};

// data transforming logic, dont use too much in this
export const add = (value: number) => {
  return {
    type: actionTypes.ADD,
    value: value,
  };
};

// Use async code with 'redux-thunk' middleware
export const delayedIncreaseThunk = () => {
  return dispatch => {
    dispatch(toggleLoading());
    setTimeout(() => {
      dispatch(toggleLoading());
      dispatch(increase());
    }, 2000);
  };
};

export const delayedIncreaseSaga = () => {
  return {
    type: actionTypes.INCREASE_SAGA
  }
}

export const delayedIncreaseEpic = () => {
  return {
    type: actionTypes.INCREASE_EPIC
  }
}