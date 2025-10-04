import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRoadmaps } from '../api/roadmap.api';
import RoadmapCard from '../components/RoadmapCard';
import Loader from '../components/Loader';
import type { Roadmap } from "../types";

const Dashboard: React.FC = () => {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await getRoadmaps();
      setRoadmaps(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <section className="container">
      <div className="page-header">
        <h2>Your Roadmaps</h2>
        <div>
          <Link to="/roadmap/new" className="btn">New Roadmap</Link>
        </div>
      </div>

      {loading ? <Loader /> : (
        <div className="grid">
          {roadmaps.length === 0 && <div className="card muted">No roadmaps yet. Create one.</div>}
          {roadmaps.map(rm => <RoadmapCard key={rm._id} rm={rm} />)}
        </div>
      )}
    </section>
  );
};

export default Dashboard;
