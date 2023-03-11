import React from 'react';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Divider,
    Typography
} from '@mui/material';

// convert the user's full name into a random colour for the profile picture
function stringToColour(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let colour = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        colour += `00${value.toString(16)}`.slice(-2);
    }
    return colour;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColour(name),
            height: 64,
            mb: 2,
            width: 64,
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

const AccountProfile = () => {

    var userType = Object.keys(sessionStorage)[0];
    const user = JSON.parse(sessionStorage.getItem(userType));

    if (!user)
        return (<></>);

    return (
        <>
            <Box>
                <Card variant="outlined">
                    <CardContent>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Avatar {...stringAvatar(`${user.firstName} ${user.lastName}`)} />
                            <Typography
                                color="textPrimary"
                                gutterBottom
                                variant="h5"
                            >
                                {`${user.firstName} ${user.lastName}`}
                            </Typography>
                            <Typography
                                color="textSecondary"
                                variant="body2"
                            >
                                <i className="fas fa-envelope"></i> {user.email}
                            </Typography>
                            <Typography
                                color="textSecondary"
                                variant="body2"
                            >
                                <i className="fas fa-phone"></i> {user.phoneNumber}
                            </Typography>
                        </Box>
                    </CardContent>
                    <Divider />
                </Card>
            </Box>
        </>
    );
};

export default AccountProfile; 