import Drawer from "@mui/material/Drawer"
import Grid from "@mui/material/Grid"
import Box from "@mui/system/Box"
import React, { useEffect, useState } from "react"
import './App.css'
import CenterContent from "./components/CenterContent"
import SASContentObject from "./components/SASContentObject"
import CenterContext from "./contexts/CenterContext"

const vaInfo = { url: "https://gelenv-stable.pdcesx21047.race.sas.com" }

function App() {
    const [centerData, setCenterData] = useState({ type: null, uri: null, name: null })
    const [isContentSDKReady, setIsContentSDKReady] = useState(false)
    const [drawersDisplayed, setDrawersDisplayed] = useState(true)
    const [centerSize, setCenterSize] = useState(40)

    useEffect(() => {
        window.addEventListener("contentSdkComponents.loaded", () => {
            setIsContentSDKReady(true)
        })
    })

    useEffect(() => {
        const componentSize = { left: 30, center: 40, right: 30 }
        let centerSize = 100
        if (drawersDisplayed) {
            centerSize = centerSize - componentSize.left
            centerSize = centerSize - componentSize.right
        }
        setCenterSize(centerSize)
    }, [drawersDisplayed,centerSize])

    const handleDrawers = () => {
       setDrawersDisplayed(!drawersDisplayed)
    };

    return (
        <CenterContext.Provider value={{ centerData, setCenterData }}>
            <Box sx={{ justifyContent: "center" }}>
                <Drawer variant="persistent" anchor="left" open={drawersDisplayed}>
                    <Box sx={{ display: 'flex', width: "30vw" }}>
                        <SASContentObject objID="contentNavigator" url={vaInfo.url} display={isContentSDKReady} />
                    </Box>
                </Drawer>
                <Box sx={{ display: 'flex', justifyContent: "center", width: "100vw" }} >
                    <Box sx={{ display: 'flex', width: centerSize + "vw"}}>
                        <CenterContent
                            url={vaInfo.url}
                            data={centerData}
                            drawers={{maximized: drawersDisplayed , displayDrawers: handleDrawers}}
                        />
                    </Box>
                </Box>

                <Drawer variant="persistent" anchor="right" open={drawersDisplayed}>
                    <Grid container xs={12} direction="column" sx={{ display: 'flex', width: "30vw" }}>
                        <Grid item xs={3}>
                            <sas-report-object
                                packageUri='./reports/ICU Pressure'
                                objectName='ve25' >
                            </sas-report-object>
                        </Grid >
                        <Grid item xs={3}>
                            <sas-report-object
                                objectName="ve27648"
                                authenticationType="credentials"
                                url={vaInfo.url}
                                reportUri="/reports/reports/eb897d90-e4fd-4bdf-a764-b61af5c339b8">
                            </sas-report-object>
                        </Grid>
                    </Grid >
                </Drawer>
            </Box>
        </CenterContext.Provider >
    );
}

export default App
