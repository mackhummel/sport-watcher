import React, { useEffect, useRef, useState } from "react";
import { Typography, FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { getFootballCalendar, getFootballWeekSchedule, getYears } from "../services/api";
import Loading from "./loader";
import EventList from "./EventList/event_list";
import League from "./league";

const SportControl = (props) => {
    const { league, name, logo, watches, handleWatch } = props;
    const years = getYears();
    const [loading, setLoading] = useState(true)
    const [calendarData, setCalendarData] = useState(null);
    const [events, setEvents] = useState([]);
    const [selections, setSelections] = useState({ year: years[years.length - 1] });

    const handleYearChange = (event) => {
        setSelections({
            season_type: 2,
            week: 1,
            year: event.target.value
        });
    }
    const handleSeasonTypeChange = (event) => {
        setSelections({
            season_type: parseInt(event.target.value),
            week: 1,
            year: selections.year
        });
    }
    const handleWeekChange = (event) => {
        setSelections({
            season_type: selections.season_type,
            week: parseInt(event.target.value),
            year: selections.year
        });
    }

    const selectionChange = async () => {
        try {
            const new_data = await getFootballWeekSchedule(league, selections.year, selections.season_type, selections.week);
            setEvents(new_data);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    useEffect(() => {
        if (selections.year && selections.week && selections.season_type) {
            selectionChange();
        }
    }, [selections]);

    const init = async () => {
        try {
            const new_data = await getFootballCalendar(league, new Date().getFullYear(), true);
            setSelections({
                year: new_data.current_year,
                season_type: new_data.current_season_type,
                week: new_data.current_week
            });
            setCalendarData(new_data.calendar);
            setLoading(false)
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }
    useEffect(() => {
        init();
    }, []);

    if (loading) {
        return (
            <Loading />
        )
    }
    else {
        return (
            <>
                <League name={name} logo={logo} />
                <FormControl>
                    <InputLabel id="select-label-year">Year</InputLabel>
                    <Select
                        labelId="select-label-year"
                        value={selections.year}
                        label="Year"
                        onChange={handleYearChange}
                    >
                        {years.map((year) => <MenuItem key={year} value={year}>{year}</MenuItem>)}

                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="select-label-type">Season Type</InputLabel>
                    <Select
                        labelId="select-label-type"
                        value={selections.season_type}
                        label="Season Type"
                        onChange={handleSeasonTypeChange}
                    >
                        {calendarData.map((type) => <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="select-label-week">Week</InputLabel>
                    <Select
                        labelId="select-label-week"
                        value={selections.week}
                        label="Week"
                        onChange={handleWeekChange}
                    >
                        {calendarData[calendarData.findIndex((week) => parseInt(week.value) === selections.season_type)].entries.map((week) => <MenuItem key={week.value} value={week.value}>{week.label}</MenuItem>)}
                    </Select>
                </FormControl>
                {/* <Typography variant='h6'>Watched this week: </Typography> */}
                <EventList events={events} watches={watches} handler={handleWatch}/>
            </>
        )
    }
}

export default SportControl;