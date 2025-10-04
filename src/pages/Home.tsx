import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-inner">
        <h1>SkillSync — AI-Powered Career Roadmap Generator</h1>
        <p className="subtitle">Tell SkillSync your goal, get a personalized roadmap, track progress, and receive weekly AI advice.</p>
        <div className="cta">
          <Link className="btn primary" to="/signup">Get Started</Link>
          <Link className="btn outline" to="/advice">See Advice</Link>
        </div>
      </div>
      <div className="hero-side">
        <div className="card highlight">
          <h3>AI Roadmap</h3>
          <p>Try generating a roadmap for "Full Stack Developer" or "ML Engineer".</p>
        </div>
      </div>
    </section>
  );
};

export default Home;
