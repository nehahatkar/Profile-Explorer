import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Map from './Map';

interface Profile {
  id: number;
  name: string;
  description: string;
  image: string;
  address: string;
  
}
interface MapProfile extends Profile {
  latitude: number;
  longitude: number;
}

const ProfileList: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch profiles from API
    // For now, we'll use dummy data
    const dummyProfiles: Profile[] = [
      { id: 1, name: 'John Doe', description: 'Software Developer', image: 'https://via.placeholder.com/150', address: 'New York, NY' },
      { id: 2, name: 'Jane Smith', description: 'UX Designer', image: 'https://via.placeholder.com/150', address: 'San Francisco, CA' },
      
    ];
    setProfiles(dummyProfiles);
  }, []);

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="row">
      <div className="col-md-8">
        <h2 className="mb-4">Profiles</h2>
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search profiles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="row">
          {filteredProfiles.map(profile => (
            <div key={profile.id} className="col-md-6 mb-4">
              <div className="card">
                <img src={profile.image} className="card-img-top" alt={profile.name} />
                <div className="card-body">
                  <h5 className="card-title">{profile.name}</h5>
                  <p className="card-text">{profile.description}</p>
                  <Link to={`/profile/${profile.id}`} className="btn btn-primary mr-2">View Details</Link>
                  <button className="btn btn-secondary" onClick={() => setSelectedProfile(profile)}>Show on Map</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-md-4">
      <Map profile={selectedProfile as MapProfile | null} />
      </div>
    </div>
  );
};

export default ProfileList;