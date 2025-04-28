// src/App.tsx
import { useState } from 'react';
import '../App.css';

const ACCESS_KEY = '11FjwC4Mw0-ODYb6bSoUPQ96CUK84a-rZZb43wfam_8';

interface UnsplashProps {
  setImage: (newValue: string) => void;
}

interface UnsplashPhoto {
  id: string;
  alt_description: string;
  urls: {
    small: string;
  };
}

const Unplash: React.FC<UnsplashProps> = ({ setImage }) => {
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
        `https://api.unsplash.com/search/photos?query=${query}&per_page=20&client_id=${ACCESS_KEY}`
      );
      if (!response.ok) throw new Error('Failed to fetch photos');
      const data = await response.json();
      setPhotos(data.results);
    } catch (err) {
      setError('Error fetching photos.');
    }
  };

  return (
    <div className='border border-gray-300 p-4'>
      <h2>Search Unsplash Photos</h2>
      <div className='flex'>
        <input
          type="text"
          className="w-3/4 mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Search for photos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="bg-yellow-600 p-0 text-white rounded hover:bg-yellow-700 ms-4 w-1/4" onClick={searchPhotos}>Search</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="imageList" style={{ display: 'flex', flexWrap: 'wrap', marginTop: '1rem' }} id="img_list_id">
        {photos.map((photo) => (
          <img
            key={photo.id}
            onClick={() => setImage(photo.urls.small)}
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
