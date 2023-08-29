import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const categoriesSelector = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((accum, category) => {
      const { title, items } = category;
      accum[title.toLowerCase()] = items;
      return accum;
    }, {})
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);