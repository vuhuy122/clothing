import { all, call, put, takeLatest } from "redux-saga/effects";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signOutUser,
} from "../../utils/firebase/firebase.utils";
import {
  signInFaluer,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFaluer,
  signUpSuccess,
} from "./user.action";

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

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    console.log(user);
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(signUpFaluer(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
  yield call(getSnapshotFromUserAuth, user, additionalDetails);
}
export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed());
  }
}

export function* onCheckUserSesstion() {
  yield takeLatest(USER_ACTIONS_TYPE.CHECK_USER_SESSION, isUserAuthenticated);
}
export function* onSignInWithEmail() {
  yield takeLatest(USER_ACTIONS_TYPE.EMAIL_SIGN_IN_START, signInWithEmail);
}
export function* onSignUp() {
  yield takeLatest(USER_ACTIONS_TYPE.SIGN_UP_START, signUp);
}
export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTIONS_TYPE.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTIONS_TYPE.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSesstion),
    call(onSignInWithEmail),
    call(onSignUp),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
