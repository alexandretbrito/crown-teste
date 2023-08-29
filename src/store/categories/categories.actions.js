import CATEGORIES_ACTION_TYPE from "./categories.types";
import { createAction } from "../../utils/reducer/reducer.utils";
import { getCollectionsAndDocuments } from "../../utils/firebase/firebase.utils";

export const fetchCategoriesStart = () =>
  createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START);

export const fetchCategoriesSucess = (categoriesArray) =>
  createAction(
    CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );

export const fetchCategoriesFailed = (error) =>
  createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = () => {
    return async (dispatch) => {
        dispatch(fetchCategoriesStart());
        try {
          const categoriesArray = await getCollectionsAndDocuments();
          dispatch(fetchCategoriesSucess(categoriesArray));
        } catch (error) {
          dispatch(fetchCategoriesFailed(error));
        }
      };
};