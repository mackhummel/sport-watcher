import React from "react";
import { ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
import { Visibility, VisibilityOutlined } from "@mui/icons-material";

const EventItem = (props) => {
    const { event, handler } = props;
    const date = new Date(event.date).toLocaleString();
    return (
        <ListItemButton onClick={()=>handler(event)}>
            <ListItemText
                primary={event.name}
                primaryTypographyProps={{ sx: { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' } }}
                secondary={date}
            />
            <ListItemIcon>
                {event.watched ? <Visibility/> : <VisibilityOutlined/>}
            </ListItemIcon>
        </ListItemButton>
    )
}

export default EventItem;