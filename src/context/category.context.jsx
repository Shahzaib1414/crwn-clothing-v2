import { createContext, useState, useEffect } from "react";
import {
  getCategoriesAndDocuments,
} from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
  categoriesMap: {},
  setCategoryMap: () => null,
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoryMap] = useState([]);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoryMap(categoryMap);
    };
    getCategoriesMap();
  }, []);
  const value = { categoriesMap, setCategoryMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
