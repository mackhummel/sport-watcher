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

const getNFLData = async () => {
    const res = await axios.get('/nfl_data.json');
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
    fetchJwtToken
} 