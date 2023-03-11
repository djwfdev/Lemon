/* Display receipts within the member dashboard */

import React from "react";
import {
    Box,
    Container,
    Grid,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
} from "@mui/material";
import ReceiptIcon from '@mui/icons-material/Receipt';

const Receipts = () => {

    var smUser = JSON.parse(sessionStorage.getItem("member"));

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
                        Receipts
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                                {smUser.receipts.map((list) => (
                                    <ListItem sx={{ width: "100%" }} key={list._id}>
                                        <ListItemAvatar>
                                            <ReceiptIcon fontSize="large"></ReceiptIcon>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={list.serviceType}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: "inline", mr: 2 }}
                                                        component="span"
                                                        color="text.primary"
                                                    >
                                                        Payment Date: <b>{list.paymentDate}</b>
                                                    </Typography>
                                                    <Typography
                                                        sx={{ display: "inline", mr: 2 }}
                                                        component="span"
                                                        color="text.primary"
                                                    >
                                                        Payment Amt: <b>${list.amountPaid}</b>
                                                    </Typography>
                                                    <Typography
                                                        sx={{ display: "inline", mr: 2 }}
                                                        component="span"
                                                        color="text.secondary"
                                                    >
                                                        Service Purchased: <b>{list.servicePurchased}</b>
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
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

export default Receipts;
