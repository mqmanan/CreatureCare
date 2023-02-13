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
            sx={{ maxWidth: 330, boxShadow: 3 }}
            columns={3}
        >
            <CardMedia
                sx={{ height: 200 }}
                image={appointment?.userProfile?.imageLocation}
                title={appointment?.userProfile?.fullName}
            />
            <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                    {appointment?.userProfile?.fullName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <b>Patient</b>:  {appointment?.creature?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <b>Date</b>: {appointment.dateRequested}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    onClick={() => { navigate(`/patients/${appointment.id}`) }}>
                    See Details</Button>
            </CardActions>
        </Card>
    );
};

export default AppointmentCard;

{/* <Grid item xs={12} sm={6} md={3}>
<Card
    sx={{ maxWidth: 345 }}
    columns={3}
>
    <CardHeader
        action={
            <IconButton>
                <AccountBoxIcon />
            </IconButton>
        }
        title={appoint} */}


