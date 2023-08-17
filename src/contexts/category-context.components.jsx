import { createContext, useState, useEffect } from "react";
import { getCollectionsAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoryContext = createContext({
  categoriesMap: {},
});

export const CategoryProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCollectionsAndDocuments();
      setCategoriesMap(categoryMap)
    };
    getCategoriesMap();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>
  );
};
