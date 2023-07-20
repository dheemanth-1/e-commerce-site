/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import {
  Card,
  Stack,
  Container,
  Typography,
  CardActions,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Modal,
  Box
} from "@mui/material";
import "./CartItemList.css";
import CartItem from "./CartItem";
import CartContext from "../store/cart-contexst";
import { useContext, useState } from "react";
import axios from "axios";

const CartItemsList = ({ userId }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const cartCtx = useContext(CartContext);
  const [ openOrderPlacedModal, setopenOrderPlacedModal] = useState(false);

  const placeOrderHandler = async () => {
    if (cartCtx.items.length !== 0) {
    const items = cartCtx.items.map((item) => {
      return { qty: item.amount, cost: item.price, productId: item.id };
    });
    try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/addToCart`,
      {
        userId: userId,
        orderDts: items,
      }
    );
      if (response.status === 201) {
        cartCtx.clearAllItems();
        setopenOrderPlacedModal(true)
      }
    
    } catch (error) {
      console.log(error)
    }
  }
  };

  const closeModalHandler = () => {
    setopenOrderPlacedModal(false)
  }

  return (
    <>
      <Container sx={{ marginTop: 4 }}>
        <Card
          sx={{
            minWidth: 275,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <CardContent>
              <Typography variant="h3" color="text.secondary" gutterBottom>
                My Cart
              </Typography>
            </CardContent>
            <CardActions>
              <Link to="/">
                <CloseIcon color="primary" fontSize="large" />
              </Link>
            </CardActions>
          </Container>
        </Card>
        <Card>
          <CardContent>
            <List style={{ width: "100%" }}>
              {cartCtx.items.map((item) => {
                return (
                  <CartItem
                    key={item.id}
                    item={item}
                    addItems={cartCtx.addItem}
                    removeItems={cartCtx.removeItem}
                  />
                );
              })}
              <ListItem>
                <ListItemText
                  primary="Total:"
                  primaryTypographyProps={{ style: { fontSize: "30px" } }}
                />
                <ListItemSecondaryAction>
                  <Typography variant="h5">
                    {`₹ ${cartCtx.totalAmount.toFixed(2)}`}
                  </Typography>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "flex-end" }}
            >
              <Button onClick={placeOrderHandler}>Place Order</Button>
              <Link to="/">
                <Button>Cancel</Button>
              </Link>
            </Stack>
          </CardContent>
        </Card>
      </Container>
      <Modal open={openOrderPlacedModal}
      onClose={closeModalHandler}
      aria-labelledby="modal-modal-title">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Your order has been placed!
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default CartItemsList;
