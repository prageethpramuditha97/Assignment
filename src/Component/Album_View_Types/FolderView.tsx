import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { setSelectedAlbum } from '../../Redux/albumSlice';
import { useDispatch, useSelector } from 'react-redux';

interface Album {
  id : number ;
  Name : string;
}

const FolderView = () => {
    const dispatch = useDispatch();
    const albums : Album[] = useSelector((state: any) => state.albums.albumList);
    const selected : number = useSelector((state: any) => state.albums.selectedAlbumId);
    
    return (
      <div className="p-4">
        {albums.map((album) => (
          <div key={album.id} className={`cursor-pointer p-3 mb-3 rounded-lg ${selected == album.id ? 'rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-100' : 'text-white hover:bg-blue-800'}`} onClick={() => dispatch(setSelectedAlbum(album.id))}>
            <FontAwesomeIcon icon={faFolder} />
            <label className='ms-4'>{album.Name}</label>
          </div>
         
        ))}
      </div>
    );
  };
  
  export default FolderView;