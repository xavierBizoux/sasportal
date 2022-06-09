import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import Typography from '@mui/material/Typography'
import React, { useContext, useEffect, useState } from "react"
import { vaInfo } from "../constants"
import LayoutContext from '../contexts/LayoutContext'


const CenterContent = (props) => {
    const [content, setContent] = useState(null)
    const [isHeaderVisible, setIsHeaderVisible] = useState(false)
    const { setLeftDrawerDisplayed, setRightDrawerDisplayed } = useContext(LayoutContext)
    const [isMaximized, setIsMaximized] = useState(false)

    useEffect(() => {
        switch (props.data.type) {
            case "report":
                setIsHeaderVisible(true)
                setContent(
                    <sas-report
                        authenticationType="credentials"
                        url={vaInfo.url}
                        reportUri={props.data.uri}>
                    </sas-report>
                )
                break
            default:
                setIsHeaderVisible(false)
                setContent(
                    <Typography variant="h3">Please select an object</Typography>
                )
                break
        }
    }, [props.data])

    const handleMaximize = () => {
        if (!isMaximized) {
            setRightDrawerDisplayed(false)
            setLeftDrawerDisplayed(false)
        } else {
            setRightDrawerDisplayed(true)
        }
        setIsMaximized(!isMaximized)
    }

    const header = (isVisible) => {
        if (isVisible) {
            return (
                <Grid container item>
                    <Grid item xs={11}>
                        <Typography variant="h3" sx={{ px: 2 }}>{props.data.name}</Typography>
                    </Grid>
                    <Grid item xs={1} sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <IconButton onClick={handleMaximize}>
                            {isMaximized === false ? <OpenInFullIcon /> : <CloseFullscreenIcon />}
                        </IconButton>
                    </Grid>
                </Grid>
            )
        }
    }

    return (
        <Grid container item direction="column" sx={{ display: "flex", justifyContent: "flex-start", width: .99 }}>
            <Grid container item sx={{ display: "flex", width: 1, justifyContent: "center", paddingTop: "1vh" }}>
                {header(isHeaderVisible)}
                <Grid item sx={{ display: "flex", justifyContent: "center", width: 1, minHeight: "85vh" }} >
                    {content}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CenterContent

