import React from 'react';
import type { Roadmap } from '../types';
import { Link } from 'react-router-dom';

const RoadmapCard: React.FC<{rm: Roadmap}> = ({ rm }) => {
  return (
    <article className="card roadmap-card">
      <div className="card-body">
        <h3>{rm.title}</h3>
        <p className="muted">Goal: {rm.goal}</p>
        <p className="muted">Steps: {rm.steps?.length || 0}</p>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <Link to={`/roadmap/${rm._id}`} className="btn-outline">View</Link>
          <Link to={`/roadmap/edit/${rm._id}`} className="btn">Edit</Link>
        </div>
      </div>
    </article>
  );
};

export default RoadmapCard;
