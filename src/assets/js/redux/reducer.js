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
    case 'DELETE_REQUEST':
      return {
        isDeleting:true,
        ...state
      }
    default:
      return state;
  }
}


//combine reducers
const reducer = combineReducers({contacts});

export default reducer;
