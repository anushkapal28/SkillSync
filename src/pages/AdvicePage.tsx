import React, { useEffect, useState } from 'react';
import { getAdvice, requestAdviceNow } from '../api/advice.api';
import type { Advice } from '../types';

const AdvicePage: React.FC = () => {
  const [advices, setAdvices] = useState<Advice[]>([]);
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState('');
  const [reqLoading, setReqLoading] = useState(false);

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await getAdvice();
      setAdvices(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const requestNow = async () => {
    setReqLoading(true);
    try {
      const res = await requestAdviceNow({ topic });
      setAdvices(prev => [res.data, ...prev]);
      setTopic('');
    } catch (err) {
      alert('Request failed');
    } finally {
      setReqLoading(false);
    }
  };

  return (
    <section className="container">
      <div className="card">
        <h2>AI Advice</h2>
        <p className="muted">You also get weekly advice — this panel lets you request advice immediately.</p>
        <label>Topic (optional)</label>
        <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. better time management" />
        <button className="btn" onClick={requestNow} disabled={reqLoading}>{reqLoading ? 'Requesting...' : 'Request Now'}</button>
      </div>

      <div style={{ marginTop: 16 }}>
        {loading ? <div className="card">Loading advice...</div> :
          advices.length === 0 ? <div className="card muted">No advice yet.</div> : (
            advices.map(a => (
              <div key={a._id} className="card small">
                <h3>{a.title}</h3>
                <p>{a.body}</p>
                <p className="muted small">{new Date(a.createdAt || '').toLocaleString()}</p>
              </div>
            ))
          )}
      </div>
    </section>
  );
};

export default AdvicePage;
