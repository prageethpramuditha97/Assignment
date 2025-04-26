import React, { useState } from 'react';
import { post } from '../../api/api';
import { useDispatch } from 'react-redux';
import { addAlbum } from '../../Redux/albumSlice';

interface Album {
    id : number ;
    Name : string;
}

interface AddAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddAlbumModal: React.FC<AddAlbumModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  const [newAlbumName, setNewAlbumName] = useState("");
  const dispatch = useDispatch();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAlbumName(e.target.value);
    console.log(newAlbumName);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const getAlbumsList = async () => {
        try {
            const response = await post<Album>('/api/albums', {"Name" : newAlbumName});
            dispatch(addAlbum(response));
            onClose();
        } catch (error) {
            console.error('Error posting string:', error);
        }
    };
    getAlbumsList();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className='mb-10'>
                <button
                    className="text-gray-500 hover:text-gray-700 float-right"
                    onClick={onClose}
                >
                    ✕
                </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Enter The New Album Name</label>
                    <input
                    type="text"
                    name="Album_Name"
                    value={newAlbumName}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Album Now
                </button>
            </form>
        </div>
    </div>
  );
};

export default AddAlbumModal;
