import { Link } from 'react-router-dom'
import UserInfo from './UserInfo'
import HeaderPost from './HeaderPost'
import CreateComment from './CreateComment'
import dayjs from 'dayjs'

const Post = ({ post, isAllComments }) => {
    return (
        <>
            <div className="p-5 bg-slate-50 dark:bg-slate-700 mb-3 rounded-lg">
                {/* header */}
                <div className="header">
                    <HeaderPost userName={post?.user?.name} userAvater={post?.user?.photo} postId={post?.id} userPostId={post?.user?._id} createdAt={dayjs(post?.createdAt).format("DD/MM/YYYY h:mm a")} />
                </div>

                {/* body */}
                <div className="body my-4">
                    <p className='text-center text-accent'>{post?.id}</p>
                    <p>{post?.body}</p>
                    {post?.image && <img src={post?.image} className='w-full mt-4' alt="Post Img" />}
                </div>

                {/* comments */}
                {post?.comments.length > 0 && !isAllComments ?
                    <div className="comments p-5 bg-slate-300 dark:bg-slate-800 rounded-md border-2 border-slate-200/20 dark:border-slate-500/20">
                        <Link to={`/post/${post.id}`} className='mb-2 text-blue-300 text-center font-bold cursor-pointer hover:text-blue-200 block'>View All Comments</Link>
                        <UserInfo userName={post?.comments[0]?.commentCreator?.name} userAvater={post?.comments[0]?.commentCreator?.photo.includes('undefined') ? "https://files.combyne.com/0873e74e5a47bc7b2a598d1c1713a65b_image.jpg" : post?.comments[0]?.commentCreator?.photo} createdAt={post?.comments[0]?.createAt} flex={true} />
                        <p className='mt-4'>{post?.comments[0]?.content}</p>
                    </div>
                    : post?.comments.length > 0 ? post?.comments.map((comment) => {
                        return (
                            <div key={comment._id} className="comments mb-3 p-5 bg-slate-300 dark:bg-slate-800 rounded-md border-2 border-slate-200/20 dark:border-slate-500/20">
                                <UserInfo userName={comment?.commentCreator?.name} userAvater={comment?.commentCreator?.photo.includes('undefined') ? "https://files.combyne.com/0873e74e5a47bc7b2a598d1c1713a65b_image.jpg" : comment?.commentCreator?.photo} createdAt={comment?.createAt} flex={true} />
                                <p className='mt-4'>{comment?.content}</p>
                            </div>
                        )
                    }) : <h2 className='text-gray-300 ms-2'>No Comments Yet</h2>}
                <CreateComment id={post.id} />
            </div >
        </>
    )
}

export default Post
