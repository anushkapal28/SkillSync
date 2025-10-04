import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <div className="container">
    <div className="card">
      <h2>404 — Not Found</h2>
      <p>The page you're looking for wasn't found.</p>
      <Link to="/" className="btn">Go Home</Link>
    </div>
  </div>
);

export default NotFound;
