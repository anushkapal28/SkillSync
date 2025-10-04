import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/dashboard';
import RoadmapEditor from './pages/RoadmapEditor';
import RoadmapView from './pages/RoadmapView';
import ProgressPage from './pages/ProgressPage';
import AdvicePage from './pages/AdvicePage';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 80 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/roadmap/new" element={<RoadmapEditor />} />
            <Route path="/roadmap/edit/:id" element={<RoadmapEditor />} />
            <Route path="/roadmap/:id" element={<RoadmapView />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/advice" element={<AdvicePage />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
