import { createContext, useEffect, useReducer } from 'react';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase/firebase.utils';
import { createAction } from '../utils/firebase/reducer/reducer.utils';
// as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const USER_ACTIONS_TYPE = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
}

const userReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_ACTIONS_TYPE.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }

        default:
            throw new Error(`unknown action type ${type} in UserReducer`)
    }
}
const INITIAL_STATE = {
    currentUser: null
}
export const UserProvider = ({ children }) => {
    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE)

    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTIONS_TYPE.SET_CURRENT_USER, user))
    }

    const value = { currentUser, setCurrentUser }

    useEffect(() => {
        const unsub = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user)
            }
            setCurrentUser(user)
        })
        return unsub
    }, [])
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}