import React from "react";
import "../App.css";
import Footer from "../components/Footer";
import {
    Box,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Button,
    Paper,
    Typography,
    CssBaseline,
    Container,
} from "@mui/material";

const steps = [
    {
        label: "Request service",
        description: `Whether you're a member or not, go to 'Request Service' and complete 
                         the form. `,
    },
    {
        label: "Payment",
        description: `Once your new request has been created, you will be prompted to make a
                        payment if you are not a member.`,
    },
    {
        label: "Assistance Professional will come to you",
        description: `An assistance professional will see and accept your request, given your
                        location and details of service needed. You will then recieve the details
                         of the Assistance Professional that is coming to you.`,
    },
    {
        label: "Leave a Review",
        description: `Once the service is complete, leave a review.`,
    },
];

const HowItWorks = () => {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <>
            <React.Fragment>
                <CssBaseline />
                <Container maxwidth={600} height={90}>
                    <Box
                        p={5}
                        m={10}
                        sx={{
                            mx: "auto",
                            maxWidth: 600,
                            bgcolor: "secondary.main",
                            borderRadius: 10,
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            How it works
                        </Typography>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((step, index) => (
                                <Step key={step.label}>
                                    <StepLabel
                                        optional={
                                            index === 3 ? (
                                                <Typography variant="caption">Last step</Typography>
                                            ) : null
                                        }
                                    >
                                        {step.label}
                                    </StepLabel>
                                    <StepContent>
                                        <Typography>{step.description}</Typography>
                                        <Box sx={{ mb: 2 }}>
                                            <div>
                                                <Button
                                                    variant="contained"
                                                    onClick={handleNext}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    {index === steps.length - 1 ? "Finish" : "Continue"}
                                                </Button>
                                                <Button
                                                    disabled={index === 0}
                                                    onClick={handleBack}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    Back
                                                </Button>
                                            </div>
                                        </Box>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length && (
                            <Paper square elevation={0} sx={{ p: 3 }}>
                                <Typography>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                                    Reset
                                </Button>
                            </Paper>
                        )}
                    </Box>
                </Container>
            </React.Fragment>
            <Footer />
        </>
    );
};

export default HowItWorks;
