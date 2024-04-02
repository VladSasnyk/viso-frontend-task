import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import findKeyByIndex from '../utils/findKeyByIndex';
import pushNewMark from '../utils/pushNewMark';
import { deleteLastMark, deleteAllMarks } from '../utils/deleteMark';


if (process.env.REACT_APP_API_KEY) {
    mapboxgl.accessToken = process.env.REACT_APP_API_KEY
}

const URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : '';

const MapComponent: React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const markerIndicesRef = useRef<number[]>([]);
    const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);

    useEffect(() => {
        // map create
        const map = new mapboxgl.Map({
            container: mapContainerRef.current!,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [24.359656505400523, 49.02854927505396],
            zoom: 8,
            attributionControl: false
        });

        const fetchData = async () => {
            try {
                const response = await axios.get(URL + '/marks.json');
                const data = response.data;

                if (data) {
                    Object.values(data).forEach((item: any, index: number) => {
                        const { location } = item;
                        const { lat, long } = location;
                        addNewMark(long, lat, index);
                    });
                }


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        //add new mark
        const addNewMark = (lng: number, lat: number, index: number) => {
            const marker = new mapboxgl.Marker({
                draggable: true
            })
                .setLngLat([lng, lat])
                .addTo(map);
            marker.getElement().innerHTML = `<div class="custom-marker">${index + 1}</div>`;
            markerIndicesRef.current.push(index);
            marker.on('dragend', () => {
                updateMarkerPosition(index, marker.getLngLat());
            });
            setMarkers(prevMarkers => [...prevMarkers, marker])
        };
        //update mark position when dragg and fetching new location
        const updateMarkerPosition = async (index: number, lngLat: mapboxgl.LngLat) => {
            const key = await findKeyByIndex(index);
            axios.patch(`${URL}/marks/${key}.json`, {
                location: {
                    lat: lngLat.lat,
                    long: lngLat.lng
                }
            });

        };

        map.on('load', async () => {
            fetchData();
        });


        map.on('click', (e) => {
            pushNewMark(e);
            addNewMark(e.lngLat.lng, e.lngLat.lat, markerIndicesRef.current.length);
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
