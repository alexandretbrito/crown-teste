import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlicer) => categoriesSlicer.categories
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