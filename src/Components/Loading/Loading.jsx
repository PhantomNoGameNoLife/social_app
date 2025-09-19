import { MagnifyingGlass } from "react-loader-spinner"

const Loading = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <MagnifyingGlass
                visible={true}
                height="280"
                width="280"
                ariaLabel="magnifying-glass-loading"
                wrapperStyle={{}}
                wrapperClass="magnifying-glass-wrapper"
                glassColor="#c0efff"
                color="#e15b64"
            />
        </div>
    )
}

export default Loading
