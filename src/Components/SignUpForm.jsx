import {
  Card,
  Container,
  CardContent,
  Typography,
  TextField,
  Stack,
  Grid,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from '@hookform/devtools';
import axios from 'axios';

const SignUpForm = () => {
  const { register, handleSubmit, formState, watch, control } = useForm();
  const { errors } = formState
  const onSubmit = async (data) => {
    console.log(data)
    try {
      axios
        .post(`${import.meta.env.VITE_API_URL}/addCustomer`, {
          fullName: data.fullName,
          userId: data.userId,
          phNo: data.phNo,
          email: data.email,
          password: data.password,
          adress: {
            drNo: data.drNo,
            street: data.street,
            city: data.city,
            state: data.state,
            country: data.country,
            pin: data.pin
        }
    })
        .then((response) => {
          console.log(response)
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  
  return (
    <>
      <Container sx={{ marginTop: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h3" color="text.secondary" gutterBottom>
              Sign up
            </Typography>
          </CardContent>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Grid container spacing={5} alignItems={"center"}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={6} width={400}>
                    <TextField
                      label="Full Name"
                      type="text"
                      {...register("fullName", { required: 'Full Name is required', pattern:{
                        value: /^[a-zA-Z]+ [a-zA-Z]+$/,
                        message: "Please enter a valid full name",
                      } })}
                      error={!!errors?.fullName}
                      helperText={errors?.fullName && errors?.fullName.message}
                    />
                    <TextField
                      label="User ID"
                      type="text"
                      {...register("userId", {
                        required: 'UserID is required',
                        maxLength: {
                          value: 8,
                          message: 'UserID must not be more than 8 characters',
                        } })}
                      error={!!errors?.userId}
                      helperText={errors?.userId ? 'Please enter a userID within 8 characters' : ''}
                    />
                    <TextField
                      label="Phone Number"
                      type="number"
                      {...register("phNo", { required: 'Phone Number is required', pattern:{
                        value:  /^\d{10}$/,
                        message: "Please enter a valid phone number",
                      } })}
                      error={!!errors?.phNo}
                      helperText={errors?.phNo && errors?.phNo.message}
                    />
                    <TextField
                      label="Email"
                      type="text"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email",
                        },
                      })}
                      error={!!errors?.email}
                      helperText={errors?.email ? 'Please enter a valid email' : ''}
                    />
                    <TextField
                      label="Password"
                      type="password"
                      {...register("password", { required: true, minLength: 6 })}
                      error={!!errors?.password}
                      helperText={errors?.password ? 'Please enter a password of minimum 6 characters' : ''}
                    />
                    <TextField
                      label="Re-enter Password"
                      type="password"
                      {...register("confirmPassword", {
                        required: true,
                        validate: (value) => value === watch('password'),
                      })}
                      error={!!errors?.confirmPassword}
                      helperText={errors?.confirmPassword ? 'Passwords do not match' : ''}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={4} width={400}>
                    <Typography variant="h6">Address:</Typography>
                    <TextField label="Door/House No." type="text" {...register("drNo", {
                        required: true
                      })}
                      error={!!errors?.drNo}
                      helperText={errors?.drNo && errors?.drNo.message}/>
                    <TextField label="Street" type="text" {...register("street", {
                        required: true
                      })}
                      error={!!errors?.street}
                      helperText={errors?.street && errors?.street.message}/>
                    <TextField label="City" type="text" {...register("city", {
                        required: true
                      })}
                      error={!!errors?.city}
                      helperText={errors?.city && errors?.city.message}/>
                    <TextField label="State" type="text" {...register("state", {
                        required: true
                      })}
                      error={!!errors?.state}
                      helperText={errors?.state && errors?.state.message}/>
                    <TextField label="Country" type="text" {...register("country", {
                        required: true
                      })}
                      error={!!errors?.country}
                      helperText={errors?.country && errors?.country.message}/>
                    <TextField label="PIN Code" type="number" {...register("pin", {
                        required: true,
                        minLength: 6
                      })}
                      error={!!errors?.pin}
                      helperText={errors?.pin && errors?.pin.message}/>
                  </Stack>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={3}
                  display={"flex"}
                  justifyContent={"space-around"}
                >
                  <Button type="submit">Sign Up</Button>
                  <Link to="/login">
                    <Button>Cancel</Button>
                  </Link>
                </Grid>
              </Grid>
            </form>
            <DevTool control={control}/>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default SignUpForm;
