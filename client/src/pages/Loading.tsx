import {Loader2Icon} from "lucide-react";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Loading = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(()=>{
            navigate('/')
        },6000)
    }, [navigate]);
    return (
        <div className='h-screen flex flex-col'>
            <div className='flex items-center justify-center flex-1'>
                <Loader2Icon className='size-7 animate-spin text-indigo-400'/>
            </div>
        </div>
    )
}
export default Loading
