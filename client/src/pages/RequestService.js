/* If a user is a subscribed member and would like to request a service, they can 
login with the form below and fill out the request service member form.
If they are not, there is a redirect link to the customer request service form  */ 

import React, { useState, useContext } from "react";
import { Formik } from "formik";
import { Redirect } from "react-router-dom";
import {
    Grid,
    CssBaseline,
    Container,
    Avatar,
    Button,
    TextField,
    Box,
    Typography,
    Alert,
    Paper,
    Link
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Footer from "../components/Footer";
import * as Yup from "yup";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const REQ_URL = "/service-request/member/search";
const MIN_LENGTH = 10;
// regex to handle formats 
const phoneReg =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const nameReg = /^[a-zA-Z]+$/;

// schema to handle form validation
const LoginSchema = Yup.object().shape({
    firstName: Yup.string().required("Required").matches(nameReg, "Only letters"),
    lastName: Yup.string().required("Required").matches(nameReg, "Only letters"),
    phoneNumber: Yup.string()
        .required("Required")
        .matches(phoneReg, "Phone number invalid")
        .min(10, "Phone number must be 10 digits")
        .max(10, "Phone number must be 10 digits"),
});

const RequestService = () => {
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const { login } = useContext(AuthContext);

    var userType = Object.keys(sessionStorage)[0];
    var user = JSON.parse(sessionStorage.getItem(userType));

    // if the user is not logged in, clear form fields 
    if (userType !== 'member') {
        user = {
            firstName: "",
            lastName: "",
            phoneNumber: ""
        };
    }

    // redirect user if they are an AP 
    if (userType === 'ap')
        return (<Redirect to='/'></Redirect>)

    // send data to backend and handle response 
    const submitForm = (values) => {
        axios
            .post(REQ_URL, values)
            .then(({ data: savedMember }) => {
                sessionStorage.setItem("member", JSON.stringify(savedMember));
                login();
                setSuccess(true);
            })
            .catch((err) => {
                console.log(err);
                setSuccess(false);
                setErrMsg(err.message);
            });
    };

    const form = ({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
    }) => {
        return (
            <>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0, mb: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="firstName"
                                label="First Name"
                                value={values.firstName}
                                helperText={touched.firstName ? errors.firstName : ""}
                                error={touched.firstName && Boolean(errors.firstName)}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="lastName"
                                label="Last Name"
                                value={values.lastName}
                                helperText={touched.lastName ? errors.lastName : ""}
                                error={touched.lastName && Boolean(errors.lastName)}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="phoneNumber"
                                label="Phone Number"
                                value={values.phoneNumber}
                                helperText={touched.phoneNumber ? errors.phoneNumber : ""}
                                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                inputProps={{ maxLength: MIN_LENGTH }}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isSubmitting}
                        sx={{
                            padding: "8px 20px",
                            mt: 3,
                            mb: 2,
                        }}
                    >
                        Log in
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/service-request-customer" variant="body2">
                                Not a member? Request Service here
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </>
        );
    };

    return (
        <>
            <CssBaseline />
            {success ? (<Redirect to='/service-request-member'></Redirect>) : (
                <Container component="main" maxWidth="sm">
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 6, md: 6 } }} >
                        <Box
                            sx={{
                                marginTop: 2,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Find Member
                            </Typography>{" "}
                            <br />
                            {errMsg ? <Alert severity="error">{errMsg}</Alert> : ""}
                            <br />
                            <Formik
                                initialValues={{
                                    firstName: `${user.firstName}`,
                                    lastName: `${user.lastName}`,
                                    phoneNumber: `${user.phoneNumber}`,
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    submitForm(values);
                                    setSubmitting(false);
                                }}
                                validationSchema={LoginSchema}
                            >
                                {form}
                            </Formik>
                        </Box>
                    </Paper>
                </Container>
            )}
            <Footer />
        </>
    );
}

export default RequestService; 