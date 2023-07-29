import { all, call, put, takeLatest } from "redux-saga/effects";

import {
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import { signInFaluer, signInSuccess } from "./user.action";
import { USER_ACTIONS_TYPE } from "./user.type";
// lấy thông tin user từ firebase
export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    yield put(signInSuccess({ id: userSnapshot?.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFaluer(error));
  }
}
// kiểm tra xem đã login chưa
export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFaluer(error));
  }
}
// đăng nhập bằng email
export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const userAuth = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, userAuth?.user);
  } catch (error) {
    yield put(signInFaluer(error));
  }
}

// export function* signUp(email, password) {
// try {

// } catch (error) {

// }
// }

export function* onCheckUserSesstion() {
  yield takeLatest(USER_ACTIONS_TYPE.CHECK_USER_SESSION, isUserAuthenticated);
}
export function* onSignInWithEmail() {
  yield takeLatest(USER_ACTIONS_TYPE.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* userSagas() {
  yield all([call(onCheckUserSesstion), call(onSignInWithEmail)]);
}
