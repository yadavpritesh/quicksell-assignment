import React from 'react';
import './Card.css'; 

const Card = ({ title, content, profilePicture, tag }) => {
  return (
    <div className="card">
      <div className="card-header">
        <p className="card-content">{content}</p>
      </div>
      <p className="card-title">{title}</p>
      {tag && (
        <div className="card-tag">
          <img src="circle.jpeg" alt="tag" className="tag-icon" />
          {tag}
        </div>
      )}
    </div>
  );
};

export default Card;
