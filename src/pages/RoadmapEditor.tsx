import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createRoadmap, getRoadmap, updateRoadmap, generateRoadmapAI } from '../api/roadmap.api';
import type { Roadmap, RoadmapStep } from '../types';

const emptyStep = (): RoadmapStep => ({ title: '', description: '', durationWeeks: 1, resources: [] });

const RoadmapEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [personality, setPersonality] = useState('');
  const [steps, setSteps] = useState<RoadmapStep[]>([emptyStep()]);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    if (id) {
      (async () => {
        setLoading(true);
        try {
          const res = await getRoadmap(id);
          const rm: Roadmap = res.data;
          setTitle(rm.title);
          setGoal(rm.goal);
          setPersonality(rm.personality || '');
          setSteps(rm.steps.length ? rm.steps : [emptyStep()]);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id]);

  const addStep = () => setSteps(s => [...s, emptyStep()]);
  const removeStep = (index: number) => setSteps(s => s.filter((_, i) => i !== index));
  const updateStep = (index: number, part: Partial<RoadmapStep>) => {
    setSteps(s => s.map((st, i) => i === index ? { ...st, ...part } : st));
  };

  const save = async () => {
    try {
      setLoading(true);
      const payload: Partial<Roadmap> = { title, goal, personality, steps };
      if (id) {
        await updateRoadmap(id, payload);
      } else {
        await createRoadmap(payload);
      }
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAI = async () => {
    if (!goal) return alert('Provide a goal to generate from AI');
    setAiLoading(true);
    try {
      const res = await generateRoadmapAI({ goal, personality });
      const aiRm = res.data as Roadmap;
      if (aiRm) {
        setTitle(aiRm.title || `${goal} roadmap`);
        setSteps(aiRm.steps.length ? aiRm.steps : []);
      }
    } catch (err) {
      console.error(err);
      alert('AI generation failed');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <section className="container card">
      <h2>{id ? 'Edit Roadmap' : 'New Roadmap'}</h2>
      <label>Title</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Goal</label>
      <input value={goal} onChange={(e) => setGoal(e.target.value)} />
      <label>Personality / Style (optional)</label>
      <input value={personality} onChange={(e) => setPersonality(e.target.value)} placeholder="e.g. visual learner, hands-on" />
      <div style={{ marginTop: 10 }}>
        <button className="btn" onClick={save} disabled={loading}>{loading ? 'Saving...' : 'Save Roadmap'}</button>
        <button className="btn-outline" onClick={handleGenerateAI} disabled={aiLoading} style={{ marginLeft: 8 }}>
          {aiLoading ? 'Generating...' : 'Generate with AI'}
        </button>
      </div>

      <h3 style={{ marginTop: 20 }}>Steps</h3>
      {steps.map((s, i) => (
        <div key={i} className="card small">
          <label>Step Title</label>
          <input value={s.title} onChange={(e) => updateStep(i, { title: e.target.value })} />
          <label>Description</label>
          <textarea value={s.description} onChange={(e) => updateStep(i, { description: e.target.value })} />
          <label>Duration (weeks)</label>
          <input type="number" value={s.durationWeeks} onChange={(e) => updateStep(i, { durationWeeks: Number(e.target.value) })} />
          <label>Resources (comma separated)</label>
          <input value={(s.resources || []).join(', ')} onChange={(e) => updateStep(i, { resources: e.target.value.split(',').map(p => p.trim()) })} />
          <div style={{ marginTop: 8 }}>
            <button className="btn-outline" onClick={() => removeStep(i)}>Remove</button>
          </div>
        </div>
      ))}
      <div style={{ marginTop: 10 }}>
        <button onClick={addStep} className="btn">Add Step</button>
      </div>
    </section>
  );
};

export default RoadmapEditor;
