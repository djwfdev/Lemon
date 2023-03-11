/* This is a form filled out by those who are pay on demand customers. There is a 
call out fee and they must pay for the service provided by the assistance pro. 
This is then sent to the backend where it will be added as a 
job to a list of available jobs for each assistance pro (if in distance range). */ 

import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import {
    Grid,
    CssBaseline,
    Container,
    Button,
    TextField,
    Box,
    Typography,
    Alert,
    Paper,
    MenuItem
} from "@mui/material";

import Footer from "../components/Footer";
import * as Yup from "yup";
import axios from "../api/axios";
import PaymentForm from '../components/PaymentForm';

const SERVICE_URL = "/service-request/customer";
const MIN_LENGTH = 10;
// regex to handle correct formats 
const phoneReg = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const nameReg = /^[a-zA-Z ]+$/;
const plateReg = /^[A-Z0-9]+$/;

// schema to handle form validation
const RequestFormSchema = Yup.object().shape({
    // PERSONAL SCHEMA RULES 
    firstName: Yup.string().required("Required").matches(nameReg, "Only letters"),
    lastName: Yup.string().required("Required").matches(nameReg, "Only letters"),
    phoneNumber: Yup.string()
        .required("Required")
        .matches(phoneReg, "Phone number invalid")
        .min(10, "Phone number must be 10 digits")
        .max(10, "Phone number must be 10 digits"),

    // ADDRESS SCHEMA RULES 
    streetName: Yup.string().required("Required").matches(nameReg, "Only letters"),
    streetNum: Yup.number("Invalid street number"),
    suburb: Yup.string().required("Required").matches(nameReg, "Only letters"),
    crossRoad1: Yup.string()
        .required("Required"),
    crossRoad2: Yup.string()
        .required("Required"),

    // CAR SCHEMA RULES 
    plateNumber: Yup.string()
        .required("Required")
        .matches(plateReg, "Invalid plate number")
        .max(6, "Plate number less than 6 digits"),
    manufacturer: Yup.string()
        .required("Required"),
    model: Yup.string()
        .required("Required"),
    year: Yup.number("Invalid year")
        .required("Required")
        .min(4, "Year must be 4 digits"),
    body_type: Yup.string()
        .required("Required"),
    colour: Yup.string()
        .required("Required"),
});

const ServiceRequestCustomer = () => {
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    var userType = Object.keys(sessionStorage)[0];

    // return user if they are a member or ap
    if (userType === 'member' || userType === 'ap')
        return (<Redirect to='/'></Redirect>);

    // send data to backend and handle response 
    const submitForm = (values) => {

        const service = ({
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phoneNumber,
            streetName: values.streetName,
            streetNum: values.streetNum,
            suburb: values.suburb,
            nearestCrossroadArr: [values.crossRoad1, values.crossRoad2],
            plateNumber: values.plateNumber,
            manufacturer: values.manufacturer,
            model: values.model,
            year: values.year,
            body_type: values.body_type,
            colour: values.colour,
            serviceType: values.serviceType,
        });

        axios
            .post(SERVICE_URL, service)
            .then((res) => {
                if (res.data.result === "success") {
                    sessionStorage.setItem("service", JSON.stringify(res.data.newService));
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
                    <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 3, alignSelf: 'flex-start' }}>
                        Personal Details
                    </Typography>
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
                    <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 3, alignSelf: 'flex-start' }}>
                        Address
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                id="suburb"
                                label="Suburb"
                                value={values.suburb}
                                helperText={touched.suburb ? errors.suburb : ""}
                                error={touched.suburb && Boolean(errors.suburb)}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="crossRoad1"
                                label="Cross Road 1"
                                value={values.crossRoad1}
                                helperText={touched.crossRoad1 ? errors.crossRoad1 : ""}
                                error={touched.crossRoad1 && Boolean(errors.crossRoad1)}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="crossRoad2"
                                label="Cross Road 2"
                                value={values.crossRoad2}
                                helperText={touched.crossRoad2 ? errors.crossRoad2 : ""}
                                error={touched.crossRoad2 && Boolean(errors.crossRoad2)}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="streetNum"
                                label="Street Number"
                                type="number"
                                value={values.streetNum}
                                helperText={touched.streetNum ? errors.streetNum : ""}
                                error={touched.streetNum && Boolean(errors.streetNum)}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="streetName"
                                label="Street Name"
                                value={values.streetName}
                                helperText={touched.streetName ? errors.streetName : ""}
                                error={touched.streetName && Boolean(errors.streetName)}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 3, alignSelf: 'flex-start' }}>
                        Car
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="plateNumber"
                                label="Plate Number"
                                value={values.plateNumber}
                                helperText={touched.plateNumber ? errors.plateNumber : ""}
                                error={touched.plateNumber && Boolean(errors.plateNumber)}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                inputProps={{ maxLength: 6 }}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="manufacturer"
                                label="Manufacturer"
                                value={values.manufacturer}
                                helperText={touched.manufacturer ? errors.manufacturer : ""}
                                error={touched.manufacturer && Boolean(errors.manufacturer)}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="model"
                                label="Model"
                                value={values.model}
                                helperText={touched.model ? errors.model : ""}
                                error={touched.model && Boolean(errors.model)}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="year"
                                label="Year"
                                value={values.year}
                                helperText={touched.year ? errors.year : ""}
                                error={touched.year && Boolean(errors.year)}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                inputProps={{ maxLength: 4 }}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="body_type"
                                label="Body Type"
                                select
                                value={values.body_type}
                                helperText={touched.body_type ? errors.body_type : ""}
                                error={touched.body_type && Boolean(errors.body_type)}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange("body_type")}
                            >
                                <MenuItem value={"UTE"}>UTE</MenuItem>
                                <MenuItem value={"HATCH"}>HATCH</MenuItem>
                                <MenuItem value={"SUV"}>SUV</MenuItem>
                                <MenuItem value={"SEDAN"}>SEDAN</MenuItem>
                                <MenuItem value={"COUPE"}>COUPE</MenuItem>
                                <MenuItem value={"WAGON"}>WAGON</MenuItem>
                                <MenuItem value={"VAN"}>VAN</MenuItem>
                                <MenuItem value={"CONVERTIBLE"}>CONVERTIBLE</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="colour"
                                label="Colour"
                                value={values.colour}
                                helperText={touched.colour ? errors.colour : ""}
                                error={touched.colour && Boolean(errors.colour)}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="serviceType"
                                label="Service Type"
                                select
                                value={values.serviceType}
                                helperText={touched.serviceType ? errors.serviceType : ""}
                                error={touched.serviceType && Boolean(errors.serviceType)}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange("serviceType")}
                            >
                                <MenuItem value={"Unknown"}>Unknown</MenuItem>
                                <MenuItem value={"Flat Battery"}>Flat Battery</MenuItem>
                                <MenuItem value={"Engine Overheating"}>Engine Overheating</MenuItem>
                                <MenuItem value={"Car Won't Start"}>Car Won't Start</MenuItem>
                                <MenuItem value={"Can't Get In Car"}>Can't Get In Car</MenuItem>
                                <MenuItem value={"Flat Tyre"}>Flat Tyre</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                    <PaymentForm />
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
                        Request Service
                    </Button>
                </Box>
            </>
        );
    };

    return (
        <>
            <CssBaseline />
            {success ? (<Redirect to='/service-request-confirm'></Redirect>) : (
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
                            <Typography component="h1" variant="h4">
                                Request Service
                            </Typography>{" "}
                            <br />
                            {errMsg ? <Alert severity="error">{errMsg}</Alert> : ""}
                            <Formik
                                initialValues={{
                                    firstName: "",
                                    lastName: "",
                                    phoneNumber: "",
                                    streetName: "",
                                    streetNum: 1,
                                    suburb: "",
                                    crossRoad1: "",
                                    crossRoad2: "",
                                    plateNumber: "",
                                    manufacturer: "",
                                    model: "",
                                    year: 2022,
                                    body_type: "SUV",
                                    colour: "",
                                    serviceType: "Unknown"
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    submitForm(values);
                                    setSubmitting(false);
                                }}
                                validationSchema={RequestFormSchema}
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

export default ServiceRequestCustomer; 
