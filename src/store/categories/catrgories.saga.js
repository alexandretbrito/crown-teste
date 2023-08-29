import { all, call, put, takeLatest } from "redux-saga/effects";
import { getCollectionsAndDocuments } from "../../utils/firebase/firebase.utils";
import { fetchCategoriesFailed, fetchCategoriesSucess } from "./categories.actions";
import CATEGORIES_ACTION_TYPE from "./categories.types";

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCollectionsAndDocuments);
    yield put(fetchCategoriesSucess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
