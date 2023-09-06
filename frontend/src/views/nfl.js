import React, { useEffect, useState } from "react";

import { Button, Container, Typography } from "@mui/material";
import { deleteWatch, getNFLData, getWatches, postWatch } from "../services/api";
import Loading from "../components/loader";
import League from "../components/league";
import EventList from "../components/EventList/event_list";

const NFL = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const getApiData = async () => {
        try {
            const new_data = await getNFLData();
            setData(new_data);
            setLoading(false)
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }
    useEffect(() => {
        getApiData()
    }, [])
    const handler = async (event) => {
        try {
            let bool = false;
            if (event.watched) {
                await deleteWatch(event.id);
            }
            else {
                bool = true;
                await postWatch(event.id);
            }
            const array = data.events.map((e) => {
                if (e.id === event.id) {
                    return {
                        ...event,
                        watched: bool
                    }
                }
                else {
                    return e
                }
            })
            setData({
                ...data,
                events: array
            })
        }
        catch (err) {

        }
    }
    if (loading) {
        return (
            <Loading />
        )
    }
    else if (data) {
        let amount = 0;
        data.events.forEach((event) => {
            if (event.watched) {
                amount++;
            }
        })
        return (
            <Container maxWidth={false} sx={{ marginTop: 2 }}>
                <League name={data.name} logo={data.logo} amount={amount} />
                <EventList events={data.events} handler={handler} />
            </Container>
        )
    }
    else {
        return (
            <Typography>Error</Typography>
        )
    }

}
export default NFL;