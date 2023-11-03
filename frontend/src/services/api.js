import { Auth } from 'aws-amplify';
import axios from 'axios';

const getWatches = async () => {
    const jwt = await fetchJwtToken();
    const res = await axios.get(process.env.REACT_APP_WATCH_API, {
        headers: {
            Authorization: jwt
        }
    })
    const watches_map = {}
    res.data.watches.forEach((watch) => {
        watches_map[watch.id] = watch;
    })
    return watches_map;
}

const postWatch = async (id) => {
    const jwt = await fetchJwtToken();
    const res = await axios.post(process.env.REACT_APP_WATCH_API,
        {
            id: id
        },
        {
            headers: {
                Authorization: jwt
            }
        }
    );
}
const deleteWatch = async (id) => {
    const jwt = await fetchJwtToken();
    const res = await axios.delete(process.env.REACT_APP_WATCH_API, {
        data: {
            id: id
        },
        headers: {
            Authorization: jwt
        }
    });
}

const getFootballCalendar = async (league, year, is_default) => {
    if (is_default) {
        const url = `https://site.api.espn.com/apis/site/v2/sports/football/${league}/scoreboard`;
        const res = await axios.get(url);
        const ret = {
            calendar: res.data.leagues[0].calendar,
            current_year: res.data.season.year,
            current_season_type: res.data.season.type,
            current_week: res.data.week.number
        };
        return ret;
    }
    else {
        const url = `https://site.api.espn.com/apis/site/v2/sports/football/${league}/scoreboard?dates=${year}`;
        const res = await axios.get(url);
        return {
            calendar: res.data.leagues[0].calendar,
        };
    }

}

const getFootballWeekSchedule = async (league, year, season_type, week) => {
    const url = `https://site.api.espn.com/apis/site/v2/sports/football/${league}/scoreboard?dates=${year}&week=${week}&seasontype=${season_type}`;
    const res = await axios.get(url);
    return res.data.events;
}

const getYears = () => {
    const two_thousand = 2000;
    const years = [];
    const event = new Date();
    for (let i = two_thousand; i <= event.getFullYear(); i++) {
        years.push(i);
    }
    return years;
}

const getNFLData = async () => {
    const res = await axios.get('http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard');
    const watch_map = await getWatches();
    const data = res.data.events.map((event) => {
        return {
            ...event,
            watched: watch_map[event.id] ? true : false
        }
    })
    const league_data = res.data.leagues[0];
    return { events: data, name: league_data.abbreviation, logo: league_data.logos[0].href };
}

const fetchJwtToken = async () => {
    try {
        const session = await Auth.currentSession();
        const token = session.getIdToken().getJwtToken();
        return token;
    } catch (error) {
        console.log('Error fetching JWT token:', error);
        return null;
    }
};



export {
    getWatches,
    postWatch,
    deleteWatch,
    getNFLData,
    fetchJwtToken,
    getFootballCalendar,
    getFootballWeekSchedule,
    getYears
} 