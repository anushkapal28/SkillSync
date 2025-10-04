import React, { useEffect, useState } from 'react';
import { getProgress, updateProgress } from '../api/progress.api';
import type { ProgressItem } from '../types';

const ProgressPage: React.FC = () => {
  const [items, setItems] = useState<ProgressItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await getProgress();
      setItems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  const toggle = async (it: ProgressItem) => {
    try {
      const res = await updateProgress(it._id!, { completed: !it.completed });
      setItems(prev => prev.map(p => p._id === it._id ? res.data : p));
    } catch (err) { console.error(err); }
  };

  return (
    <section className="container">
      <h2>Progress</h2>
      {loading ? <div className="card">Loading...</div> : (
        <div className="grid">
          {items.length === 0 ? <div className="card muted">No progress yet.</div> :
            items.map(it => (
              <div key={it._id} className="card progress-card">
                <h3>Step #{it.stepIndex + 1}</h3>
                <p className="muted">{it.notes}</p>
                <button className={it.completed ? 'btn-success' : 'btn-outline'} onClick={() => toggle(it)}>
                  {it.completed ? 'Completed' : 'Mark complete'}
                </button>
              </div>
            ))
          }
        </div>
      )}
    </section>
  );
};

export default ProgressPage;
