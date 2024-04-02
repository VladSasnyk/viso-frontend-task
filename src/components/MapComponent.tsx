import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

//functions

import pushNewMark from '../utils/pushNewMark';
import { deleteLastMark, deleteAllMarks } from '../utils/deleteMark';
import addingExistingMarks from '../utils/addingExistingMarks';
import addNewMark from '../utils/addNewMark';


if (process.env.REACT_APP_API_KEY) {
    mapboxgl.accessToken = process.env.REACT_APP_API_KEY
}

const MapComponent: React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const markerIndicesRef = useRef<number[]>([]);
    const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current!,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [24.359656505400523, 49.02854927505396],
            zoom: 8,
            attributionControl: false
        });
        map.on('load', async () => {
            addingExistingMarks(map,markerIndicesRef,setMarkers);
        });
        map.on('click', (e) => {
            pushNewMark(e);
            addNewMark(map, e.lngLat.lng, e.lngLat.lat,markerIndicesRef.current.length, markerIndicesRef, setMarkers);
        }
        );
        return () => map.remove();
    }, []);

    return <>
        <div
            ref={mapContainerRef}
            style={{ width: '80vw', height: '80vh', cursor: 'pointer', marginTop: '50px' }} />
        <div className='buttons'>
            <button onClick={() => deleteLastMark({ markers, markerIndicesRef })}>Clear last mark</button>
            <button onClick={() => deleteAllMarks({ markers, markerIndicesRef })}>Clear all marks</button>
        </div>

    </>;
};

export default MapComponent;
