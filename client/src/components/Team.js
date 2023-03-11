/* Meet the team */

import React from 'react';

import {
    Grid,
    Paper,
    Typography,
    Box,
    Avatar,
} from "@mui/material";
import { Container } from '@mui/system';

const members = [
    {
        name: 'Juilet Gorban',
        flag: 'Front-end, Documentation',
        course: 'Bachelor of Computer Science (SENG), Creative Arts (VAD)',
    },
    {
        name: 'Cayden Darley',
        flag: 'Front-end, Back-end, Database',
        course: 'Bachelor of Computer Science (GMDV,CS42)',
    },
    {
        name: 'Benjamin Le',
        flag: 'Back-end, Database',
        course: 'Bachelor of Information Technology (NDM)',
    },
    {
        name: 'Dylan Weber-Freel',
        flag: 'Front-end, Back-end, Database',
        course: 'Bachelor of Computer Science (GMD)',
    },
    {
        name: 'Lyon Fan',
        flag: 'Back-end, Database',
        course: 'Bachelor of Computer Science (DSS)',
    },
    {
        name: 'James Logan',
        flag: 'Back-end, Database',
        course: 'Bachelor of Computer Science (DSS)',
    },
    {
        name: 'Quoc Tuan Nguyen',
        flag: 'Testing, Back-end',
        course: 'Bachelor of Computer Science',
    },
    {
        name: 'Sukru Kaymak',
        flag: 'Documentation',
        course: 'Bachelor of Information Technology (NDM)',
    },
    {
        name: 'Nathan Meacham',
        flag: 'Documentation',
        course: 'Bachelor of Computer Science',
    },
];

const Team = () => (
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
                    Meet the Team
                </Typography>
                <Grid container spacing={10}>
                    {members.map(member => (
                        <Grid key={member.name} item xs={12} md={4}>
                            <Paper>
                                <Grid item>
                                    <Avatar src={`images/people/${member.name}.jpg`}
                                        sx={{ ml: 2, width: 56, height: 56 }} />
                                </Grid>
                                <Grid container wrap="nowrap">
                                    <Grid item sx={{ margin: '10px' }}>
                                        <Typography component="h2" variant="h5">
                                            {member.name}
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            <b>{member.flag}</b>
                                        </Typography>
                                        <Typography color="textSecondary">{member.course}</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    </>
);

export default Team;
