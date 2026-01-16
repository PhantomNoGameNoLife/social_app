import { Loader2 } from "lucide-react";
const Loading = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <Loader2
                height="280"
                width="280"
                className="animate-spin"
            />
        </div>
    )
}

export default Loading
