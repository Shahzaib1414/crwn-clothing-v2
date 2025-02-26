import { useContext } from "react";
import SHOP_DATA from "../../shop-data.json";
import { ProductsContext } from "../../context/product.context";

const Shop = () => {
  const {products} = useContext(ProductsContext)
  return (
    <div>
      {SHOP_DATA.map(({ id, name }) => {
        return (
          <div key={id}>
            <h1>{name}</h1>
          </div>
        );
      })}
    </div>
  );
};
export default Shop;