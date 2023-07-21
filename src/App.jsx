/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState } from "react";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import "./App.css";
import axios from "axios";
import ProductDisplay from "./Components/ProductDisplay";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartItemsList from "./Components/CartItemsList";
import CartProvider from "./store/ContextProvider";
import { Navigate } from "react-router-dom";
import SignUpForm from "./Components/SignUpForm";
import ProductPage from "./Components/ProductPage";

const Protected = ({ responseState, children }) => {
  if (responseState !== 0) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const Authenticate = ({ responseState, children }) => {
  if (responseState === 0) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

function App() {
  const [responseState, setResponseState] = useState(null);

  let email = "";
  let password = "";
  let userId = "";
  
  const setEmailHandler = (value) => {
    email = value;
  };

  const setPasswordHandler = (value) => {
    password = value;
  };


  const LoginUser = async () => {
    if (email.length > 0) {
      try {
        setResponseState(4);
        axios
          .post(`${import.meta.env.VITE_API_URL}/validateCustomer`, {
            email: email,
            password: password,
          })
          .then((response) => {
            setResponseState(response.data.ResponseCode);
            userId = response.data.userId;
          });
      } catch (error) {
        console.log(error.message);
        setResponseState(null);
      }
    }
  };

  const ErrorDisplay = () => {
    if (responseState === 1) {
      return <p>Wrong Credentials, Try again.</p>;
    } else if (responseState === 2) {
      return <p>Service Down. Try Later.</p>;
    } else if (responseState === 3) {
      return <p>Password Expired.</p>;
    } else if (responseState === 4) {
      return <p>Loading</p>;
    }
  };

  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Navbar
            responseState={responseState}
            setResponseState={setResponseState}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Protected responseState={responseState}>
                  <ProductDisplay />
                </Protected>
              }
            />
            <Route
              path="/:id"
              element={<ProductPage />}
            />
            <Route
              path="/login"
              element={
                <Authenticate responseState={responseState}>
                  <Login
                    onSetEmail={setEmailHandler}
                    onSetPassword={setPasswordHandler}
                    onLoginUser={LoginUser}
                  />
                </Authenticate>
              }
            />
      
			<Route path="/sign-up" element={<SignUpForm/>}/>

            <Route path="/myCart" element={<CartItemsList userId={userId} />} />
          </Routes>
          {ErrorDisplay()}
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
