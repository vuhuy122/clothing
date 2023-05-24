import { createAction } from "../../utils/firebase/reducer/reducer.utils";
import { USER_ACTIONS_TYPE } from "./user.type";


export const setCurrentUser = (user) =>
    createAction(USER_ACTIONS_TYPE.SET_CURRENT_USER, user)
