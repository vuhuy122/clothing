import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { createAction } from "../../utils/firebase/reducer/reducer.utils";
import { CATEGORY_ACTION_TYPES } from "./category.type";


export const fetchsetCategoriesStart = () => createAction(CATEGORY_ACTION_TYPES.SET_CATEGORY_START)
export const fetchsetCategoriesSuccess = (categoriesMap) => createAction(CATEGORY_ACTION_TYPES.SET_CATEGORY_SUCCESS, categoriesMap)
export const fetchsetCategoriesFailed = (error) => createAction(CATEGORY_ACTION_TYPES.SET_CATEGORY_FAILED, error)

export const fetchsetCategoriesAsyn = () => {
    return async (dispatch) => {
        dispatch(fetchsetCategoriesStart())
        try {
            const categoriesArray = await getCategoriesAndDocuments('categories');
            dispatch(fetchsetCategoriesSuccess(categoriesArray))
        } catch (error) {
            dispatch(fetchsetCategoriesFailed(error))
        }
    }
}
