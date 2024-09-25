import { put,call,takeLatest } from 'redux-saga/effects'
import { ACTION_TYPE } from '../../../constant/actionType';
import { loginUserApi } from './api';


function* workerLoginUser(action){
    yield put({type:ACTION_TYPE.LOGIN_USER_PENDING})
    try {
        const data = yield call(loginUserApi,action.payload.data);
        yield put({type:ACTION_TYPE.LOGIN_USER_FULFILLED,payload:{data:data.data}})
    } catch (error) {
        yield put({type:ACTION_TYPE.LOGIN_USER_REJECTED,payload:{error:error}})
    }
}



export function* watchLoginUser(){
    console.log("Im here")
    yield takeLatest(ACTION_TYPE.LOGIN_USER_SAGA, workerLoginUser)
}

