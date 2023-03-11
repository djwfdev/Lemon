/* Apart of the assistance professional dashboard where they can accept or deny
service requests (jobs) from their own personal list */ 

import React, { useState } from "react";
import {
    Box,
    Container,
    Grid,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Button,
    Alert
} from "@mui/material";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import axios from "../api/axios";

const ASSIGN_URL = "/assign/assistance-professional/";
const DENY_URL = "/deny/assistance-professional/";

function setService(list_id) {
    var apUser = JSON.parse(sessionStorage.getItem("ap"));
    const setService = {
        assistProfID: apUser.assistProfID,
        serviceID: list_id.jobID,
    };
    return setService;
}

const AvailableJobs = () => {
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    var apUser = JSON.parse(sessionStorage.getItem("ap"));

    // send data to backend and handle response 
    const acceptService = (values) => {
        axios
            .put(ASSIGN_URL + `${apUser._id}`, values)
            .then((res) => {
                if (res.data.result === "success") {
                    setSuccess(true);
                    sessionStorage.setItem("ap", JSON.stringify(res.data.doc));
                    window.scrollTo(500, 500); // scroll to top of jobs
                    window.location.reload(true);
                } else if (res.data.result === "error") {
                    setSuccess(false);
                    setErrMsg(res.data.message);
                }
            })
            .catch((err) => {
                setSuccess(false);
                setErrMsg(err.message);
            });
    };

    // send data to backend and handle response 
    const denyService = (values) => {
        axios
            .put(DENY_URL + `${apUser._id}`, values)
            .then((res) => {
                if (res.data.result === "success") {
                    setSuccess(true);
                    sessionStorage.setItem("ap", JSON.stringify(res.data.doc));
                    window.scrollTo(500, 500); // scroll to top of jobs
                    window.location.reload(true);
                } else if (res.data.result === "error") {
                    setSuccess(false);
                    setErrMsg(res.data.message);
                }
            })
            .catch((err) => {
                setSuccess(false);
                setErrMsg(err.message);
            });
    };

    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="lg">
                    <Typography sx={{ mb: 3 }} variant="h4">
                        Available Jobs
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            {errMsg ? <Alert severity="error">{errMsg}</Alert> : ""}
                            {success ? (
                                <Alert severity="success">{"Done"}</Alert>
                            ) : (
                                ""
                            )}
                            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                                {apUser.availableJobs.map((list) => (
                                    <ListItem sx={{ width: "100%" }} key={list._id}>
                                        <ListItemAvatar>
                                            <CarCrashIcon fontSize="large"></CarCrashIcon>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={list.serviceType}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: "inline", mr: 2 }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        Distance: <b>{list.distanceFromAP}km</b>
                                                    </Typography>
                                                    Car: <b>{list.plateNumber}</b>
                                                </React.Fragment>
                                            }
                                        />
                                        <Button
                                            variant="contained"
                                            onClick={() => acceptService({
                                                assistProfID: apUser.assistProfID,
                                                serviceID: list.jobID,
                                            })}
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            sx={{ ml: 2 }}
                                            onClick={() => denyService(setService(list))}
                                        >
                                            Deny
                                        </Button>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default AvailableJobs;
