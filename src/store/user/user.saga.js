import { takeLatest, put, call, all } from "redux-saga/effects";

import { USER_ACTIONS_TYPE } from "./user.type";
import {
  createUserDocumentFromAuth,
  getCurrentUser,
} from "../../utils/firebase/firebase.utils";
import { signInFaluer, signInSuccess } from "./user.action";

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    console.log("userSnapshot", userSnapshot.data());
    yield put(signInSuccess({ id: userSnapshot?.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFaluer(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFaluer(error));
  }
}

export function* onCheckUserSesstion() {
  yield takeLatest(USER_ACTIONS_TYPE.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
  yield all([call(onCheckUserSesstion)]);
}
