/* To sign up as an assistance professional, we follow the same method used in sign up 
for a motorist, just without the payment form since it is free to become an assistance
professional */ 

import React, { useEffect, useState } from "react";
import { Formik, Field } from "formik";
import {
    Grid,
    CssBaseline,
    Container,
    Avatar,
    Button,
    TextField,
    Link,
    Box,
    Typography,
    Radio,
    Alert,
    Paper
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Footer from "../components/Footer";
import * as Yup from "yup";
import axios from "../api/axios";
import { parse, isDate } from "date-fns";

// check if DOB is real date 
function parseDateString(value, originalValue) {
    const parsedDate = isDate(originalValue)
        ? originalValue
        : parse(originalValue, "yyyy-MM-dd", new Date());

    return parsedDate;
}

const SIGNUP_URL = "/signup/assistance-professional";
const MIN_LENGTH = 10;
const phoneReg =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const nameReg = /^[a-zA-Z]+$/;

// schema to handle form validation
const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().required("Required").matches(nameReg, "Only letters"),
    lastName: Yup.string().required("Required").matches(nameReg, "Only letters"),
    dob: Yup.date()
        .transform(parseDateString)
        .max(new Date())
        .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phoneNumber: Yup.string()
        .required("Required")
        .matches(phoneReg, "Phone number invalid")
        .min(10, "Phone number must be 10 digits")
        .max(10, "Phone number must be 10 digits"),
    password: Yup.string()
        .required("Required")
        .min(4, "​Password must be at least 4 characters"),
});

const SignUpAP = () => {
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    // send data to backend and handle response 
    const submitForm = (values) => {
        axios
            .post(SIGNUP_URL, values)
            .then((res) => {
                if (res.data.result === "success") {
                    setSuccess(true);
                    setErrMsg("");
                    window.scrollTo(0, 0);
                } else if (res.data.result === "error") {
                    setSuccess(false);
                    setErrMsg(res.data.message);
                }
            })
            .catch((error) => {
                console.log(error);
                setSuccess(false);
                setErrMsg(error.message);
            });
    };

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    // custom radio button to be able to handle validation 
    const RadioButton = ({
        field: { name, value, onChange },
        id,
        label,
        className,
        ...props
    }) => {
        return (
            <div style={{ display: "inline-block" }}>
                <Radio
                    value={id}
                    name={name}
                    label={label}
                    checked={id === value}
                    onChange={onChange}
                    {...props}
                />
                <label htmlFor={id}>{label}</label>
            </div>
        );
    };

    const RadioButtonGroup = ({ label, children }) => {
        return (
            <div>
                <legend>{label}</legend>
                {children}
            </div>
        );
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
                            <RadioButtonGroup
                                id="gender"
                                label="Gender"
                                value={values.gender}
                            >
                                <Field
                                    component={RadioButton}
                                    name="gender"
                                    id="male"
                                    label="Male"
                                />
                                <Field
                                    component={RadioButton}
                                    name="gender"
                                    id="female"
                                    label="Female"
                                />
                            </RadioButtonGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="dob"
                                label="Date of Birth"
                                type="date"
                                value={values.dob}
                                helperText={touched.dob ? errors.dob : ""}
                                error={touched.dob && Boolean(errors.dob)}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                                inputProps={{
                                    min: "1899-01-01",
                                    max: new Date().toISOString().split("T")[0], // DOB cannot be greater than today
                                }}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
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
                        <Grid item xs={12}>
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
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login-ap" variant="body2">
                                Already have an account? Log in
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
            <Container component="main" maxWidth="sm">
                <Paper variant="outlined" sx={{ my: { xs: 6, md: 6 }, p: { xs: 2, md: 3 } }} >
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
                        <Typography component="h1" variant="h4">
                            Sign up
                        </Typography>{" "}
                        <br />
                        {success ? (<Container sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: 'center',
                        }}>
                            <Alert severity="success">{"Signed Up successfully!"}</Alert>
                            <Button variant="contained" href="/login-motorist">Go to login</Button>
                        </Container>) : ""}
                        {errMsg ? <Alert severity="error">{errMsg}</Alert> : ""}
                        <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 3, alignSelf: 'flex-start' }}>
                            Personal Details
                        </Typography>
                        <Formik
                            initialValues={{
                                firstName: "",
                                lastName: "",
                                gender: "female",
                                dob: "",
                                email: "",
                                password: "",
                                phoneNumber: "",
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                submitForm(values);
                                setSubmitting(false);
                            }}
                            validationSchema={SignUpSchema}
                        >
                            {form}
                        </Formik>
                    </Box>
                </Paper>
            </Container>
            <Footer />
        </>
    );
}

export default SignUpAP; 
