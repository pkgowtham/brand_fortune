import { put,call,takeLatest } from 'redux-saga/effects'
import { ACTION_TYPE } from '../../../constant/actionType';
import { createQueryApi, deleteQueryApi, getQueryApi, updateQueryApi } from './api';


function* workerCreateQuery(action){
    yield put({type:ACTION_TYPE.CREATE_QUERY_PENDING})
    try {
        const data = yield call(createQueryApi,action.payload.data);
        yield put({type:ACTION_TYPE.CREATE_QUERY_FULFILLED,payload:{data:data.data}})
    } catch (error) {
        yield put({type:ACTION_TYPE.CREATE_QUERY_REJECTED,payload:{error:error}})
    }
}

function* workerUpdateQuery(action){
    yield put({type:ACTION_TYPE.UPDATE_QUERY_PENDING})
    try {
        const data = yield call(updateQueryApi,action.payload.data);
        yield put({type:ACTION_TYPE.UPDATE_QUERY_FULFILLED,payload:{data:data.data}})
    } catch (error) {
        yield put({type:ACTION_TYPE.UPDATE_QUERY_REJECTED,payload:{error:error}})
    }
}

function* workerDeleteQuery(action){
    yield put({type:ACTION_TYPE.DELETE_QUERY_PENDING})
    try {
        const data = yield call(deleteQueryApi,action.payload.data);
        yield put({type:ACTION_TYPE.DELETE_QUERY_FULFILLED,payload:{data:data.data}})
    } catch (error) {
        yield put({type:ACTION_TYPE.DELETE_QUERY_REJECTED,payload:{error:error}})
    }
}

function* workerGetListQuery(action){
    yield put({type:ACTION_TYPE.GET_LIST_QUERY_PENDING})
    try {
        const data = yield call(getQueryApi,action.payload.data);
        yield put({type:ACTION_TYPE.GET_LIST_QUERY_FULFILLED,payload:{data:data.data}})
    } catch (error) {
        yield put({type:ACTION_TYPE.GET_LIST_QUERY_REJECTED,payload:{error:error}})
    }
}



export function* watchCreateQuery(){
    yield takeLatest(ACTION_TYPE.CREATE_QUERY_SAGA, workerCreateQuery)
}

export function* watchUpdateQuery(){
    yield takeLatest(ACTION_TYPE.UPDATE_QUERY_SAGA, workerUpdateQuery)
}

export function* watchDeleteQuery(){
    yield takeLatest(ACTION_TYPE.DELETE_QUERY_SAGA, workerDeleteQuery)
}

export function* watchGetListQuery(){
    yield takeLatest(ACTION_TYPE.GET_LIST_QUERY_SAGA, workerGetListQuery)
}

