import { SET_MESSAGE, CHANGE_PERSONS, CHANGE_LOADED } from '../types/app';
import removeDuplicates from '../helper/array';

const initState = {
  message: '',
  persons: [],
  nextUrl: '',
  isDataLoaded: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return { ...state, message: action.payload.message };
    case CHANGE_PERSONS:
      return {
        ...state,
        persons: removeDuplicates(state.persons.concat(action.payload.list), 'url'),
        nextUrl: action.payload.nextUrl || '',
      };
    case CHANGE_LOADED:
      return {
        ...state,
        isDataLoaded: action.payload.isDataLoaded,
      };
    default:
      return state;
  }
};
