import { MagnifyingGlass } from "react-loader-spinner"

const Loading = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <Loader2
                height="280"
                width="280"
                lassName="animate-spin"
            />
        </div>
    )
}

export default Loading
