import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useQuery } from "@tanstack/react-query";
import Post from "../Post/Post";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";
import AddPost from "../Post/AddPost";

const Profile = () => {
  const { user: id } = jwtDecode(localStorage.getItem('token'));

  function getUserPost() {
    return axios.get(`https://linked-posts.routemisr.com/users/${id}/posts?limit=40`, {
      headers: {
        token: localStorage.getItem('token'),
      }
    })
  }

  const { data, error, isLoading, isError } = useQuery(
    {
      queryKey: ['userPosts'],
      queryFn: getUserPost,
    }
  )

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    console.log(error)
    toast.error(error.message)
  }

  return (
    <section className="w-full md:w-2/3 lg:w-1/2 my-4 mx-auto p-5 overflow-hidden">
      <div className="text-center mb-3">
        <AddPost />
      </div>
      {data?.data.posts.map((post) => <Post key={post.id} post={post} />)}
    </section>
  )
}

export default Profile
