/* eslint-disable react/prop-types */
import { Card, Grid, Typography, Box, Stack, Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useContext } from "react";
import CartContext from "../store/cart-context";
import {useNavigate} from 'react-router-dom';

const ProductItem = ({ product }) => {
  const cartCtx = useContext(CartContext)
  const addCartHandler = () => {
    cartCtx.addItem({
      id: product.id,
      name:product.name,
      amount:1,
      price: product.price
    })
  }

  const navigate = useNavigate()
  const cardClickHandler = () => {
    navigate(`/${product.id}`)
  }
  
  return (
    <>
      <Grid item xs={3}>
        <Card onClick={cardClickHandler} elevation={1} sx={{ ":hover": { boxShadow: '0px 0px 20px rgba(255, 255, 255, 0.5)' } }}>
          <img src={product.image} className="img" />
          <Box padding={1}>
            <Typography variant="h6">{product.name}</Typography>
            <Stack direction="row" justifyContent="space-between">
              <Typography textAlign="left" variant="subtitle2" color="gray">
                {`₹${product.price}`}
              </Typography>
              <Button onClick={addCartHandler}>
                <Typography>{cartCtx.items.find(item => item.id === product.id)?.amount}</Typography>
                <AddShoppingCartIcon className="add-cart" />
              </Button>
            </Stack>
          </Box>
        </Card>
      </Grid>
    </>
  );
};

export default ProductItem;
