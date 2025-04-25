import React, { useState } from 'react';
import { post } from '../../api/api';
import { useDispatch } from 'react-redux';
import { addAlbum } from '../../Redux/albumSlice';

interface Album {
    id : number ;
    Name : string;
}

  
function AddAlbumForm() {
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
            console.log('Response:', response);
        } catch (error) {
            console.error('Error posting string:', error);
        }
    };
    getAlbumsList();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="test"
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
        Submit
      </button>
    </form>
  );
};

export default AddAlbumForm;
