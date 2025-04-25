import { useSelector } from 'react-redux';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Image {
  album_id: number;
  img: string;
}

const Gallary = () => {
  const selected : number = useSelector((state: any) => state.albums.selectedAlbumId);
  const images : Image [] = useSelector((state: any) => state.images.imageList);
  const filteredImages = images.filter((image) => image.album_id === selected);

  //Need to replace immedietly
  const handleAddImage = () => {
    const newImage = prompt("Enter image URL:");
    if (newImage) {
      //setImages([...images, newImage]);
    }
  };

  return (
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {
          filteredImages.map((image, index) => (
            <div key={index} className="border rounded overflow-hidden shadow">
              <img src={image.img} alt={`img-${index}`} className="w-full h-60 object-cover" />
            </div>
          )) 
        }

        {/* Add Image Box */}
        <div
          onClick={handleAddImage}
          className="flex items-center justify-center border-2 border-dashed border-gray-400 rounded cursor-pointer h-60 hover:bg-gray-100 transition"
        >
          <FontAwesomeIcon icon={faPlus} className="text-3xl text-gray-500" />
        </div>
      </div>
  );
};
  
export default Gallary;