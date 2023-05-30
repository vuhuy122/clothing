import { createAction } from "../../utils/firebase/reducer/reducer.utils";
import { CATEGORY_ACTION_TYPES } from "./category.type";


export const setCategories = (categoriesMap) => createAction(CATEGORY_ACTION_TYPES.SET_CATEGORY, categoriesMap)