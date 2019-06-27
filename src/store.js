/* eslint-disable no-underscore-dangle,no-undef */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import app from './reducers/app';

const reducer = combineReducers({
  app,
});

const DEV = process.env.NODE_ENV !== 'production';
const store = createStore(
  reducer,
  DEV && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
);

export default store;
