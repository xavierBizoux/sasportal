import { Grid } from "@mui/material";
import './App.css';

function App() {
    return (
        <Grid container direction="row-reverse">
            <Grid container item xs={3} direction="column">
                <Grid item sx={{ minHeight:200 }}>
                    <sas-report-object
                        packageUri='./reports/ICU Pressure'
                        objectName='ve25' >
                    </sas-report-object>
                </Grid >
                <Grid item sx={{ minHeight: 400 }}>
                    <sas-report-object
                        objectName="ve33"
                        authenticationType="credentials"
                        url="https://live.lts.gel.race.sas.com"
                        reportUri="/reports/reports/a92331ad-634f-4392-a57e-fcc8e3c803cf">
                    </sas-report-object>
                </Grid>
            </Grid >
        </Grid >
    );
}

export default App
