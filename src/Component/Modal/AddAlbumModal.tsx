import { useForm } from "react-hook-form";
import { post } from '../../api/api';
import { useDispatch } from 'react-redux';
import { addAlbum } from '../../Redux/albumSlice';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Album {
    id : number ;
    Name : string;
}

interface AddAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormData = {
  albumName: string;
};

// Define Zod schema
const albumSchema = z.object({
    albumName: z.string().min(1, "Album Name is required"),
});
  
// Infer TypeScript type from the Zod schema
type AlbumFormData = z.infer<typeof albumSchema>;


const AddAlbumModal: React.FC<AddAlbumModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const { register, handleSubmit, formState: { errors } } = useForm<AlbumFormData>({
        resolver: zodResolver(albumSchema),
    });
    
    const dispatch = useDispatch();

    const onSubmit = async (data: FormData) => {
        try { 
            const response = await post<Album>('/api/albums', {"Name" : data.albumName});
            dispatch(addAlbum(response));
            onClose();
        } catch (error) {
            console.error('Error posting string:', error);
        }
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
                <div className="p-4 max-w-md mx-auto">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                        <div>
                        <label htmlFor="albumName" className="block text-sm font-medium text-gray-700">
                            Album Name
                        </label>
                        <input
                            id="albumName"
                            {...register("albumName")}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.albumName && (
                            <p className="text-red-500 text-sm mt-1">{errors.albumName.message}</p>
                        )}
                        </div>

                        <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                        Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAlbumModal;
