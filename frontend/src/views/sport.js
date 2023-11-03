import React from "react";
import { Container } from "@mui/material";
import SportControl from "../components/sport_control";

const Sport = (props) => {
    const { name, logo, league, watches, handleWatch } = props
    return (
        <Container maxWidth={false} sx={{ marginTop: 2 }}>
            <SportControl name={name} logo={logo} league={league} watches={watches} handleWatch={handleWatch} />
        </Container>
    )

}
export default Sport;