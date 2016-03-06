import {combineReducers} from 'redux';

function contacts(state={},action){
  switch (action.type) {
    case 'REQUEST_CONTACTS':
      return {
        isFetching: true
      };
      break;
    case 'SUCCESS_CONTACTS':
      return {
        result:action.result
      };
      break;
    case 'FAILURE_CONTACTS':
      return {
        error: action.error
      };
      break;
    default:
      return state;
  }
}

function followers(state={},action){
  switch (action.type) {
    case 'REQUEST_FOLLOWERS':
      return {
        isFetching: true
      };
      break;
    case 'SUCCESS_FOLLOWERS':
      return {
        result:action.result
      };
      break;
    case 'FAILURE_FOLLOWERS':
      return {
        error: action.error
      };
      break;
    default:
      return state;
  }
}

//combine reducers
const reducer = combineReducers({contacts,followers});

export default reducer;
