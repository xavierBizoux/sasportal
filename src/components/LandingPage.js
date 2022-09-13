import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import Shortcuts from "./Shortcuts"

const LandingPage = (props) => {
    const [data, setData] = useState([])
    const [topRight, setTopRight] = useState()
    const [topLeft, setTopLeft] = useState()
    const [bottomRight, setBottomRight] = useState()
    const [bottomLeft, setBottomLeft] = useState()
    useEffect(() => {
        const location = window.location.href
        fetch(location + "/data/LANDING.json")
            .then(response => response.json())
            .then(json => {
                setData(json)
            })
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        const generateElement = (element, position) => {
            let content
            switch (element.type) {
                case "shortcuts":
                    content = <Shortcuts></Shortcuts>
                    break
                case "sas-report-object":
                    console.log("pathname : " + window.location.pathname)
                    content = <sas-report-object
                        packageUri={window.location.pathname === "/" ? element.info.packageUri : window.location.pathname + element.info.packageUri}
                        objectName={element.info.objectName} >
                    </sas-report-object>
                    break
                default:
                    content = <Typography>Type not defined</Typography>
                    break
            }
            switch (element.position) {
                case "topRight":
                    setTopRight(content)
                    break
                case "topLeft":
                    setTopLeft(content)
                    break
                case "bottomLeft":
                    setBottomLeft(content)
                    break
                case "bottomRight":
                    setBottomRight(content)
                    break
                default:
                    break
            }
        }
        if (data !== []) {
            data.map(element => generateElement(element, element.position))
        }
    }, [data])
    return (
        <Grid container fixed sx={{ maxWidth: "70vw", marginX: "15vw", marginTop: "1vh" }}>
            <Grid item container xs={12} sx={{ minHeight: "40vh", maxHeight: "40vh" }}>
                <Grid item xs={6} sx={{ border: "2px solid", borderColor: "primary.main", borderRadius: "5px" }}>
                    {topLeft}
                </Grid>
                <Grid item xs={6} sx={{ border: "2px solid", borderColor: "primary.main", borderRadius: "5px" }}>
                    {topRight}
                </Grid>
            </Grid>
            <Grid item container xs={12} sx={{ minHeight: "40vh", maxHeight: "40vh" }}>
                <Grid item xs={6} sx={{ border: "2px solid", borderColor: "primary.main", borderRadius: "5px" }}>
                    {bottomLeft}
                </Grid>
                <Grid item xs={6} sx={{ border: "2px solid", borderColor: "primary.main", borderRadius: "5px" }}>
                    {bottomRight}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default LandingPage