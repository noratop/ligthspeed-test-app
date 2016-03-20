import {combineReducers} from 'redux';

const initialState = {
  isFetching:false,
  isDeleting:false,
  isSyncing:false,
  sort:'firstname'
}

function contacts(state=initialState,action){
  switch (action.type) {
    case 'REQUEST_CONTACTS':
      return {
        ...state,
        isFetching: true
      };
      break;
    case 'SUCCESS_CONTACTS':
      return {
        ...state,
        isFetching:false,
        isDeleting:false,
        isSyncing:false,
        result:action.result
      };
      break;
    case 'FAILURE_CONTACTS':
      return {
        ...state,
        isFetching:false,
        isDeleting:false,
        isSyncing:false,
        error: action.error
      };
      break;
    case 'CHECK_CONTACT':
      return {
        ...state,
        result:action.result
      }
      break;
    case 'DELETE_REQUEST':
      return {
        ...state,
        isDeleting:true
      }
      break;
    case 'SYNC_CONTACTS':
      return {
        ...state,
        isFetching:false,
        isDeleting:false,
        isSyncing:true
      }
      break;
    case 'SORT_CONTACTS':
      return {
        ...state,
        sort:action.sort
      }
      break;
    default:
      return state;
  }
}


//combine reducers
const reducer = combineReducers({contacts});

export default reducer;
