import axios from "axios";

const URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : '';

export const deleteLastMark = async ({ markers, markerIndicesRef }: { markers: any[], markerIndicesRef: React.MutableRefObject<number[]> }) => {
    const lastMarker = markers.pop(); //
    lastMarker?.remove();
    try {
        const { data } = await axios.get(URL + '/marks.json');
        const array = [...Object.values(data)]
        array.pop();
        markerIndicesRef.current.pop();
        axios.put(URL + '/marks.json', array);
    } catch (error) {
        console.log(error)
    }
};

export const deleteAllMarks = async ({ markers, markerIndicesRef }: { markers: any[], markerIndicesRef: React.MutableRefObject<number[]> }) => {
    markers.forEach(marker => {
        marker.remove();
        markerIndicesRef.current.pop();
    });
    axios.put(URL + '/marks.json', []);
}