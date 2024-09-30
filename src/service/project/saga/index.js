import { put,call,takeLatest } from 'redux-saga/effects'
import { ACTION_TYPE } from '../../../constant/actionType';
import { createProjectApi, deleteProjectApi, getProjectApi, updateProjectApi } from './api';


function* workerCreateProject(action){
    yield put({type:ACTION_TYPE.CREATE_PROJECT_PENDING})
    try {
        const data = yield call(createProjectApi,action.payload.data);
        yield put({type:ACTION_TYPE.CREATE_PROJECT_FULFILLED,payload:{data:data.data}})
    } catch (error) {
        yield put({type:ACTION_TYPE.CREATE_PROJECT_REJECTED,payload:{error:error}})
    }
}

function* workerUpdateProject(action){
    yield put({type:ACTION_TYPE.UPDATE_PROJECT_PENDING})
    try {
        const data = yield call(updateProjectApi,action.payload.data);
        yield put({type:ACTION_TYPE.UPDATE_PROJECT_FULFILLED,payload:{data:data.data}})
    } catch (error) {
        yield put({type:ACTION_TYPE.UPDATE_PROJECT_REJECTED,payload:{error:error}})
    }
}

function* workerDeleteProject(action){
    yield put({type:ACTION_TYPE.DELETE_PROJECT_PENDING})
    try {
        const data = yield call(deleteProjectApi,action.payload.data);
        yield put({type:ACTION_TYPE.DELETE_PROJECT_FULFILLED,payload:{data:data.data}})
    } catch (error) {
        yield put({type:ACTION_TYPE.DELETE_PROJECT_REJECTED,payload:{error:error}})
    }
}

function* workerGetListProject(action){
    yield put({type:ACTION_TYPE.GET_LIST_PROJECT_PENDING})
    try {
        const data = yield call(getProjectApi,action.payload.data);
        yield put({type:ACTION_TYPE.GET_LIST_PROJECT_FULFILLED,payload:{data:data.data}})
    } catch (error) {
        yield put({type:ACTION_TYPE.GET_LIST_PROJECT_REJECTED,payload:{error:error}})
    }
}



export function* watchCreateProject(){
    yield takeLatest(ACTION_TYPE.CREATE_PROJECT_SAGA, workerCreateProject)
}

export function* watchUpdateProject(){
    yield takeLatest(ACTION_TYPE.UPDATE_PROJECT_SAGA, workerUpdateProject)
}

export function* watchDeleteProject(){
    yield takeLatest(ACTION_TYPE.DELETE_PROJECT_SAGA, workerDeleteProject)
}

export function* watchGetListProject(){
    yield takeLatest(ACTION_TYPE.GET_LIST_PROJECT_SAGA, workerGetListProject)
}

