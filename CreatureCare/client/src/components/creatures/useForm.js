import Paper from '@mui/material/Paper';
// import { createTheme } from "@mui/material/";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";

export function useForm(initialUserChoiceValues) {

    const [userChoices, setUserChoices] = useState(initialUserChoiceValues);

    // how the data is captured in the form
    const handleInputChange = e => {
        const { id, value } = e.target
        setUserChoices({
            ...userChoices,
            [id]: value
        })
    }

    // const handleInputChange = (event) => {
    //     const copy = { ...userChoices }
    //     copy[event.target.id] = event.target.value
    //     setUserChoices(copy)
    // }

    return {
        userChoices,
        setUserChoices,
        handleInputChange
    }
}

// const usetheme = createTheme((theme) => ({
//     root: {
//         '&.Mui-focused': {
//             width: '80%',
//             margin: theme.spacing(1)
//         }
//     },
//     pageContent: {
//         margin: theme.spacing(5),
//         padding: theme.spacing(3)
//     }
// }))

export function Form(props) {

    return (
        <Paper>
            <form>
                {props.children}
            </form>
        </Paper>
    )
}