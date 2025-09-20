import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

const AddPost = () => {
    const modalRef = useRef(null);
    const [isPrev, setIsPrev] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            post: "",
            img: '',
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
        return errors[fieldName] ? '!border-[#dc3545]' : '';
    }

    // function checkImg(fileList) {
    //     const file = fileList?.[0];
    //     if (!file) return 'empty';
    //     const allowedTypes = ["jpg", "jpeg", "png"];
    //     const isValidType = allowedTypes.some((type) => file.type.includes(type));
    //     if (!isValidType) return "Image type not allowed (only JPG, JPEG, PNG).";
    //     if (file.size / (1024 * 1024) > 5) return "Image size not allowed (must be less than 5MB).";
    //     return true;
    // }

    useEffect(() => {
        return () => {
            if (isPrev) URL.revokeObjectURL(isPrev);
        };
    }, [isPrev]);

    function createPost(values) {
        const formData = new FormData()
        if (values.post) formData.append('body', values.post);
        if (values.img) formData.append('image', values.img[0]);
        if (![...formData.entries()].length) throw new Error('Post must not be empty');
        return axios.post('https://linked-posts.routemisr.com/posts', formData, {
            headers: {
                token: localStorage.getItem('token'),
            }
        })
    }

    const { isPending, mutate } = useMutation(
        {
            mutationFn: createPost,
            onSuccess: (data) => {
                toast.success(data.data.message)
                queryClient.invalidateQueries({ queryKey: ['userPosts'] })
                setIsPrev(null)
                reset()
                modalRef.current.close()
            },
            onError: (e) => {
                if (e.response?.data?.error) {
                    toast.error(e.response.data.error);
                }
                else {
                    toast.error(e.message);
                }
            },
        }
    )
    return (
        <>
            <button className="btn btn-primary" onClick={() => modalRef.current?.showModal()}>Add Post</button>
            <dialog ref={modalRef} id="my_modal_2" className="modal">
                <Toaster />
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-6">Add Post!</h3>
                    <form onSubmit={handleSubmit(mutate)}>
                        <div className={`${getBorderClass('post')} py-2 px-4 my-1.5 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700`}>
                            <textarea id="post" rows="6"
                                className='px-0 w-full resize-none text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
                                placeholder="Write a post..." {...register('post', {
                                    maxLength: {
                                        value: 120,
                                        message: 'max length of post is 120 characters'
                                    }
                                })}></textarea>
                        </div>
                        {renderError('post')}
                        {isPrev ? <>
                            <button className="btn btn-sm btn-circle btn-ghost ms-auto block" onClick={() => {
                                URL.revokeObjectURL(isPrev)
                                setIsPrev(null)
                            }}>✕</button>
                            <img src={isPrev} className='w-full h-64 object-contain' />
                        </> :
                            <>
                                <div className="flex items-center justify-center w-full mt-3">
                                    <label htmlFor="dropzone-file" className={`${getBorderClass('img')} flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500`}>
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, JPEG (MAX. 5MB)</p>
                                        </div>
                                        <input id="dropzone-file" accept=".jpg,.jpeg,.png" type="file" className="hidden" {
                                            ...register('img')
                                        } />
                                    </label>
                                </div>
                                {renderError('img')}
                            </>}
                        <button type='submit' className="py-2.5 px-4 text-xs font-medium ms-auto block btn btn-primary mt-4" disabled={isPending}>{isPending ? <Loader2 className="animate-spin" height="100%"
                            width="100%" /> : "Add Post"}</button>
                    </form>
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default AddPost
