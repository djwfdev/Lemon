/* To login as a subscribed member, we must first obtain valid information from a form
so that the data sent to the database is properly formatted. Then sending
the data through a 'link' to the backend, which triggers a function to check if
that subscribed member exists in the mongodb collection */ 

import React, { useState, useContext } from "react";
import { StatusContext } from "../context/StatusContext";
import { AuthContext } from "../context/AuthContext";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import axios from "../api/axios";
import {
    Grid,
    CssBaseline,
    FormControlLabel,
    Avatar,
    Button,
    TextField,
    Checkbox,
    Link,
    Box,
    Typography,
    Paper,
    Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Footer from "../components/Footer";
import * as Yup from "yup";

// schema to handle form validation
const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
        .required("Required")
        .min(4, "​Password must be at least 4 characters"),
});

const LOGIN_URL = "/login/member";

export default function LoginMotorist() {
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const { handlestatus } = useContext(StatusContext);
    const { login } = useContext(AuthContext);

    // send data to backend and handle response 
    const submitForm = (values) => {
        axios
            .post(LOGIN_URL, values)
            .then((res) => {
                if (res.data.result === "success") {
                    sessionStorage.setItem("member", JSON.stringify(res.data.doc));
                    handlestatus(true);
                    login();
                    setSuccess(true);
                } else if (res.data.result === "error") {
                    setSuccess(false);
                    setErrMsg(res.data.message);
                }
            })
            .catch((error) => {
                setSuccess(false);
                setErrMsg(error.message);
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
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        id="email"
                        label="Email"
                        type="email"
                        value={values.email}
                        helperText={touched.email ? errors.email : ""}
                        error={touched.email && Boolean(errors.email)}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        value={values.password}
                        helperText={touched.password ? errors.password : ""}
                        error={touched.password && Boolean(errors.password)}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
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
                    <Grid container>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </>
        );
    };

    return (
        <>
            {success ? (
                <Redirect to="/member-dashboard" />
            ) : (
                <Grid container component="main" sx={{ height: "100vh" }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={5}
                        component={Paper}
                        elevation={6}
                        square
                    >
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Log in
                            </Typography>{" "}
                            <br />
                            {errMsg ? <Alert severity="error">{errMsg}</Alert> : ""}
                            <Formik
                                initialValues={{ email: "", password: "" }}
                                onSubmit={(values, { setSubmitting }) => {
                                    submitForm(values);
                                    setSubmitting(false);
                                }}
                                validationSchema={LoginSchema}
                            >
                                {form}
                            </Formik>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: "url(/images/brokendown.jpg)",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                </Grid>
            )}
            <Footer />
        </>
    );
}
