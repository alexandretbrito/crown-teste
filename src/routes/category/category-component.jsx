import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  categoriesSelector,
  selectCategoriesIsLoading,
} from "../../store/categories/categories.selector";
import "./category.styles.scss";

import ProductCard from "../../components/card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";

const Category = ({ params }) => {
  const { category } = useParams();
  const categoriesMap = useSelector(categoriesSelector);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);
  return (
    <>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="category-container">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </>
  );
};

export default Category;
