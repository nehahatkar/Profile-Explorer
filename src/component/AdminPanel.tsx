import React, { useState, useEffect } from 'react';

interface Profile {
  id: number;
  name: string;
  description: string;
  image: string;
  address: string;
}

const AdminPanel: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [newProfile, setNewProfile] = useState<Omit<Profile, 'id'>>({
    name: '',
    description: '',
    image: '',
    address: ''
  });

  useEffect(() => {
    // Fetch profiles from API
    // For now, we'll use dummy data
    const dummyProfiles: Profile[] = [
      { id: 1, name: 'John Doe', description: 'Software Developer', image: 'https://via.placeholder.com/150', address: 'New York, NY' },
      { id: 2, name: 'Jane Smith', description: 'UX Designer', image: 'https://via.placeholder.com/150', address: 'San Francisco, CA' },
    ];
    setProfiles(dummyProfiles);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProfile({ ...newProfile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add new profile to the list (in a real app, you'd send this to an API)
    const newId = Math.max(...profiles.map(p => p.id)) + 1;
    setProfiles([...profiles, { ...newProfile, id: newId }]);
    setNewProfile({ name: '', description: '', image: '', address: '' });
  };

  const handleDelete = (id: number) => {
    // Remove profile from the list (in a real app, you'd send this to an API)
    setProfiles(profiles.filter(p => p.id !== id));
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <input type="text" className="form-control" name="name" value={newProfile.name} onChange={handleInputChange} placeholder="Name" required />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" name="description" value={newProfile.description} onChange={handleInputChange} placeholder="Description" required />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" name="image" value={newProfile.image} onChange={handleInputChange} placeholder="Image URL" required />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" name="address" value={newProfile.address} onChange={handleInputChange} placeholder="Address" required />
        </div>
        <button type="submit" className="btn btn-primary">Add Profile</button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map(profile => (
            <tr key={profile.id}>
              <td>{profile.name}</td>
              <td>{profile.description}</td>
              <td>{profile.address}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(profile.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;