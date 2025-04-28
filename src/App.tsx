import { useEffect } from 'react';
import { get } from './api/api';
import './App.css';
import Album from './Component/Album';
import Gallary from './Component/Gallary';
import { useDispatch } from 'react-redux';
import { setAlbumList, setSelectedAlbum } from './Redux/albumSlice';
import { setImageList } from './Redux/imageSlice';

interface Album {
  id : number ;
  Name: string;
}

interface Image {
  album_id: number;
  img: string;
  title : string;
  date : string;
}

function App() {
  const dispatch = useDispatch();


  useEffect(() => {
    const getAlbumsList = async () => {
      try {
        const albumList_fretched = await get<Album[]>('/api/albums');
        dispatch(setAlbumList(albumList_fretched));
        dispatch(setSelectedAlbum(albumList_fretched[0].id));
      } catch (err) {
        console.error('API Error:', err);
      }
    };

    const getImageList = async () => {
      try {
        const imageList_fretched = await get<Image[]>('/api/images');
        dispatch(setImageList(imageList_fretched));
      } catch (err) {
        console.error('API Error:', err);
      }
    };

    getImageList();
    getAlbumsList();
  }, []);

  return (
    <div className="scrollbar" id="main">
      <div className="h-screen flex gap-4">
        <div className="w-1/5 bg-blue-700">
          <Album/>
        </div>

        <div className="w-4/5 bg-white p-4">
          <Gallary/>
        </div>
      </div>
      
      
    </div>
  )
}

export default App
