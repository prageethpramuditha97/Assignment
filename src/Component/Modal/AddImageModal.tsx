import React, { useState } from 'react';
import { post } from '../../api/api';
import { useSelector , useDispatch } from 'react-redux';
import { addImageToAlbum } from '../../Redux/imageSlice';
import Unplash from '../Unplash';

interface Album {
    id : number ;
    Name : string;
}

interface Image {
    album_id: number;
    img: string;
}

interface AddAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddImageModal: React.FC<AddAlbumModalProps> = ({ isOpen, onClose }) => {

  if (!isOpen) return null;
  const currentAlbumList : Album[] = useSelector((state: any) => state.albums.albumList);
  const selected : number = useSelector((state: any) => state.albums.selectedAlbumId);
    
  const selectAlbumName = currentAlbumList[selected-1].Name;

  const [newImageName, setNewImageName] = useState("");
  
  const dispatch = useDispatch();
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewImageName(e.target.value);
  }

    const handleImageSrcChange = (newValue: string) => {
        setNewImageName(newValue);
    };

    const handleSubmit = (e: React.FormEvent) => {
        const addNewImage = async () => {
            try {
                await post<Image>('/api/images', {"album_id" : selected , "img" : newImageName});
                dispatch(addImageToAlbum({"album_id" : selected , "img" : newImageName}));
                onClose();
            } catch (error) {
                console.error('Error posting string:', error);
            }
        };
        addNewImage();
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
            <div className='mb-10'>
                <button
                    className="text-gray-500 hover:text-gray-700 float-right"
                    onClick={onClose}
                >
                    ✕
                </button>
            </div>
            <div className="space-y-4 mb-4">
                <div className='flex'>
                    <div className='w-2/4'>
                        <div className='me-2'>
                            <label className="block text-sm font-medium text-gray-700">Enter The New Image</label>
                            <input
                            type="text"
                            name="Album_Id"
                            value={selectAlbumName}
                            disabled
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-200"
                            />
                        </div>
                    </div>
                    <div className='w-2/4'>
                        <div className='ms-2'>
                            <label className="block text-sm font-medium text-gray-700">Enter The New Album Name</label>
                            <input
                            type="text"
                            name="Album_Name"
                            value={newImageName}
                            onChange={handleImageChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                            />
                        </div>
                    </div>
                </div>
                <div className='flex'>
                    <div className='w-2/4'>
                        <div className='me-2'>
                            <label className="block text-sm font-medium text-gray-700">Enter The Image Title</label>
                            <input
                            type="text"
                            name="Album_Name"
                            value={newImageName}
                            onChange={handleImageChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                            />
                        </div>
                    </div>
                    <div className='w-2/4'>
                        <div className='ms-2'>
                            <label className="block text-sm font-medium text-gray-700">Enter The Created Date</label>
                            <input
                            type="text"
                            name="Album_Name"
                            value={newImageName}
                            onChange={handleImageChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                            />
                        </div>
                    </div>
                </div>
                <div className='flex'>
                    <div className='w-1/4'>
                        <button
                            type="button"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            onClick={handleSubmit}
                        >
                            Add Image Now
                        </button>
                    </div>
                    <div className='w-1/4'>
                        
                    </div>
                </div>
                
                
                
            </div>
            <Unplash setImage={handleImageSrcChange} />
        </div>
    </div>
  );
};

export default AddImageModal;
