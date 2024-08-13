import React from "react";
import { useGetAllProductsQuery } from "../redux/features/Products/productApi";
import ProductCard from "./ProductCard";

function Products() {
  const { isLoading, data, error } = useGetAllProductsQuery();
  console.log("Productssssssss", data);
  return (
    <>
      <div className="container-fluid pt-5 pb-3">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Featured Products</span>
        </h2>
        <div className="row px-xl-5">
          {data &&
            data.products.map((product) => <ProductCard product={product} />)}
        </div>
      </div>
    </>
  );
}

export default Products;
