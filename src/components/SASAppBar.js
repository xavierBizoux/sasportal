import AccountTreeIcon from '@mui/icons-material/AccountTree'
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import React, { useContext, useEffect, useState } from "react"
import { vaInfo } from '../constants'
import LayoutContext from '../contexts/LayoutContext'
import Logon from './Logon'

export default function SASAppBar() {
    const [content, setContent] = useState(null)
    const [userInfo, setUserInfo] = useState({})
    const { isAuthenticated, setIsAuthenticated, leftDrawerDisplayed, setLeftDrawerDisplayed } = useContext(LayoutContext)

    useEffect(() => {
        if (isAuthenticated) {
            fetch(`${vaInfo.url}/identities/users/@currentUser`, {
                credentials: 'include'
            }).then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response
            }).then(data => setUserInfo(data))
                .catch(error => console.log(error))
        }
    }, [isAuthenticated])

    useEffect(() => {
        if (!isAuthenticated) {
            setContent(<Logon onSuccess={() => setIsAuthenticated(true)} />)
        } else if (Object.keys(userInfo).length !== 0) {
            setContent(<Typography> {userInfo.name}</Typography>)
        }
    }, [isAuthenticated, setIsAuthenticated, userInfo])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => setLeftDrawerDisplayed(!leftDrawerDisplayed)}
                    >
                        <AccountTreeIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        My Portal
                    </Typography>
                    {content}
                </Toolbar>
            </AppBar>
        </Box>
    )
}
