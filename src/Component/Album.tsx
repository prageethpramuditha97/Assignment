import FolderView from './Album_View_Types/FolderView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TableView from './Album_View_Types/TableView';
import Modal from './Modal/modal';
import AddAlbumForm from './Modal/addAlbum';
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
      <div className="flex justify-left mb-4 items-center gap-2">
        <span className="text-sm text-gray-700">Folder View</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" id="viewToggle" className="sr-only peer" onChange={() => toggleView()}/>
          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
        <span className="text-sm text-gray-700">Table View</span>
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Fill the Form</h2>
        <AddAlbumForm/>
      </Modal>
    </div>
  );
};

export default Album;