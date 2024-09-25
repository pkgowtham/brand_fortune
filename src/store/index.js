import { createStore,applyMiddleware } from'redux'
import  createSagaMiddleware from'redux-saga'
import rootReducer from './rootreducer/index.js'
import { composeWithDevTools } from '@redux-devtools/extension';
import rootSaga from './rootSaga/index.js';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createAxiosAuthMiddleware } from '../axios/axiosMiddleware.js'

const config = {
    key:'root',
    storage,
    whitelist:[],
}

const persistedRootReducer = persistReducer(config,rootReducer)
const sagaMiddleWare = createSagaMiddleware();
const axiosAuth = createAxiosAuthMiddleware();
const middlewares = [sagaMiddleWare,axiosAuth]

const store = createStore(
    persistedRootReducer,
    composeWithDevTools(applyMiddleware(...middlewares)),    
);
const persistor = persistStore(store);   


sagaMiddleWare.run(rootSaga);

export { store,persistor}