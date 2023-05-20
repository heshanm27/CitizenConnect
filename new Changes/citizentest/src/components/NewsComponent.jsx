import React from 'react';
import '../styles/NewsComponent.css';

function NewsComponent()    {
  return (
    <div className="news-container">
      <div className="news-header">
      <h1>News Page</h1>
        <h2>Latest News</h2>
      </div>
      <div className="news-content">
        <div className="news-item">
          <div className="news-card">
            <h3>Breaking News</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
        <div className="news-item">
          <div className="news-card">
            <h3>Important Update</h3>
            <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
        <div className="news-item">
          <div className="news-card">
            <h3>Exclusive Report</h3>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsComponent;
