import { useSelector } from "react-redux";
import { categoriesSelector, selectCategoriesIsLoading } from "../../store/categories/categories.selector";

import CategoryPreview from "../../components/category-preview/category-preview.component"
import Spinner from "../../components/spinner/spinner.component";

import "../shop/shop.styles.scss";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(categoriesSelector);
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <div className="shop-container">
      {
        isLoading ? (
        <Spinner />
        )
        :
      (Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return <CategoryPreview key={title} title={title} products={products} />
      })
      )}
    </div>
  );

};

export default CategoriesPreview;