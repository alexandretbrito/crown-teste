import { useContext, Fragment } from "react";
import { CategoryContext } from "../../contexts/category-context.components";
import ProductCard from "../../components/card/product-card.componnt";
import "./shop.styles.scss";

const Shop = () => {
  const { categoriesMap } = useContext(CategoryContext);
  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => (
        <div key={title}>
          <h2>{title}</h2>
          <div className='products-container'>
            {categoriesMap[title].map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </Fragment>
  );

};

export default Shop;
