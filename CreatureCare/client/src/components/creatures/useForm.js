import { Box } from '@mui/material';
// import { createTheme } from "@mui/material/";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";

export function useForm(initialUserChoiceValues) {

    const [userChoices, setUserChoices] = useState(initialUserChoiceValues);

    // how the data is captured in the form
    // const handleInputChange = e => {
    //     const { id, value } = e.target
    //     setUserChoices({
    //         ...userChoices,
    //         [id]: value
    //     })
    // }

    const handleInputChange = (event) => {
        const copy = { ...userChoices }
        copy[event.target.id] = event.target.value
        setUserChoices(copy)
    }

    return {
        userChoices,
        setUserChoices,
        handleInputChange
    }
}

export function Form(props) {

    return (
        <Box>
            <form>
                {props.children}
            </form>
        </Box>
    )
}