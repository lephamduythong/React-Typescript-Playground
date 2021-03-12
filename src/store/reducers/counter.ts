/* eslint-disable prettier/prettier */
import { HomePageStateProps, HomePageActions } from 'app/containers/HomePage';
import * as actionTypes from '../actionTypes';

const initialState: HomePageStateProps = {
  counter: 0,
  isCounterProcessing: false,
};

// data transforming logic here, mainly
const reducer = (state = initialState, action: HomePageActions) => {
  let returnValue: HomePageStateProps = state;
  switch (action.type) {
    case actionTypes.TOGGLE_PROCESSING:
      console.log('log me 1');
      returnValue = {
        ...state,
        isCounterProcessing: !state.isCounterProcessing,
      };
      return returnValue;
    case actionTypes.INCREASE:
      console.log('log me 2');
      returnValue = {
        ...state,
        counter: state.counter + 1,
      };
      return returnValue;
    case actionTypes.DECREASE:
      returnValue = {
        ...state,
        counter: state.counter - 1,
      };
      return returnValue;
    case actionTypes.ADD:
      returnValue = {
        ...state,
        counter: state.counter + action.value,
      };
      return returnValue;
  }
  return state;
};

export default reducer;
