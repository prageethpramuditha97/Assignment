import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


interface AlertProps {
  isOpen: boolean;
  type : boolean;
  msg : string
  onClose: () => void;
}




const Alert: React.FC<AlertProps> = ({ isOpen, onClose , type , msg }) => {
    if (!isOpen) return null;
    

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <div className="p-4 max-w-md mx-auto">
                    {type === true && (
                        <div>
                            <div className="mx-ato"><FontAwesomeIcon icon={faCheck} /></div>
                            <p>{msg}</p>
                        </div>
                    )}
                    {type === false && (
                        <div>
                            <div className="mx-ato"><FontAwesomeIcon icon={faWarning} /></div>
                            <p>{msg}</p>
                        </div>
                    )}
                    <button
                        type="submit"
                        className="border border-green-600 text-black py-2 px-4 rounded hover:bg-green-600 hover:text-white"
                        onClick={onClose}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Alert;
