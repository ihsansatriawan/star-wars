import { SET_MESSAGE, CHANGE_PERSONS, CHANGE_LOADED } from '../types/app';

export const setMessage = message => (dispatch) => {
  dispatch({
    type: SET_MESSAGE,
    payload: {
      message,
    },
  });
};

export const changePersons = ({ list, nextUrl }) => (dispatch) => {
  dispatch({
    type: CHANGE_PERSONS,
    payload: {
      list,
      nextUrl,
    },
  });
};

export const changeIsDataLoaded = ({ isDataLoaded }) => (dispatch) => {
  dispatch({
    type: CHANGE_LOADED,
    payload: {
      isDataLoaded,
    },
  });
};
