/* eslint-disable react/prop-types */
import { Container, Grid, Stack, Typography } from "@mui/material";
import ProductItem from "./ProductItem";
import "./ProductDisplay.css";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductDisplay = () => {
  const [products, setProducts] = useState([
    {
      id: null,
      name: "",
      price: "",
      image: "",
    },
  ]);
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/getAllProducts`
        );
        let productList = [];
        response.data.map((product) =>
          productList.push({
            id: product.productId,
            name: product.prodName,
            price: product.price,
            image: product.imageLink,
          })
        );
        setProducts(productList);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPosts();
  }, []);

  return (
    <>
      <div className="container">
        <Stack direction={"column"} spacing={4}>
          <Typography
            variant="h3"
            align="right"
            className="text1"
            color="#C17C74"
            sx={{ textShadow: "1px 1px 2px black" }}
          >
            Welcome!
          </Typography>
          <Typography
            variant="body"
            align="right"
            color="#C17C74"
            sx={{ backgroundColor: "rgba(255, 255, 255, 0.503)" }}
          >
            Browse our products for all your shopping needs.
          </Typography>
        </Stack>
      </div>
      <Container sx={{ paddingTop: 4 }}>
        <Typography align="left" variant="h4">
          Our Products:
        </Typography>
        <Grid container spacing={3} sx={{ paddingTop: 2 }}>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default ProductDisplay;
