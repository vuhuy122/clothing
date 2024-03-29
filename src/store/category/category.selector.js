import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categorySlice) => categorySlice.categories
);

export const selectorCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories?.reduce((acc, category) => {
      const { title, items } = category;
      acc[title?.toLowerCase()] = items;
      return acc;
    }, {})
);

export const selectorCategoriesIsloading = createSelector(
  [selectCategoryReducer],
  (categories) => categories.isLoading
);
