import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface Profile {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

interface MapProps {
  profile: Profile|null;
}

const containerStyle = {
  width: '100%',
  height: '300px'
};

const Map: React.FC<MapProps> = ({ profile }) => {
  if (!profile) {
    return <div>No profile selected</div>; // or any other fallback you want
  }
  const center = {
    lat: profile.latitude,
    lng: profile.longitude
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        <Marker
          position={center}
          title={profile.name}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;