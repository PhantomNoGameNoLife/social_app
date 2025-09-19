import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading';
import Post from './Post';

const PostAllComments = () => {
    const { id } = useParams();

    function getPost() {
        return axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
    }

    const { data, isLoading } = useQuery(
        {
            queryKey: ['post', id],
            queryFn: getPost,
        }
    )

    if (isLoading) {
        return <Loading />
    }

    return (
        <section className="w-full md:w-2/3 lg:w-1/2 my-4 mx-auto p-5 overflow-hidden">
            <Post post={data?.data.post} isAllComments={true} />
        </section>
    )
}

export default PostAllComments
