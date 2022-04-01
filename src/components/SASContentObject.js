import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import React, { useContext, useEffect, useRef } from "react"
import CenterContext from "../contexts/CenterContext"


const SASContentObject = (props) => {
    const { setCenterData } = useContext(CenterContext)
    const group = useRef()
    const breadcrumb = useRef()
    const tree = useRef()
    const area = useRef()

    useEffect(() => {
        if (props.display) {
            const myFolderIdentifier = {
                type: "persistentLocation",
                value: "myFolder"
            }
            const favoritesIdentifier = {
                type: "persistentLocation",
                value: "favorites",
                preventExpansion: true
            }
            const sasContentIdentifier = {
                type: "persistentLocation",
                value: "root"
            }
            group.current.initialNavigationValue = {
                location: myFolderIdentifier,
                locationContextPath: [myFolderIdentifier],
                locations: [myFolderIdentifier, favoritesIdentifier, sasContentIdentifier]
            }
            const queryString = "in(contentType,'report', 'folder', 'jobDefinition')"
            group.current.initialFilterValue = {
                queryModeFilter: queryString
            }
            area.current.onSelect = (selectedItems, selectAll, lastSelectedItem, selected) => {
                if (lastSelectedItem.resource.type.sasType !== "folder") {
                    setCenterData({ type: lastSelectedItem.resource.type.typeDefName, uri: lastSelectedItem.id, name: lastSelectedItem.name })
                }
            }
        }
    }, [props.display, setCenterData])

    const content = (
        <sas-content-group ref={group}>
            <sas-content-tree url={props.url} ref={tree}></sas-content-tree>
            <sas-content-breadcrumb url={props.url} ref={breadcrumb}></sas-content-breadcrumb>
            <sas-content-area url={props.url} ref={area}
                selection-mode="single"
                initial-selection-index="0"></sas-content-area>
        </sas-content-group>
    )
    const loading = (
        <Box sx={{ display: 'flex', justifyContent:"center", padding:"10vh"}}>
            <CircularProgress />
        </Box>
    )
    return props.display ? content : loading
}

export default SASContentObject