/* eslint-disable prettier/prettier */
import { combineEpics } from 'redux-observable';
import { increaseEpic } from './counter';

const rootEpics = combineEpics(increaseEpic);

export default rootEpics;