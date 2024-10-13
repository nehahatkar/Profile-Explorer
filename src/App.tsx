import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import ProfileViewer from './component/ProfileViewer';
import AdminPanel from './component/AdminPanel';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<ProfileViewer />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;