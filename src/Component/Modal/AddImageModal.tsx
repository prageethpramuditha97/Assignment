import { useForm } from "react-hook-form";
import { post } from '../../api/api';
import { useSelector , useDispatch } from 'react-redux';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addImageToAlbum } from '../../Redux/imageSlice';
import Unplash from '../Unplash';
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Image {
    album_id: number;
    img: string;
    title : string;
    date : string;
}
interface AddImageModalPorps {
  isOpen: boolean;
  onClose: () => void;
}

type FormData = {
    imageName: string;
    createdDate : string;
    imgUrl : string;
  };
  
  // Define Zod schema
  const imageSchema = z.object({
      imageName: z.string().min(1, "Image Name is required"),
      createdDate: z.string().min(1, "Date is required"),
      imgUrl: z.string().min(1, "Image URL is required"),
  });
    
  // Infer TypeScript type from the Zod schema
  type imageFormData = z.infer<typeof imageSchema>;
  


const AddImageModal: React.FC<AddImageModalPorps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const selected : number = useSelector((state: any) => state.albums.selectedAlbumId);

    const { register, handleSubmit, setValue , formState: { errors } } = useForm<imageFormData>({
        resolver: zodResolver(imageSchema),
    });
    
    const dispatch = useDispatch();

    const handleImageSrcChange = (newValue: string) => {
        setValue("imgUrl", newValue);
    };
    
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const imageUrl = await post<string>('/api/upload/images', new FormData().append('image', file));
                setValue("imgUrl", imageUrl);
            } catch (error) {
                console.error('Error posting string:', error);
            }
          
        }
        
      };

    const onSubmit = async (data: FormData) => {
        try {
            await post<Image>('/api/images', {"album_id" : selected , "img" : data.imgUrl , "title" : data.imageName , "date" : data.createdDate });
            dispatch(addImageToAlbum({"album_id" : selected , "img" : data.imgUrl , "title" : data.imageName , "date" : data.createdDate }));
            onClose();
        } catch (error) {
            console.error('Error posting string:', error);
        }
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
                <div className="p-2">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mb-4">
                        <div className='flex'>
                            <div className='w-2/4 me-2'>
                                <div>
                                    <label htmlFor="imageName" className="block text-sm font-medium text-gray-700">
                                    Image Title
                                    </label>
                                    <input
                                        id="imageName"
                                        type="text"
                                        {...register("imageName")}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                    />
                                    {errors.imageName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.imageName.message}</p>
                                    )}
                                </div>
                            </div>
                            <div className='w-2/4 ms-1'>
                                <div>
                                    <label htmlFor="createdDate" className="block text-sm font-medium text-gray-700">
                                    Created Date
                                    </label>
                                    <input
                                        id="createdDate"
                                        type="date"
                                        {...register("createdDate")}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                    />
                                    {errors.createdDate && (
                                        <p className="text-red-500 text-sm mt-1">{errors.createdDate.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='w-10/12'>
                                <div>
                                    <label htmlFor="imgUrl" className="block text-sm font-medium text-gray-700">
                                    Image Link
                                    </label>
                                    <input
                                        id="imageUrl"
                                        type="text"
                                        {...register("imgUrl")}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                    />
                                    {errors.imgUrl && (
                                        <p className="text-red-500 text-sm mt-1">{errors.imgUrl.message}</p>
                                    )}
                                </div>
                            </div>
                            <div className='w-2/12 ms-2'>
                                <label htmlFor="fileInput" className="w-full text-center cursor-pointer inline-block border border-gray-300 text-gray-700 p-2 rounded mt-6">
                                    <FontAwesomeIcon icon={faUpload} /> Upload
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
                        
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Add Image
                        </button>
                    </form>
                    <Unplash setImage={handleImageSrcChange} />
                </div>
            </div>
        </div>
    );
};

export default AddImageModal;
