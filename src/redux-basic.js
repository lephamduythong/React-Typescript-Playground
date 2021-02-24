/* eslint-disable prettier/prettier */
import { createStore } from 'redux';

const initialState = {
    counter: 0,
}

// Reducer
const rootReducer = (state = initialState, action) => {
    if (action.type === 'INC_COUNTER') {
        return {
            ...state,
            counter: state.counter + 1,
        }
    }
    if (action.type === 'ADD_COUNTER') {
        return {
            ...state,
            counter: state.counter + action.value,
        }
    } 
    return state;
}

// Store
const store = createStore(rootReducer);
console.log(store.getState());

// Subscription: any dispatching will fire this
store.subscribe(() => {
    console.log('[Subcription]', store.getState());
});

// Dispatching action
store.dispatch({type: 'INC_COUNTER'})
store.dispatch({type: 'ADD_COUNTER', value: 10})
console.log(store.getState());