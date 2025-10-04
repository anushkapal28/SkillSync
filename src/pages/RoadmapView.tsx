import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRoadmap } from '../api/roadmap.api';
import type { Roadmap } from '../types';

const RoadmapView: React.FC = () => {
  const { id } = useParams();
  const [rm, setRm] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      try {
        const res = await getRoadmap(id);
        setRm(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="card">Loading...</div>;
  if (!rm) return <div className="card">Roadmap not found</div>;

  return (
    <section className="container">
      <div className="page-header">
        <div>
          <h2>{rm.title}</h2>
          <p className="muted">Goal: {rm.goal}</p>
        </div>
        <div>
          <Link to={`/roadmap/edit/${rm._id}`} className="btn">Edit</Link>
        </div>
      </div>

      <div className="card">
        {rm.steps.map((s, idx) => (
          <div key={idx} className="roadmap-step">
            <h3>{idx + 1}. {s.title}</h3>
            <p>{s.description}</p>
            <p className="muted">Duration: {s.durationWeeks || 1} week(s)</p>
            {s.resources && s.resources.length > 0 && (
              <details>
                <summary>Resources ({s.resources.length})</summary>
                <ul>
                  {s.resources.map((r, i) => <li key={i}><a href={r} target="_blank" rel="noreferrer">{r}</a></li>)}
                </ul>
              </details>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default RoadmapView;
