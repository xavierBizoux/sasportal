import Drawer from "@mui/material/Drawer"
import React, { useContext } from "react"
import { vaInfo } from "../constants"
import LayoutContext from "../contexts/LayoutContext"
import SASContentObject from "./SASContentObject"

const ContentDrawer = () => {
    const {leftDrawerDisplayed, isContentSDKReady} = useContext(LayoutContext)
    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={leftDrawerDisplayed}
            PaperProps={{ style: { top: 64 } }}
            sx={{ width: "30vw", flexShrink: 0, }}>
            <SASContentObject objID="contentNavigator" url={vaInfo.url} display={isContentSDKReady} />
        </Drawer>
    )
}

export default ContentDrawer