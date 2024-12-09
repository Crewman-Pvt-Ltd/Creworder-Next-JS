import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const StateWiseMap = () => {
  const [stateData, setStateData] = useState({});
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/state-wise-sales/');
        setStateData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchGeoJson = async () => {
      const response = await fetch('/path/to/your/states.geojson');
      const data = await response.json();
      setMapData(data);
    };

    fetchData();
    fetchGeoJson();
  }, []);

  const onEachState = (state, layer) => {
    const stateName = state.properties.name;
    const count = stateData[stateName] || 0;

    layer.bindPopup(`${stateName}: ${count}`);
    layer.on('click', () => {
      alert(`${stateName} has ${count} orders.`);
    });
  };

  return (
    <MapContainer center={[20, 77]} zoom={5} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {mapData && (
        <GeoJSON data={mapData} onEachFeature={onEachState} />
      )}
    </MapContainer>
  );
};
export default StateWiseMap;
