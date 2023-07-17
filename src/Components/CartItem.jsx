/* eslint-disable react/prop-types */
import './CartItemList.css';
import { ListItem, ListItemText, Typography, Divider, Button } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CartItem = ({item, addItems, removeItems}) => {
    const addItemsHandler = () => {
        addItems({
            id: item.id,
            name:item.name,
            amount:1,
            price: item.price
          })
    }

    const removeItemsHandler = () => {
        removeItems(item.id)
    }
    return (
        <>
        <ListItem
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ListItemText primary={`${item.name}`} />
                <span className="countitem">
                    <Button onClick={addItemsHandler}>
                        <AddIcon color='success'/>
                    </Button>
                  
                  <Typography sx={{paddingLeft:'14px', paddingRight:'14px'}}>{item.amount}</Typography>
                  <Button onClick={removeItemsHandler}>
                    <RemoveIcon color='error'/>
                  </Button>
                  <Typography variant='h5'>
                    {`₹ ${(item.price * item.amount).toFixed(2)}`}
                  </Typography>
                </span>
              </ListItem>
              <Divider />
        </>
    )
}

export default CartItem;