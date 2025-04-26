// src/App.tsx
import { useState } from 'react';
import '../App.css';

const ACCESS_KEY = '11FjwC4Mw0-ODYb6bSoUPQ96CUK84a-rZZb43wfam_8';

interface UnsplashPhoto {
  id: string;
  alt_description: string;
  urls: {
    small: string;
  };
}

function Unplash() {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [error, setError] = useState<string | null>(null);

  const searchPhotos = async () => {
    if (!query.trim()) {
      setError('Please enter a search term.');
      return;
    }

    try {
      setError(null);
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&per_page=9&client_id=${ACCESS_KEY}`
      );
      if (!response.ok) throw new Error('Failed to fetch photos');
      const data = await response.json();
      setPhotos(data.results);
    } catch (err) {
      setError('Error fetching photos.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Search Unsplash Photos</h2>
      <input
        type="text"
        placeholder="Search for photos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchPhotos}>Search</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="imageList" style={{ display: 'flex', flexWrap: 'wrap', marginTop: '1rem' }} id="img_list_id">
        {photos.map((photo) => (
          <img
            key={photo.id}
            src={photo.urls.small}
            alt={photo.alt_description || 'Unsplash Photo'}
            style={{ width: '200px', margin: '10px', borderRadius: '8px' }}
          />
        ))}
      </div>
    </div>
  );
}

export default Unplash;
