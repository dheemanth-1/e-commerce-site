/* eslint-disable react/prop-types */
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, Container, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Navbar = (props) => {
  const navigate = useNavigate()

  const logoutHandler = () => {
    props.setResponseState(null)
    navigate('/login')
  }

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">   
        <Container maxWidth="xl">    
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              E-Commerce Site
            </Typography>
            {props.responseState === 0 && <><Button color='inherit' onClick={logoutHandler}>Log Out</Button>
            <Link to='/myCart'>
            <IconButton
              size="large"
              aria-label="cart"
              aria-controls="menu-appbar"
              aria-haspopup="false"
              color="inherit"
            >
              <ShoppingCartIcon color='primary'/>
            </IconButton></Link></>}
          </Toolbar>
        </Container>
        </AppBar>
      </Box>
    )
}

export default Navbar;