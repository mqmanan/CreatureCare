import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

export default function PatientCard({ creature }) {
    const navigate = useNavigate();

    return (
        <div>
            <Card
                sx={{ maxWidth: 315, boxShadow: 3 }}
            >
                <CardMedia
                    sx={{
                        height: 200,
                        '--Grid-borderWidth': '2px',
                        borderTop: 'var(--Grid-borderWidth) solid',
                        borderColor: 'divider',
                    }}
                    image={creature.imageLocation}
                    title="creature image"
                    component='div'
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                        {creature.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <b>Human companion</b>:  {creature?.user?.fullName}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        onClick={() => { navigate(`/patients/${creature.id}`) }}>
                        See Details</Button>
                </CardActions>
            </Card>
        </div>
    );
};


