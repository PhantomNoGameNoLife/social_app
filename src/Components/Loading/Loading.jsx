import { Loader } from 'lucide-react';
const Loading = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <Loader
                height="280"
                width="280"
                className="animate-spin"
            />
        </div>
    )
}

export default Loading
