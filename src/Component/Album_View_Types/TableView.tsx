import { useDispatch, useSelector } from 'react-redux';
import { setSelectedAlbum } from '../../Redux/albumSlice';

interface Album {
  id : number ;
  Name : string;
}


const TableView = () => {
    const dispatch = useDispatch();
    const albums : Album[] = useSelector((state: any) => state.albums.albumList);
    const selected : number = useSelector((state: any) => state.albums.selectedAlbumId);

    return (
      <div className="p-4">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Name</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {albums.map((album) => (
              <tr key={album.id} className={`cursor-pointer border-t ${selected == album.id ? 'bg-green-500' : ''}`} onClick={() => dispatch(setSelectedAlbum(album.id))}>
                <td className="px-6 py-4">{album.id}</td>
                <td className="px-6 py-4">{album.Name}</td>
              </tr>
                     
            ))}
            
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TableView;