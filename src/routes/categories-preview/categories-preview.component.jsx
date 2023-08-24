import { useSelector } from "react-redux";
import { categoriesSelector } from "../../store/categories/categories.selector";
import CategoryPreview from "../../components/category-preview/category-preview.component"
import "../shop/shop.styles.scss";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(categoriesSelector);

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