import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import React, { useContext, useState } from "react"
import { vaInfo } from "../constants"
import LayoutContext from "../contexts/LayoutContext"

const RightDrawer = () => {
    const { rightDrawerDisplayed } = useContext(LayoutContext)
    const [topComponent, setTopComponent] = useState({
        type: "reportPackage",
        uri: "./reports/ICU Pressure",
        objectName: "ve25"
    })
    const [midComponent, setMidComponent] = useState({
        type: "reportViya",
        uri: "/reports/reports/eb897d90-e4fd-4bdf-a764-b61af5c339b8",
        objectName: "ve27648"
    })
    const [bottomComponent, setBottomComponent] = useState({
        type: "chatbot",
        uri: '/naturalLanguageConversations/bots/ca433b17-157b-46e9-9d60-d91d81991639',
    })
    return (
        <Drawer
            variant="persistent"
            anchor="right"
            open={rightDrawerDisplayed}
            PaperProps={{ style: { top: 64 } }}
            sx={{ width: "30vw", flexShrink: 0, }}>
            <Box sx={{ display: "flex", width: "30vw", flexDirection: "column" }}>
                <Box sx={{ minHeight: "30vh" }}>
                    <sas-report-object
                        packageUri={topComponent.uri}
                        objectName={topComponent.objectName} >
                    </sas-report-object>
                </Box>
                <Box sx={{ minHeight: "30vh" }}>
                    <sas-report-object
                        objectName={midComponent.objectName}
                        authenticationType="credentials"
                        url={vaInfo.url}
                        reportUri={midComponent.uri}>
                    </sas-report-object>
                </Box>
                <Box sx={{ minHeight: "30vh", maxHeight: "30vh", overflow: "auto" }}>
                    <sas-chat url={vaInfo.url}
                        botUri={bottomComponent.uri}
                        authenticationType="credentials"
                        connectorName="ChatBot_Portal"
                    ></sas-chat>
                </Box>
            </Box>
        </Drawer>
    )
}

export default RightDrawer