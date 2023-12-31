import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CategoryContext } from "../../contexts/category-context.components";
import "./category.styles.scss";
import ProductCard from "../../components/card/product-card.component";

const Category = ({ params }) => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoryContext);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);
  return (
    <>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        }
      </div>
    </>
  );
};

export default Category;
