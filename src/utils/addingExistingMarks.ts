import axios from "axios";
import addNewMark from "./markOperation";
const URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : '';


const addingExistingMarks = async (map: mapboxgl.Map,markerIndicesRef: React.MutableRefObject<number[]>,setMarkers: React.Dispatch<React.SetStateAction<mapboxgl.Marker[]>>) => {
    try {
        const response = await axios.get(URL + '/marks.json');
        const data = response.data;

        if (data) {
            Object.values(data).forEach((item: any, index: number) => {
                const { location } = item;
                const { lat, long } = location;
                addNewMark(map,long, lat, index,markerIndicesRef,setMarkers);
            });
        }


    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default addingExistingMarks;