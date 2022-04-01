import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography'
import React from "react"


const CenterContent = (props) => {
    return (
        <Grid container item direction="column" sx={{ display: "flex", justifyContent: "center", width: .99 }}>
            <Grid item sx={{ display: "flex", width: 1, justifyContent: "center", paddingTop: "1vh" }}>
                <Typography variant="h3">{props.data.name}</Typography>
            </Grid>
        </Grid>
    )
}

export default CenterContent

