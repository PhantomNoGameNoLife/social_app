import axios from 'axios';
import Post from '../Post/Post';
import toast from 'react-hot-toast';
import Loading from '../Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import AddPost from '../Post/AddPost';
import { useState } from 'react';

const Home = () => {
    const [page, setPage] = useState(1);
    const limit = 50;

    function getAllPosts({ queryKey }) {
        const [, page] = queryKey;
        return axios.get(
            `https://linked-posts.routemisr.com/posts?limit=${limit}&page=${page}&sort=-createdAt`,
            {
                headers: {
                    token: localStorage.getItem('token'),
                },
            }
        );
    }

    const { data, error, isLoading, isError, isFetching } = useQuery({
        queryKey: ['allPosts', page], 
        queryFn: getAllPosts,
        keepPreviousData: true,
        retry: 1,
        retryDelay: 3000,
    });

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        console.log(error);
        toast.error(error.message);
    }

    const posts = data?.data.posts || [];
    const pagination = data?.data.paginationInfo || {};

    return (
        <>
            <section className="w-full md:w-2/3 lg:w-1/2 my-4 mx-auto p-5 overflow-hidden">
                <div className="text-center mb-3">
                    <AddPost />
                </div>

                {posts.map((post) => (
                    <Post key={post.id} post={post} />
                ))}

                {/* pagination controls */}
                <div className="flex justify-center items-center gap-2 mt-5 flex-wrap">
                    <button
                        className="px-3 py-1 bg-slate-900 rounded disabled:opacity-50"
                        onClick={() => setPage((old) => Math.max(old - 1, 1))}
                        disabled={pagination.currentPage === 1 || isFetching}
                    >
                        Prev
                    </button>

                    {[...Array(pagination.numberOfPages).keys()].map((i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`px-3 py-1 rounded ${
                                pagination.currentPage === i + 1
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-slate-700'
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        className="px-3 py-1 bg-slate-900 rounded disabled:opacity-50"
                        onClick={() => setPage((old) =>
                            old < pagination.numberOfPages ? old + 1 : old
                        )}
                        disabled={pagination.currentPage === pagination.numberOfPages || isFetching}
                    >
                        Next
                    </button>
                </div>
            </section>
        </>
    );
};

export default Home;
