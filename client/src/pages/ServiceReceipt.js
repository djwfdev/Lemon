/* Service request receipt card object which simply displays the receipt to the user
and sends that receipt to the member's dashboard (if it is a member service request) */

import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import {
    Grid,
    CssBaseline,
    Container,
    Avatar,
    Button,
    Box,
    Typography,
    Paper,
} from "@mui/material";

import CheckCircle from "@mui/icons-material/CheckCircle";
import Footer from "../components/Footer";
import axios from "../api/axios";

const RECEIPT_URL = '/motorist-receipt'

const ServiceReceipt = () => {

    const dateNow = new Date().toLocaleString();

    const [success, setSuccess] = useState(false);
    const [/*errMsg*/, setErrMsg] = useState("");

    const service = JSON.parse(sessionStorage.getItem("service"));
    const ap = JSON.parse(sessionStorage.getItem("service-ap"));
    const apRating = JSON.parse(sessionStorage.getItem("apRating"));
    const newReceiptID = JSON.parse(sessionStorage.getItem("receiptID"));

    var userType = Object.keys(sessionStorage)[0];

    var totalAmountDue = service.callOutFee + service.serviceTypePrice;

    // send data to backend and handle response 
    const submitReceipt = (values) => {
        const motoristReceipt = ({
            receiptID: newReceiptID,
            motoristID: service.motoristID,
            assistProfID: ap.assistProfID,
            assistProfRating: apRating.rating,
            amountPaid: totalAmountDue,
            paymentDate: dateNow,
            servicePurchased: service.serviceType
        });

        axios
            .post(RECEIPT_URL, motoristReceipt)
            .then((res) => {
                // add receipt to member object 
                if (res.data.result === "success") {
                    sessionStorage.setItem("member", JSON.stringify(res.data.doc));
                    setSuccess(true);
                    setErrMsg("");
                }
            })
            .catch((err) => {
                setSuccess(false);
                setErrMsg(err);
            });
    };

    const form = ({
        handleSubmit,
    }) => {
        return (
            <>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0, mb: 0 }}>
                    <Grid container spacing={0} justifyContent="center">
                        <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 6 }}>
                            Here are the details of your transaction:
                        </Typography>
                        <Grid container spacing={2} justifyContent="space-between">
                            <Grid item xs={3} />
                            <Grid item xs={5}>
                                <Typography variant="h6" gutterBottom sx={{ mt: 1, mb: 1 }}>
                                    Receipt ID:
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1" gutterBottom sx={{ mt: 1, mb: 1 }}>
                                    {newReceiptID}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} justifyContent="space-between">
                            <Grid item xs={3} />
                            <Grid item xs={5}>
                                <Typography variant="h6" gutterBottom sx={{ mt: 1, mb: 1 }}>
                                    Motorist ID:
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1" gutterBottom sx={{ mt: 1, mb: 1 }}>
                                    {service.motoristID}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} justifyContent="space-between">
                            <Grid item xs={3} />
                            <Grid item xs={5}>
                                <Typography variant="h6" gutterBottom sx={{ mt: 1, mb: 1 }}>
                                    Assistance Professional ID:
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1" gutterBottom sx={{ mt: 1, mb: 1 }}>
                                    {ap.assistProfID}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} justifyContent="space-between">
                            <Grid item xs={3} />
                            <Grid item xs={5}>
                                <Typography variant="h6" gutterBottom sx={{ mt: 1, mb: 1 }}>
                                    Assistance Professional Rating:
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1" gutterBottom sx={{ mt: 1, mb: 1 }}>
                                    {apRating.rating}/5
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} justifyContent="space-between">
                            <Grid item xs={3} />
                            <Grid item xs={5}>
                                <Typography variant="h6" gutterBottom sx={{ mt: 1, mb: 1 }}>
                                    Total Amount Paid:
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1" gutterBottom sx={{ mt: 1, mb: 1 }}>
                                    ${totalAmountDue}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} justifyContent="space-between">
                            <Grid item xs={3} />
                            <Grid item xs={5}>
                                <Typography variant="h6" gutterBottom sx={{ mt: 1, mb: 1 }}>
                                    Payment Date:
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1" gutterBottom sx={{ mt: 1, mb: 1 }}>
                                    {dateNow}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} justifyContent="space-between">
                            <Grid item xs={3} />
                            <Grid item xs={5}>
                                <Typography variant="h6" gutterBottom sx={{ mt: 1, mb: 1 }}>
                                    Service Purchased:
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1" gutterBottom sx={{ mt: 1, mb: 1 }}>
                                    {service.serviceType}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography variant="h5" gutterBottom sx={{ mt: 6, mb: 0 }}>
                            Thank You!
                        </Typography>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            padding: "8px 20px",
                            mt: 3,
                            mb: 0,
                        }}
                    >
                        Return Home
                    </Button>
                </Box>
            </>
        );
    };

    return (
        <>
            <CssBaseline />
            {success ? (<Redirect to='/'></Redirect>) : (
                <Container component="main" maxWidth="md">
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
                                <CheckCircle />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Service Receipt
                            </Typography>{" "}
                            <Formik
                                initialValues={{
                                    receiptID: newReceiptID,
                                    motoristID: service.motoristID,
                                    assistProfID: ap.assistProfID,
                                    assistProfRating: apRating.rating,
                                    amountPaid: totalAmountDue,
                                    paymentDate: dateNow,
                                    servicePurchased: service.serviceType
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    submitReceipt(values);
                                    setSubmitting(false);
                                }}
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

export default ServiceReceipt;