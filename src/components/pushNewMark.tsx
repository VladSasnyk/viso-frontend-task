import createNewDate from "./createNewDate";
import axios from "axios";

const URL = 'https://viso-task-70f56-default-rtdb.europe-west1.firebasedatabase.app/marks.json';

const pushNewMark = async (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    const { data } = await axios.get(URL);
    if (data) {
        const array = [...Object.values(data), {
            location: {
                lat: e.lngLat.lat,
                long: e.lngLat.lng
            },
            timestamp: createNewDate()
        }]
        axios.put(URL, array);
    } else {
        axios.put(URL, [{

            location: {
                lat: e.lngLat.lat,
                long: e.lngLat.lng
            },
            timestamp: createNewDate()
        }]);
    }
}

export default pushNewMark;