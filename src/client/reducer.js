import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

function SGFReducer(state={}, action) {
  switch (action.type) {
    default:
      return state;
  };
};

export default combineReducers({
  router: routerStateReducer,
  SGF: SGFReducer
});
