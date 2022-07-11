import Button from "@mui/material/Button"
import React from "react"
import { instance } from "../util/credentials"

const Logon = (props) => {
    return <Button onClick={() => { instance.loginPopup().then(props.onSuccess) }} sx={{ color: "white" }}>
        Login
    </Button>
}

export default Logon
