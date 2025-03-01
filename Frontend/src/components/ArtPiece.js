import React from 'react';

const ArtPiece = ({ title, artist, imageUrl, description }) => {
  return (
    <div className="art-piece">
      <img src={imageUrl} alt={title} className="art-piece__image" />
      <h2 className="art-piece__title">{title}</h2>
      <p className="art-piece__artist">By {artist}</p>
      <p className="art-piece__description">{description}</p>
    </div>
  );
};

export default ArtPiece;
