import { ColorRing } from 'react-loader-spinner'

const LoadingRing = ({ ht }) => {
    return (
        <Loader2 height={ht || "100%"}
            width="100%" className="animate-spin" />
    )
}

export default LoadingRing
