import { useForm } from "react-hook-form";
import { useState } from "react";
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
  

  const imageSchema = z.object({
    imageName: z.string().min(1, "Image Name is required"),

    createdDate: z.string().min(1, "Created Date is required"),
  
    imgUrl: z
      .string().min(1, "Image URL is required")
      .url("Please enter a valid Image URL"),
  });
    

  type imageFormData = z.infer<typeof imageSchema>;
  


const AddImageModal: React.FC<AddImageModalPorps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const [isLoading, setIsLoading] = useState(false);

    const selected : number = useSelector((state: any) => state.albums.selectedAlbumId);

    const { register, handleSubmit, setValue , formState: { errors } } = useForm<imageFormData>({
        resolver: zodResolver(imageSchema),
    });
    
    const dispatch = useDispatch();

    const handleImageSrcChange = (newValue: string) => {
        setValue("imgUrl", newValue);
    };
    
    /*const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const imageUrl = await post<string>('/api/upload/images', new FormData().append('image', file));
                setValue("imgUrl", imageUrl);
            } catch (error) {
                console.error('Error posting string:', error);
            }
          
        }
        
      };*/

    const onSubmit = async (data: FormData) => {
        try {
            setIsLoading(true);
            await post<Image>('/api/images', {"album_id" : selected , "img" : data.imgUrl , "title" : data.imageName , "date" : data.createdDate });
            dispatch(addImageToAlbum({"album_id" : selected , "img" : data.imgUrl , "title" : data.imageName , "date" : data.createdDate }));
            setIsLoading(false);
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
                            <div className='w-full'>
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
                            <div className='w-2/12 ms-2 hidden'>
                                <label htmlFor="fileInput" className="w-full text-center cursor-pointer inline-block border border-gray-300 text-gray-700 p-2 rounded mt-6">
                                    <FontAwesomeIcon icon={faUpload} /> Upload
                                </label>

                                {/* Hidden input */}
                                <input
                                    id="fileInput"  // <-- same id as label's htmlFor
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    //onChange={handleFileUpload}
                                />

                            </div>
                        </div>
                        
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Add Image
                            {isLoading == true && (
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin ms-2" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                </svg>

                            )}
                        </button>
                    </form>
                    <Unplash setImage={handleImageSrcChange} />
                </div>
            </div>
        </div>
    );
};

export default AddImageModal;
