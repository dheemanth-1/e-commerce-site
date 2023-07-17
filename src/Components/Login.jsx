/* eslint-disable react/prop-types */
import { Button, Container, FormGroup, IconButton, InputAdornment, Paper, Stack, TextField } from '@mui/material';
import './Login.css';
import { Link } from 'react-router-dom';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import { useState } from 'react';


const Login = (props) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => {
    setShowPassword(showPassword => !showPassword)
  }

    const onSubmitHandler = (event) => {
        event.preventDefault()
        props.onSetEmail(event.target[0].value)
        props.onSetPassword(event.target[1].value)
        props.onLoginUser()
    }

  return (
    <>
      <Container sx={{ marginTop: 4 }}>
        <Paper elevation={4} className="form">
          <FormGroup >
          <form onSubmit={onSubmitHandler}>
            <Stack my={1.4} direction="column" spacing={1.6}>
              <TextField id="email" label="E-mail"/>
              <TextField id="password" label="Password" type={showPassword? "text" : "password"}
              InputProps={{
                endAdornment : (
                  <InputAdornment position='end'>
                    <IconButton 
                      aria-label='Toggle password visibility'
                      onClick={handleClickShowPassword}>
                        {showPassword? <Visibility/> : <VisibilityOff/>}
                    </IconButton>
                  </InputAdornment>
                )
              }}/>
              <Stack direction={'row'}>
              <Button type='submit' >Log In</Button>
              <Link to='/sign-up'><Button>Sign-Up</Button></Link>
              </Stack>
            </Stack>
            </form>
          </FormGroup>
        </Paper>
      </Container>
    </>
  );
};

export default Login;
