/* Resulting service request form card object where a user can review the assistance
professional and the amount due for the service. */

import React, { useState } from "react";
import { Formik } from "formik";
import {
    Grid,
    CssBaseline,
    Container,
    Avatar,
    Button,
    TextField,
    Box,
    Typography,
    Paper
} from "@mui/material";

import CheckCircle from "@mui/icons-material/CheckCircle";
import Footer from "../components/Footer";
import axios from "../api/axios";

const REC_ID_URL = '/generate-receiptID';
const PAYCTRL_URL = '/new-payment-controller';

const RequestServiceResult = () => {

    const [/*success*/, setSuccess] = useState(false);
    const [/*errMsg*/, setErrMsg] = useState("");

    const service = JSON.parse(sessionStorage.getItem("service"));
    const ap = JSON.parse(sessionStorage.getItem("service-ap"));

    // payment calculation based on commission rate, call out fee and service type 
    var commission = (service.callOutFee + service.serviceTypePrice) / 10 * 3;
    var apPayment = service.callOutFee + service.serviceTypePrice - commission;

    // send data to backend and handle response 
    const submitForm = (values) => {
        const apRating = ({
            rating: values.assistProfRating,
        });

        const paymentController = ({
            motoristID: service.motoristID,
            assistProfID: ap.assistProfID,
            paymentType: "Card",
            amountDue: service.callOutFee + service.serviceTypePrice,
            paidToAP: apPayment,
            commissionFee: commission,
        });

        axios
            .post(PAYCTRL_URL, paymentController)
            .then((res) => {
                if (res.data.result === "success") {
                    console.log("Payment-controller success");
                    setSuccess(true);
                    setErrMsg("");
                }
            })
            .catch((err) => {
                setSuccess(false);
                setErrMsg(err);
            });

        axios
            .post(REC_ID_URL)
            .then((res) => {
                if (res.data.result === "success") {
                    console.log(res.data.newReceiptID);
                    sessionStorage.setItem("receiptID", JSON.stringify(res.data.newReceiptID));
                    setSuccess(true);
                    setErrMsg("");
                }
            })
            .catch((err) => {
                setSuccess(false);
                setErrMsg(err);
            });

        sessionStorage.setItem("apRating", JSON.stringify(apRating));
        window.location.href = "/service-receipt";
    };

    const form = ({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
    }) => {
        return (
            <>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0, mb: 0 }}>
                    <Grid container spacing={0} justifyContent="center">
                        <Grid container spacing={2} justifyContent="space-between">
                            <Grid item xs={6}>
                                <Typography variant="h6" gutterBottom sx={{ mt: 6, mb: 1 }}>
                                    Assistance Professional:
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" gutterBottom sx={{ mt: 6.2, mb: 1 }}>
                                    {!ap.firstName ? ("No one assigned") : ap.firstName} {!ap.lastName ? ("") : ap.lastName}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="space-between">
                            <Grid item xs={0.7} />
                            <Grid item xs={4.65}>
                                <Typography variant="h6" gutterBottom sx={{ mt: 1, mb: 1 }}>
                                    Service Purchased:
                                </Typography>
                            </Grid>
                            <Grid item xs={5.6}>
                                <Typography variant="body2" gutterBottom sx={{ ml: 0, mt: 1, mb: 1 }}>
                                    {service.serviceType}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="space-between">
                            <Grid item xs={1.05} />
                            <Grid item xs={4.35}>
                                <Typography variant="h6" gutterBottom sx={{ mt: 1, mb: 1 }}>
                                    Total Amount Due:
                                </Typography>
                            </Grid>
                            <Grid item xs={5.85}>
                                <Typography variant="body2" gutterBottom sx={{ ml: 1, mt: 1, mb: 1 }}>
                                    ${service.callOutFee + service.serviceTypePrice}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="center">
                            <Grid item xs={3} />
                            <Grid item xs={9}>
                                <Typography variant="h6" gutterBottom sx={{ mt: 5, mb: 1 }}>
                                    How Was Your Experience?:
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="center">
                            <Grid item xs={12}>
                                <TextField
                                    id="assistProfRating"
                                    label="Assistance Professional Rating (Out of 5)"
                                    type="number"
                                    value={values.assistProfRating}
                                    helperText={touched.assistProfRating ? errors.assistProfRating : ""}
                                    error={touched.assistProfRating && Boolean(errors.assistProfRating)}
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            padding: "14px 20px",
                            mt: 3,
                            mb: 0,
                        }}
                    >
                        Pay Total and Print Receipt
                    </Button>
                </Box>
            </>
        );
    };

    return (
        <>
            <CssBaseline />
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
                            <CheckCircle />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Service Request Result
                        </Typography>{" "}
                        <Formik
                            initialValues={{
                                assistProfRating: ""
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                submitForm(values);
                                setSubmitting(false);
                            }}
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

export default RequestServiceResult;
