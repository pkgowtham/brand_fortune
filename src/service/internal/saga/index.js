// import { put, call, takeLatest } from "redux-saga/effects";
// import { ACTION_TYPE } from "../../../constant/actionType";
// import { uploadFileApi } from "./api";

// function* workerUploadFile(action) {
//   yield put({ type: ACTION_TYPE.UPLOAD_FILE_PENDING });
//   try {
//     const data = yield call(uploadFileApi, action.payload.data);
//     yield put({
//       type: ACTION_TYPE.UPLOAD_FILE_FULFILLED,
//       payload: { data: data.data },
//     });
//   } catch (error) {
//     yield put({
//       type: ACTION_TYPE.UPLOAD_FILE_REJECTED,
//       payload: { error: error },
//     });
//   }
// }



// export function* watchHsn() {
//   console.log("Im here");
//   yield takeLatest(ACTION_TYPE.GET_HSN_SAGA, workerHsn);
// }

