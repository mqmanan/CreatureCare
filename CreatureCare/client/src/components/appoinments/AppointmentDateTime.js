import * as React from 'react';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Container } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function MaterialUIPickers() {
    const navigate = useNavigate();

    const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleSaveButtonClick = (e) => {
        e.preventDefault(); //prevents page from reloading

        // const newPatient = { ...userChoices }

        // if (
        //     userChoices.name &&
        //     userChoices.type &&
        //     userChoices.origin &&
        //     userChoices.gender &&
        //     userChoices.birthdate &&
        //     userChoices.description &&
        //     userChoices.userProfileId
        // ) {
        //     addCreature(newPatient) // EDIT THIS!!!
        //         .then(() => { navigate("/patients") });
        // }
    };

    return (
        <Container>

            <Typography variant="h3" align="center" pb={3}>
                Schedule Appointment
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                    <DesktopDatePicker
                        label="Date desktop"
                        inputFormat="MM/DD/YYYY"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <MobileDatePicker
                        label="Date mobile"
                        inputFormat="MM/DD/YYYY"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <TimePicker
                        label="Time"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <DateTimePicker
                        label="Date&Time picker"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Stack>
            </LocalizationProvider>

            <Stack direction="row" spacing={2} mt={3}>

                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    endIcon={<SendIcon />}
                    onClick={handleSaveButtonClick}>
                    Send
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    endIcon={<ClearIcon />}
                    onClick={() => { navigate("/") }}>
                    Cancel
                </Button>

            </Stack>

        </Container>
    );
}