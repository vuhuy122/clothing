import { takeLatest, all, call, put } from "redux-saga/effects";

import {
  fetchsetCategoriesFailed,
  fetchsetCategoriesSuccess,
} from "./category.action";

import { CATEGORY_ACTION_TYPES } from "./category.type";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments, "categories");
    yield put(fetchsetCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchsetCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORY_ACTION_TYPES.SET_CATEGORY_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
