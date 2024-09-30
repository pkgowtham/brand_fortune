import { combineReducers } from 'redux';
import { ACTION_TYPE } from '../../constant/actionType';

// import authenticateReducer from "../../services/Authentication/Reducer";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../../service/auth/reducer';
import projectReducer from '../../service/project/reducer';
import internalReducer from '../../service/internal/reducer';




const config = {
  key: 'auth',
  storage,
  // whitelist: ['auth'],
};



const appReducer = combineReducers({
  // style:styleReducer,
  auth:persistReducer(config,authReducer), 
  project:projectReducer,
  internal: internalReducer,
  
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
