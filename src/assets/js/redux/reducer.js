import {combineReducers} from 'redux';

function contacts(state={isFetching:false},action){
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
        ...state,
        isDeleting:true
      }
      break;
    case 'REFRESH_CONTACTS':
      return {
        ...state,
        isDeleting:false,
        isRefreshing:true
      }
      break;
    default:
      return state;
  }
}


//combine reducers
const reducer = combineReducers({contacts});

export default reducer;
