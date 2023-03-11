/* Confirming service request form card object as a place for the user
to await the acceptance from an assistance professional */ 

import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import {
    Grid,
    CssBaseline,
    Container,
    Button,
    Box,
    Typography,
    Paper,
    CircularProgress
} from "@mui/material";

import Footer from "../components/Footer";
import axios from "../api/axios";

const REQ_URL = "/ap-search";
const SERV_URL = "/service/resubmission"

const RequestServiceConfirmation = () => {

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    const service = JSON.parse(sessionStorage.getItem("service"));

    useEffect(() => {
        resubmitService({});
    }, []);

    // ask to see if an AP has accepted the service request every 5 seconds 
    function resubmitService(values) {
        const newService = ({
            serviceID: service.serviceID,
        });
        axios
            .post(SERV_URL, newService)
            .then((res) => {
                if (res.data.result === "success") {
                    sessionStorage.setItem("service", JSON.stringify(res.data.docs));
                    setSuccess(false);
                    const newAP = ({
                        assistProfID: service.assistProfID,
                    });
                    axios
                        .post(REQ_URL, newAP)
                        .then(function (res) {
                            if (res.data) {
                                console.log(res.data)
                                sessionStorage.setItem('service-ap', JSON.stringify(res.data));
                                setSuccess(true);
                                window.location.href = "/service-request-result"
                            } else {
                                setErrMsg("Waiting on assistance professional");
                                setSuccess(false);
                            }
                        })
                        .catch((err) => {
                            setSuccess(false);
                            setErrMsg(err.message);
                        });
                } else if (res.data.result === "error") {
                    setErrMsg("Something went wrong");
                    setSuccess(false);
                }
            })
            .catch((error) => {
                console.log(error);
                setSuccess(false);
                setErrMsg("Something went horribly wrong");
            });
        window.setTimeout(() => {
            resubmitService({});
            window.location.reload(false)
        }, 5000);
    };

    window.onload = function () {
        resubmitService({});
    }

    const form = ({
        handleSubmit,
    }) => {
        return (
            <>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0, mb: 0 }}>
                    <Grid container spacing={0} justifyContent="center">
                        <Typography variant="h6" gutterBottom sx={{ mt: 6, mb: 6 }}>
                            An Assistance Professional is on their way!
                        </Typography>
                        <Grid container spacing={2} justifyContent="space-between">
                            <Grid item xs={2} />
                            <Grid item xs={5}>
                                <Typography variant="h6" gutterBottom sx={{ mt: 1, mb: 1 }}>
                                    Call-Out Fee:
                                </Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography variant="body1" gutterBottom sx={{ mt: 1, mb: 1 }}>
                                    ${(service) ? service.callOutFee : ""}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} justifyContent="space-between">
                            <Grid item xs={2} />
                            <Grid item xs={4}>
                                <Typography variant="h6" gutterBottom sx={{ mt: 1, mb: 1 }}>
                                    Total Payment:
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" gutterBottom sx={{ mt: 1, mb: 1 }}>
                                    To Be Confirmed
                                </Typography>
                            </Grid>
                        </Grid>
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
                        Confirm and Continue
                    </Button>
                </Box>
            </>
        );
    };

    return (
        <>
            <CssBaseline />
            {success ? (<Redirect to='/service-request-result'></Redirect>) : (
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
                            <CircularProgress color="secondary" />
                            <Typography component="h1" variant="h5">
                                Service Request Confirmation
                            </Typography>{" "}

                            <Formik
                                initialValues={{
                                    serviceID: "",
                                }}
                                onSubmit={(service, { setSubmitting }) => {
                                    resubmitService(service);
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

export default RequestServiceConfirmation;
