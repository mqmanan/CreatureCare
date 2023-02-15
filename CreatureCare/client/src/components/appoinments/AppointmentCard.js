import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

const AppointmentCard = ({ appointment }) => {
    const navigate = useNavigate();

    return (
        <Card
            sx={{
                maxWidth: 240, boxShadow: 3
            }}
        >
            <CardMedia
                sx={{ height: 200 }}
                image={appointment?.user?.imageLocation}
                title={appointment?.user?.fullName}
                component='div'
            />
            <CardContent alignItems="center">
                <Typography gutterBottom variant="h5" component="div">
                    <b>{appointment?.user?.fullName}</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <b>Patient</b>:  {appointment?.creature?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <b>Appointment</b>: {appointment.dateRequested}
                </Typography>
            </CardContent>
            <CardActions display="flex" justifyContent="center">
                <Button
                    size="small"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center"
                    }}
                    onClick={() => { navigate(`/appointments/${appointment.id}`) }}>
                    See Details</Button>
            </CardActions>
        </Card>
    );
};

export default AppointmentCard;

