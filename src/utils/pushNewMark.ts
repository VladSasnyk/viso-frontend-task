import createNewDate from "./createNewDate";
import axios from "axios";

const URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : '';

const pushNewMark = async (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    const { data } = await axios.get(URL+'/marks.json');
    if (data) {
        const array = [...Object.values(data), {
            location: {
                lat: e.lngLat.lat,
                long: e.lngLat.lng
            },
            timestamp: createNewDate()
        }]
        axios.put(URL+'/marks.json', array);
    } else {
        axios.put(URL+'/marks.json', [{
            location: {
                lat: e.lngLat.lat,
                long: e.lngLat.lng
            },
            timestamp: createNewDate()
        }]);
    }
}

export default pushNewMark;