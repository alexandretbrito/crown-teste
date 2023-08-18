import { useContext, Fragment } from "react";
import { CategoryContext } from "../../contexts/category-context.components";
import CategoryPreview from "../../components/category-preview/category-preview.component"
import "../shop/shop.styles.scss";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoryContext);
  return (
    <div className="shop-container">
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return <CategoryPreview key={title} title={title} products={products} />
      })}
    </div>
  );

};

export default CategoriesPreview;