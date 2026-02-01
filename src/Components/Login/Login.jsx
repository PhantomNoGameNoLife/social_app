import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { Loader } from 'lucide-react';

const Login = () => {
    const { insertUserToken } = useContext(AuthContext)
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: 'all',
    })

    const renderError = (fieldName) => (
        errors[fieldName] && (
            <p className="validator-hint">{errors[fieldName].message}</p>
        )
    )

    const getBorderClass = (fieldName) => {
        return errors[fieldName] ? 'border-[#dc3545]' : '';
    }

    const onSubmit = async (values) => {
        setIsLoading(true)
        try {
            const { data } = await axios.post('https://linked-posts.routemisr.com/users/signin', values)
            toast.success(data.message)
            localStorage.setItem('token', data.token)
            insertUserToken(data.token)
            setIsLoading(false)
            navigate('/')
        } catch (e) {
            toast.error(e.response.data.error)
            setIsLoading(false)
        }
    }

    return (
        <section className='my-10 p-10 w-1/2 shadow-2xl mx-auto shadow-blue-600 dark:shadow-slate-50/20'>
            <h1 className='text-center mb-12 text-2xl text-slate-50 font-medium'>Login</h1>

            <form onSubmit={handleSubmit(onSubmit)}>

                {/* Email */}
                <div className='mb-4'>
                    <label className={`input w-full ${getBorderClass('email')}`}>
                        <input
                            type="email"
                            id='email'
                            autoComplete='email'
                            placeholder="mail@site.com"
                            {...register("email", {
                                required: "Please enter your email",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                                    message: "Please enter a valid email format (e.g. user@example.com)"
                                }
                            })}
                        />
                    </label>
                    {renderError('email')}
                </div>

                {/* Password */}
                <div className='mb-4'>
                    <label className={`input w-full ${getBorderClass('password')}`}>
                        <input
                            type={show ? 'text' : 'password'}
                            id='password'
                            placeholder="Password"
                            {...register("password", {
                                required: "Please enter your password",
                                pattern: {
                                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                    message: "Password must be at least 8 characters, include upper & lower case letters, a number, and a special character"
                                },
                            })}
                        />
                        {show ? <EyeSlashIcon onClick={() => setShow(false)} className="h-6 w-6 text-blue-500 cursor-pointer" /> : <EyeIcon onClick={() => setShow(true)} className="h-6 w-6 text-blue-500 cursor-pointer" />}
                    </label>
                    {renderError('password')}
                </div>

                <button type='submit' className="btn btn-primary w-full" disabled={isLoading}>{isLoading ? <Loader className="animate-spin" height="100%"
                    width="100%" /> : "Login"}</button>
            </form>
        </section>
    )
}

export default Login
