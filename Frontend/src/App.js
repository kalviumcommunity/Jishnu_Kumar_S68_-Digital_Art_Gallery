import React from 'react';
import ArtPiece from './components/ArtPiece';
// ...existing code...

function App() {
  return (
    <div className="App">
      {/* ...existing code... */}
      <ArtPiece
        title="Starry Night"
        artist="Vincent van Gogh"
        imageUrl="https://example.com/starry-night.jpg"
        description="A famous painting by Vincent van Gogh."
      />
      {/* ...existing code... */}
    </div>
  );
}

export default App;
