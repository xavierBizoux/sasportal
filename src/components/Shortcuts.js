import LinkIcon from '@mui/icons-material/Link'
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import { useEffect, useState } from "react"

const Shortcuts = (props) => {
    const [data, setData] = useState([])
    const [content, setContent] = useState()
    useEffect(() => {
        fetch("/data/SHORTCUTS.json")
            .then(response => response.json())
            .then(json => {
                setData(json.sort((a, b) => (a.position > b.position ? 1 : -1)))
            })
            .catch(error => console.log(error))
    }, [])
    useEffect(() => {
        const content = data.map(element =>
            <ListItem id={"shortcuts_" + element.position}>
                <ListItemButton component="a" href={element.href} target="_blank" rel="noopener" sx={{padding:0, margin: 0}}>
                    <LinkIcon sx={{mx: "5px"}}></LinkIcon>
                    <ListItemText>{element.label}</ListItemText>
                </ListItemButton>
            </ListItem>)
        setContent(content)
    }, [data])
    return (
        <Box>
            <List>
                {content}
            </List>
        </Box>
    )
}

export default Shortcuts