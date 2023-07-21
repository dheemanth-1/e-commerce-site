/* eslint-disable react/prop-types */
import { Card, Container, IconButton, Typography, Stack, Grid, Button } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from "@mui/icons-material/Remove";
import { useContext } from 'react';
import CartContext from '../store/cart-context'

const ProductPage = () => {
    const params = useParams()
    const products = []
    const [product, setProduct] = useState({})
    const navigate = useNavigate()
    const cartCtx = useContext(CartContext)

    useEffect(() => {
        async function getPosts() {
            try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/getAllProducts`)
            response.data.map((product) =>
          products.push({
            id: product.productId,
            name: product.prodName,
            price: product.price,
            image: product.imageLink,
          })
        );
        const product = products.find(product => product.id == params.id)
        setProduct(product)
            } catch (error) {
                console.log(error)
            }
        }
        getPosts(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log(product)
    const onGoBackHandler = () => {
        navigate(-1)
    }

    const addItemsHandler = () => {
        cartCtx.addItem({
            id: product.id,
            name:product.name,
            amount:1,                
            price: product.price  
        })
    }

    const removeItemsHandler = () => {
        cartCtx.removeItem(product.id)
    }

    const item = cartCtx.items.find(item => item.id === product.id)

    return (
        <>
            <Container sx={{ marginTop: 4 }}>
                <Card>
                    <Stack direction='row' sx={{marginTop: '24px', marginLeft: '8px'}}>
                    <IconButton onClick={onGoBackHandler}>
                    <ArrowBackIosNewIcon />
                    </IconButton>
                    <Typography variant='h4'sx ={{marginLeft:"24px"}}>{product.name}</Typography>
                    </Stack>
                    <Grid container spacing={5} alignItems={'center'}>
                        <Grid item xs={12} md={6} display={'flex'} justifyContent={'center'}>
                        <img src={product.image} style={{margin: '24px'}} />
                        </Grid>
                        <Grid item xs={12} md={6} display={'flex'} direction={'column'} justifyContent={'flex-start'}>
                            <Typography variant='h5' sx={{padding: '5px'}}>
                                Price:
                            </Typography>
                            <Typography variant='h5' sx={{padding: '5px'}}>
                                {` ₹ ${(+product.price).toFixed(2)}`}
                            </Typography>
                            <Stack direction='row' sx={{marginTop: '10px'}}>
                            <Typography variant='h6'>
                                Add to Cart:
                            </Typography>
                            <Button onClick={addItemsHandler}>
                        <AddIcon color='success'/>
                    </Button>
                  
                  <Typography variant='body' sx={{paddingLeft:'14px', paddingRight:'14px'}}>{item? item.amount : ''}</Typography>
                  <Button onClick={removeItemsHandler}>
                    <RemoveIcon color='error'/>
                  </Button>
                            </Stack>
                           <div style ={{ display: 'flex', justifyContent: 'flex-start', alignContent: 'center'}}>
                            <Button sx={{marginTop: '80px'}} onClick={() => navigate("/myCart")}>
                                Go to My Cart
                            </Button>
                            </div> 

                        </Grid>
                    </Grid>
                </Card>
            </Container>
        </>
    )
}

export default ProductPage;