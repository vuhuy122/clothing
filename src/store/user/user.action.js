import { createAction } from "../../utils/firebase/reducer/reducer.utils";
import { USER_ACTIONS_TYPE } from "./user.type";

export const setCurrentUser = (user) =>
  createAction(USER_ACTIONS_TYPE.SET_CURRENT_USER, user);

export const checkUserSession = () =>
  createAction(USER_ACTIONS_TYPE.CHECK_USER_SESSION);

export const googleSignInStart = () =>
  createAction(USER_ACTIONS_TYPE.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) =>
  createAction(USER_ACTIONS_TYPE.EMAIL_SIGN_IN_START, { email, password });

export const signInSuccess = (user) =>
  createAction(USER_ACTIONS_TYPE.SIGN_IN_SUCCESS, user);

export const signInFaluer = (error) =>
  createAction(USER_ACTIONS_TYPE.SIGN_IN_FAILED, error);
