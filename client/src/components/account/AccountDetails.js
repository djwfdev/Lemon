import React, { useState } from 'react';
import { Formik } from "formik";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    Alert
} from '@mui/material';

import * as Yup from "yup";
import axios from "../../api/axios";
import { parse, isDate } from "date-fns";

// check if DOB is real date 
function parseDateString(value, originalValue) {
    const parsedDate = isDate(originalValue)
        ? originalValue
        : parse(originalValue, "yyyy-MM-dd", new Date());

    return parsedDate;
}

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

const AccountProfileDetails = () => {

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    var userType = Object.keys(sessionStorage)[0];
    const user = JSON.parse(sessionStorage.getItem(userType));
    var EDIT_URL = '/edit/' + userType + '/';

    if (!user)
        setErrMsg("Cannot retrieve user!");

    // send data to backend and handle response 
    const submitForm = (values) => {
        axios
            .put(EDIT_URL + `${user._id}`, values)
            .then((res) => {
                if (res.data.result === "success") {
                    setSuccess(true);
                    sessionStorage.setItem(userType, JSON.stringify(res.data.docs));
                    window.location.reload();
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
    }) => {
        return (
            <Box>
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <Card variant="outlined">
                        <CardHeader
                            subheader="The information can be edited"
                            title="Profile"
                        />
                        <Divider />
                        <CardContent>
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
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
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
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
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
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
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        id="phoneNumber"
                                        label="Phone Number"
                                        type="number"
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
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
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
                                            max: new Date().toISOString().split("T")[0],
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
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
                        </CardContent>
                        <Divider />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                p: 2
                            }}
                        >
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                size="medium"
                            >
                                Save details
                            </Button>
                        </Box>
                    </Card>
                </form>
            </Box>
        )
    };

    return (
        <>
            {errMsg ? <Alert severity="error">{errMsg}</Alert> : ""}
            {success ? <Alert severity="success">{"Changed details successfully"}</Alert> : ""}
            <Formik
                initialValues={{
                    firstName: `${user.firstName}`,
                    lastName: `${user.lastName}`,
                    dob: new Date(`${user.dob}`).toISOString().split("T")[0],
                    email: `${user.email}`,
                    password: `${user.password}`,
                    phoneNumber: `${user.phoneNumber}`,
                }}
                onSubmit={(values, { setSubmitting }) => {
                    submitForm(values);
                    setSubmitting(false);
                }}
                validationSchema={SignUpSchema}
            >
                {form}
            </Formik>
        </>
    );
};

export default AccountProfileDetails; 