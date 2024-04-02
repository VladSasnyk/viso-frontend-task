import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import findKeyByIndex from './findKeyByIndex';


const URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : '';


const addNewMark = (map: mapboxgl.Map, lng: number, lat: number, index: number, markerIndicesRef: React.MutableRefObject<number[]>, setMarkers: React.Dispatch<React.SetStateAction<mapboxgl.Marker[]>>) => {
  
    
    const markerElement = document.createElement('div');
    markerElement.className = 'custom-marker';
    markerElement.innerHTML = `<div class="custom-marker-content">${index + 1}</div>`;


    const marker = new mapboxgl.Marker({
        element: markerElement,
        draggable: true
    })
        .setLngLat([lng, lat])
        .addTo(map);
    markerIndicesRef.current.push(index);
    marker.on('dragend', () => {
        updateMarkerPosition(index, marker.getLngLat());
    });
    
    setMarkers(prevMarkers => [...prevMarkers, marker]);
};

const updateMarkerPosition = async (index: number, lngLat: mapboxgl.LngLat) => {
    const key = await findKeyByIndex(index);
    axios.patch(`${URL}/marks/${key}.json`, {
        location: {
            lat: lngLat.lat,
            long: lngLat.lng
        }
    });

};



export default addNewMark;