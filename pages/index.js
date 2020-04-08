import React, { useEffect } from "react";
import Axios from "axios";
import ProductList from "../components/Index/ProductList";
import baseUrl from '../utils/baseUrl'

const Home = ({ products }) => {
  console.log(baseUrl)
  return <ProductList products={products} />;
  // if you don't use next (which i likely won't)

  // useEffect(() => {
  //   getProducts();
  // }, []);

  // const getProducts = async () => {
  //   const url = "http://localhost:3000/api/products";
  //   const response = await Axios.get(url);
  //   // console.log(response.data);
  // };
};
export default Home;

// next.js api
Home.getInitialProps = async () => {
  const url = `${baseUrl}/api/products`;
  const response = await Axios.get(url);
  return { products: response.data }; // merged into component props
};
