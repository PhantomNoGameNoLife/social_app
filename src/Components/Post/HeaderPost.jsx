import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import LoadingRing from "../Loading/LoadingRing";

const HeaderPost = ({ userAvater, userName, createdAt, flex, userPostId, postId }) => {
    const { user: id } = jwtDecode(localStorage.getItem('token'));

    const queryClient = useQueryClient()

    function deletePost() {
        return axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`, {
            headers: {
                token: localStorage.getItem('token'),
            }
        })
    }

    const { isPending, mutate } = useMutation({
        mutationFn: deletePost,
        onSuccess: (data) => {
            toast.success(data.data.message);
            queryClient.invalidateQueries({ queryKey: ['userPosts'] });
            queryClient.invalidateQueries({ queryKey: ['allPosts'] });
        },
        onError: (e) => toast.error(e.response.data.error),
    })

    return (
        <div className="flex justify-between items-center">
            <div className={`flex gap-3 ${flex ? 'items-center' : ''}`} >
                {/* avatar */}
                <div className="avatar avatar-online">
                    <div className={`rounded-full ${flex ? 'w-9' : 'w-12'}`}>
                        <img src={userAvater} />
                    </div>
                </div>
                {/* name , data */}
                <div className={`${flex ? 'flex gap-3' : ''}`}>
                    <h4 className="font-bold">{userName}</h4>
                    <p className="text-slate-50/80">{createdAt}</p>
                </div>
            </div>
            {/* icon */}
            {id === userPostId ? <details className="dropdown dropdown-left">
                <summary className="btn btn-ghost m-1"><EllipsisHorizontalIcon tabIndex={0} role="button" className="size-6 cursor-pointer text-slate-800 dark:text-slate-50" /></summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li><button onClick={mutate}>{isPending ? <LoadingRing ht={'25px'} /> : "Delete"}</button></li>
                    <li><button>Update</button></li>
                </ul>
            </details> : <details className="dropdown dropdown-left">
                <summary className="btn btn-ghost m-1"><EllipsisHorizontalIcon tabIndex={0} role="button" className="size-6 cursor-pointer text-slate-800 dark:text-slate-50" /></summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li><button>Share</button></li>
                </ul>
            </details>}
        </div >
    )
}

export default HeaderPost
