import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Map from './Map';

interface Profile {
  id: number;
  name: string;
  description: string;
  image: string;
  latitude: number;
  longitude: number;
}

const ProfileDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    // For now, we'll use dummy data
    const dummyProfile: Profile = {
      id: parseInt(id || '0'),
      name: 'John Doe',
      description: 'Software Developer',
      image: 'https://via.placeholder.com/300',
      latitude: 40.7128,
      longitude: -74.0060
    };
    setProfile(dummyProfile);
  }, [id]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-details">
      <h2>{profile.name}</h2>
      <img src={profile.image} alt={profile.name} />
      <p>{profile.description}</p>
      <Map profile={profile} />
    </div>
  );
};

export default ProfileDetails;