import FolderView from './Album_View_Types/FolderView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TableView from './Album_View_Types/TableView';
import AddAlbumModal from './Modal/AddAlbumModal';
import { useState } from 'react';

const Album = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState("Folder");

  const toggleView = () => {
    if(view == "Table"){
      setView("Folder"); 
    }
    else{
      setView("Table"); 
    }
    console.log(view);
  };

  return (
    <div>
      <div className="p-3 w-full">
        <select id="options" className="block p-2 w-full mt-1 rounded-md shadow-sm" onChange={toggleView}>
          <option value="Folder">Folder View</option>
          <option value="Table">Table View</option>
        </select>
      </div>
      {view === 'Folder' ? <FolderView /> : <TableView />}
      <div className='p-3'>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full flex items-center space-x-2 p-3 rounded-lg border border-white text-white hover:bg-blue-800">
            <FontAwesomeIcon icon={faPlus} />
            <span>Add Album</span>
        </button>
      </div>
      <AddAlbumModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        
    </div>
  );
};

export default Album;