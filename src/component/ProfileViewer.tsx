import React, { useState, useEffect } from 'react';
import Map from './Map';

interface Profile {
  id: number;
  name: string;
  description: string;
  image: string;
  latitude: number;
  longitude: number;
}

const ProfileViewer: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  useEffect(() => {
    // Fetch profiles from an API or use dummy data
    const dummyProfiles: Profile[] = [
      {
        id: 1,
        name: 'John Doe',
        description: 'Software Developer',
        image: 'https://via.placeholder.com/150',
        latitude: 40.7128,
        longitude: -74.0060
      },
      {
        id: 2,
        name: 'Jane Smith',
        description: 'UX Designer',
        image: 'https://via.placeholder.com/150',
        latitude: 34.0522,
        longitude: -118.2437
      }
    ];
    setProfiles(dummyProfiles);
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">Profile Viewer</h1>
      <div className="row">
        <div className="col-md-8">
          <div className="list-group">
            {profiles.map(profile => (
              <button
                key={profile.id}
                className={`list-group-item list-group-item-action ${selectedProfile?.id === profile.id ? 'active' : ''}`}
                onClick={() => setSelectedProfile(profile)}
              >
                {profile.name}
              </button>
            ))}
          </div>
        </div>
        <div className="col-md-4">
          {selectedProfile ? (
            <>
              <h2>{selectedProfile.name}</h2>
              <img src={selectedProfile.image} alt={selectedProfile.name} className="img-fluid mb-3" />
              <p>{selectedProfile.description}</p>
              <Map profile={selectedProfile} />
            </>
          ) : (
            <p>Select a profile to view details and map location.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileViewer;