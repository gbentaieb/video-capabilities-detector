import { createStore, combineReducers } from 'redux';

import * as reducers from '../reducers';

const initialState = {};
const reducer = combineReducers(reducers);
const store = createStore(
  reducer,
  initialState,
);

export default store;