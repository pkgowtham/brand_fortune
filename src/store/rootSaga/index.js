import { all } from '@redux-saga/core/effects';
import { watchLoginUser } from '../../service/auth/saga';
import { watchCreateProject, watchDeleteProject, watchGetListProject, watchUpdateProject } from '../../service/project/saga';

export default function* rootSaga() {
  yield all([
    watchLoginUser(),
    watchCreateProject(),
    watchUpdateProject(),
    watchGetListProject(),
    watchDeleteProject()

    
  ]);
}
