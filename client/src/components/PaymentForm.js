/* Default payment form used across app */

import * as React from 'react';
import { Typography, Grid, TextField } from '@mui/material';

const PaymentForm = () => {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 3 }}>
                Payment method
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cardName"
                        label="Name on card"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cardNumber"
                        label="Card number"
                        type="number"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="dob"
                        label="Expiry Date"
                        type="month"
                        fullWidth
                        inputProps={{
                            min: "2022-06",
                            max: "2999-01",
                        }}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cvv"
                        label="CVV"
                        type="number"
                        helperText="Last three digits on signature strip"
                        fullWidth
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default PaymentForm; 