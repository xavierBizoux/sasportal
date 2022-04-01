import { Grid } from "@mui/material"
import React, { useEffect, useState } from "react"
import './App.css'
import CenterContent from "./components/CenterContent"
import SASContentObject from "./components/SASContentObject"
import CenterContext from "./contexts/CenterContext"

const vaInfo = { url: "https://gelenv-stable.pdcesx21047.race.sas.com" }

function App() {
    const [centerData, setCenterData] = useState({ type: null, uri: null, name: null })
    const [isContentSDKReady, setIsContentSDKReady] = useState(false)
    useEffect(() => {
        window.addEventListener("contentSdkComponents.loaded", () => {
            setIsContentSDKReady(true)
        })
    })
    return (
        <CenterContext.Provider value={{ centerData, setCenterData }}>
            <Grid container direction="row-reverse">
                <Grid container item xs={3} direction="column">
                    <Grid item sx={{ minHeight: 200 }}>
                        <sas-report-object
                            packageUri='./reports/ICU Pressure'
                            objectName='ve25' >
                        </sas-report-object>
                    </Grid >
                    <Grid item sx={{ minHeight: 400 }}>
                        <sas-report-object
                            objectName="ve27648"
                            authenticationType="credentials"
                            url={vaInfo.url}
                            reportUri="/reports/reports/eb897d90-e4fd-4bdf-a764-b61af5c339b8">
                        </sas-report-object>
                    </Grid>
                </Grid >
                <Grid container item xs={6} direction="column" >
                    <Grid container item>
                        <CenterContent url={vaInfo.url} data={centerData} />
                    </Grid>
                </Grid>
                <Grid container item xs={3} direction="column">
                    <Grid item>
                        <SASContentObject objID="contentNavigator" url={vaInfo.url} display={isContentSDKReady} />
                    </Grid>
                </Grid>
            </Grid >
        </CenterContext.Provider>
    );
}

export default App
