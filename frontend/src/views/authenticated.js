import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { deleteWatch, getWatches, postWatch } from "../services/api";
import Loading from "../components/loader";
import NavBar from "../components/navbar";
import Sport from "./sport";
import Home from "./home";

const Authenticated = (props) => {
    const { signOut } = props;
    const [watches, setWatches] = useState(null);
    const [loading, setLoading] = useState(true);
    const getWatchData = async () => {
        try {
            const new_data = await getWatches();
            setWatches(new_data);
            setLoading(false)
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }
    useEffect(() => {
        getWatchData();
    }, []);

    const handleWatch = async (event) => {
        try {
            let new_watches = { ...watches };
            if (watches[event.id]) {
                await deleteWatch(event.id);
                delete new_watches[event.id];
            }
            else {
                await postWatch(event.id);
                new_watches[event.id] = event;
            }
            setWatches(new_watches);
        }
        catch (err) {
            console.error('Could not modify watch')
            alert('Could not modify watch')
        }
    }


    if (loading) {
        return (
            <Loading />
        )
    }
    else {
        return (
            <BrowserRouter >
                <NavBar signOut={signOut} />
                <Routes>
                    <Route exact path='/' element={<Home watched={Object.entries(watches).length} />} />
                    <Route exact path='/nfl' element={<Sport logo='/nfl_logo.png' league='nfl' name='NFL' handleWatch={handleWatch} watches={watches} />} />
                    <Route exact path='/ncaaf' element={<Sport logo='/ncaaf_logo.png' league='college-football' name='NCAA Football Top 25' handleWatch={handleWatch} watches={watches} />} />
                    <Route path='*' element={<Navigate to='/' replace />} />
                </Routes>
            </BrowserRouter>
        );
    }

}
export default Authenticated;