import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import LoadingRing from '../Loading/LoadingRing';

const CreateComment = ({ id }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            comment: "",
        },
        mode: 'all',
    })

    const queryClient = useQueryClient()

    const renderError = (fieldName) => (
        errors[fieldName] && (
            <p className="validator-hint mb-1">{errors[fieldName].message}</p>
        )
    )

    const getBorderClass = (fieldName) => {
        return errors[fieldName] ? 'border-[#dc3545]' : '';
    }

    function createComment(values) {
        const dataComment = {
            content: values.comment,
            post: id,
        }
        return axios.post('https://linked-posts.routemisr.com/comments', dataComment, {
            headers: {
                token: localStorage.getItem('token'),
            }
        })
    }

    const { isPending, mutate } = useMutation(
        {
            mutationFn: createComment,
            onSuccess: (data) => {
                toast.success(data.data.message)
                queryClient.invalidateQueries({ queryKey: ['post', id] })
                queryClient.invalidateQueries({ queryKey: ['userPosts'] });
                reset()
            },
            onError: (e) => toast.error(e.response.data.error),
        }
    )

    return (
        <form className="mb-6" onSubmit={handleSubmit(mutate)}>
            <div className={`${getBorderClass('comment')} py-2 px-4 my-1.5 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700`}>
                <label htmlFor="comment" className="sr-only">Your comment</label>
                <textarea id="comment" rows="3"
                    className='px-0 w-full resize-none text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
                    placeholder="Write a comment..." {...register('comment', {
                        required: 'must enter Comment',
                        maxLength: {
                            value: 30,
                            message: 'max length of comment is 30 characters'
                        }
                    })}></textarea>
            </div>
            {renderError('comment')}
            <button type='submit' className="py-2.5 px-4 text-xs font-medium ms-auto block btn btn-primary" disabled={isPending}>{isPending ? <LoadingRing /> : "Post comment"}</button>
        </form>
    )
}

export default CreateComment
