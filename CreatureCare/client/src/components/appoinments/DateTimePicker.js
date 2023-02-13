import { Stack, TextField } from "@mui/material";
import { DatePicker } from '@mui/lab'
import React, { useState } from "react";


export default function DateTimePicker() {
    const [userChoices, setUserChoices] = useState < Date | null > (null);

    console.log({ userChoices })

    return (
        <Stack spacing={4} sx={{ width: '250px' }} >
            <DatePicker
                label='Date Picker'
                renderInput={(params) => <TextField {...params} />}
                value={userChoices}
                onChange={(newValue) => {
                    setUserChoices(newValue)
                }}
            />
        </Stack >
    )
}