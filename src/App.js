import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import React, { useEffect, useState } from "react"
import './App.css'
import CenterContent from "./components/CenterContent"
import ContentDrawer from "./components/ContentDrawer"
import RightDrawer from "./components/RightDrawer"
import SASAppBar from "./components/SASAppBar"
import LayoutContext from "./contexts/LayoutContext"
import { instance } from "./util/credentials"

function App() {
    const [centerData, setCenterData] = useState({ type: null, uri: null, name: null })
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isContentSDKReady, setIsContentSDKReady] = useState(false)
    const [leftDrawerDisplayed, setLeftDrawerDisplayed] = useState(true)
    const [rightDrawerDisplayed, setRightDrawerDisplayed] = useState(true)
    const [centerSize, setCenterSize] = useState({})
    const [content, setContent] = useState()

    useEffect(() => {
        window.addEventListener("contentSdkComponents.loaded", () => {
            setIsContentSDKReady(true)
        })
    })

    useEffect(() => {
        instance.checkAuthenticated().then(
            () => { setIsAuthenticated(true) },
            () => { setIsAuthenticated(false) }
        )
    }, [])

    useEffect(() => {
        let width = 100
        let leftMargin = 0
        let rightMargin = 0
        if (leftDrawerDisplayed) {
            width -= 30
            leftMargin += 30
        }
        if (rightDrawerDisplayed) {
            width -= 30
            rightMargin += 30
        }
        setCenterSize({ width: `${width}vw`, marginLeft: `${leftMargin}vw`, marginRight: `${rightMargin}vw` })
    }, [leftDrawerDisplayed, rightDrawerDisplayed])

    useEffect(() => {
        if (isAuthenticated) {
            setContent(
                <Box sx={{ justifyContent: "center", flexDirection: "row" }}>
                    <ContentDrawer />
                    <Box sx={{ ...centerSize }}>
                        <CenterContent
                            data={centerData}
                        />
                    </Box>
                    <RightDrawer />
                </Box >
            )
        } else {
            setContent(
                <Typography variant="h3">You are not authenticated!</Typography>
            )
        }
    }, [isAuthenticated, centerData, centerSize])

    const contextValue = {
        centerData,
        setCenterData,
        isAuthenticated,
        setIsAuthenticated,
        leftDrawerDisplayed,
        setLeftDrawerDisplayed,
        rightDrawerDisplayed,
        setRightDrawerDisplayed,
        isContentSDKReady
    }

    return (
        <LayoutContext.Provider value={contextValue}>
            <Box sx={{ justifyContent: "center", flexDirection: "row" }}>
                <SASAppBar />
                {content}
            </Box >
        </LayoutContext.Provider >
    )
}

export default App
