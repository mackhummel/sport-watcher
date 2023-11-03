import React from "react";
import { List, Box, Typography } from "@mui/material";
import EventItem from "./event_item";

const EventList = (props) => {
    const { events, handler, watches } = props;
    return (
        <Box textAlign='center'>
            <List>
                {events.map((event) => {
                    return (

                        <EventItem key={event.id} watched={watches[event.id]} event={event} handler={handler} />

                    )
                })}
            </List>
        </Box>
    )
}

export default EventList;