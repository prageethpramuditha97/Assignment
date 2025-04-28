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
    title : string;
    date : string;
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

  const [imgURL, setNewImageURL] = useState("");
  const [imgTitle, setNewImageTitle] = useState("");
  const [imgCreateDate, setNewImageCreateDate] = useState("");
  
  const dispatch = useDispatch();
  
    const handleImageTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewImageTitle(e.target.value);
    }

    const handleImageURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewImageURL(e.target.value);
        alert(imgURL);
    };

    const handleImageDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewImageCreateDate(e.target.value);
    }

    const handleImageSrcChange = (newValue: string) => {
        setNewImageURL(newValue);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const imageUrl = await post<string>('/api/upload/images', new FormData().append('image', file));
                setNewImageURL(imageUrl);
            } catch (error) {
                console.error('Error posting string:', error);
            }
          
        }
        
      };

    const handleSubmit = () => {
        const addNewImage = async () => {
            try {
                await post<Image>('/api/images', {"album_id" : selected , "img" : imgURL});
                dispatch(addImageToAlbum({"album_id" : selected , "img" : imgURL , "title" : "" , "date" : ""}));
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
                            <label className="block text-sm font-medium text-gray-700">Album Name</label>
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
                            <label className="block text-sm font-medium text-gray-700">Image Title</label>
                            <input
                            type="text"
                            name="Album_Name"
                            value={imgTitle}
                            onChange={handleImageTitleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                            />
                        </div>
                    </div>
                </div>
                <div className='flex'>
                    <div className='flex w-2/4'>
                        <div className='w-3/4'>
                            <div className='me-2'>
                                <label className="block text-sm font-medium text-gray-700">Image</label>
                                <input
                                type="text"
                                name="Album_Name"
                                value={imgURL}
                                onChange={handleImageURLChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                required
                                />
                            </div>
                        </div>
                        <div className='w-1/4'>
                            <label htmlFor="fileInput" className="cursor-pointer inline-block border border-gray-400 text-black p-2 rounded mt-6">
                                Upload
                            </label>

                            {/* Hidden input */}
                            <input
                                id="fileInput"  // <-- same id as label's htmlFor
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileUpload}
                            />

                        </div>
                    </div>
                    <div className='w-2/4'>
                        <div className='ms-2'>
                            <label className="block text-sm font-medium text-gray-700">Created Date</label>
                            <input
                            type="date"
                            name="Album_Name"
                            value={imgCreateDate}
                            onChange={handleImageDateChange}
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
