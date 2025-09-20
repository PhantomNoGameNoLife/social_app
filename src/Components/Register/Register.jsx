import { useState } from 'react'
import { useForm } from 'react-hook-form'
import dayjs from "dayjs";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            dateOfBirth: "",
            gender: ""
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
            const { data } = await axios.post('https://linked-posts.routemisr.com/users/signup', values)
            toast.success(data.message)
            console.log(values)
            setIsLoading(false)
            navigate('/login')
        } catch (e) {
            toast.error(e.response.data.error);
            setIsLoading(false)
        }
    }

    return (
        <section className='my-10 p-10 w-1/2 shadow-2xl mx-auto shadow-blue-600 dark:shadow-slate-50/20'>
            <h1 className='text-center mb-14 text-2xl text-slate-50 font-medium'>Create Account</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Name */}
                <div className='mb-4'>
                    <label className={`input w-full ${getBorderClass('name')}`}>
                        <input
                            type="text"
                            id='name'
                            autoComplete='name'
                            placeholder="name"
                            {...register("name", {
                                required: "Please enter your name",
                                minLength: { value: 3, message: "At least 3 characters" },
                                maxLength: { value: 30, message: "Max 30 characters" },
                                pattern: { value: /^[A-Za-z]+(?: [A-Za-z]+)*$/, message: "Only letters and single spaces between words" },
                            })
                            }
                        />
                    </label>
                    {renderError('name')}
                </div>

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
                                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])\S{8,}$/,
                                    message: "Password must be at least 8 characters, include upper & lower case letters, a number, and a special character"
                                },
                                validate: (value) =>
                                    value === watch("rePassword") || setError('rePassword', { message: 'passwords do not match' })
                            })}
                        />
                        {show ? <EyeSlashIcon onClick={() => setShow(false)} className="h-6 w-6 text-blue-500 cursor-pointer" /> : <EyeIcon onClick={() => setShow(true)} className="h-6 w-6 text-blue-500 cursor-pointer" />}
                    </label>
                    {renderError('password')}
                </div>

                {/* RePassword */}
                <div className='mb-4'>
                    <label className={`input w-full ${getBorderClass('rePassword')}`}>
                        <input
                            type={show ? 'text' : 'password'}
                            id='repassword'
                            placeholder="RePassword"
                            {...register("rePassword", {
                                required: "Please enter your confirm password",
                                validate: (value) =>
                                    value === watch("password") || "Passwords do not match"
                            })}
                        />
                        {show ? <EyeSlashIcon onClick={() => setShow(false)} className="h-6 w-6 text-blue-500 cursor-pointer" /> : <EyeIcon onClick={() => setShow(true)} className="h-6 w-6 text-blue-500 cursor-pointer" />}
                    </label>
                    {renderError('rePassword')}
                </div>

                {/* Date of Birth */}
                <div className='mb-4'>
                    <label className={`input w-full ${getBorderClass('dateOfBirth')}`}>
                        <span className="label">Date of Birth</span>
                        <input
                            type="date"
                            {...register("dateOfBirth", {
                                required: "Please enter your date of Birth",
                                valueAsDate: true,
                                validate: (value) => {
                                    const age = dayjs().diff(dayjs(value), "year");
                                    return age >= 16 && age <= 100 || (age < 16 ? "Age must be at least 16 years old" : "Please enter a realistic age");
                                }
                            })}
                        />
                    </label>
                    {renderError('dateOfBirth')}
                </div>

                {/* Gender */}
                <div className="flex items-center mb-4 gap-x-12">
                    <label className='flex justify-center items-center gap-2'>
                        <input type="radio" name='gender' className="radio radio-accent" value="male"
                            {...register("gender", {
                                required: "Please choose your gender",
                                pattern: { value: /^(male|female)$/ }
                            })}
                        />
                        Male
                    </label>
                    <label className='flex justify-center items-center gap-2'>
                        <input type="radio" name='gender' className="radio radio-accent" value="female"
                            {...register("gender", {
                                required: "Please choose your gender",
                                pattern: { value: /^(male|female)$/ }
                            })}
                        />
                        Female
                    </label>
                    {renderError('gender')}
                </div>

                <button type='submit' className="btn btn-primary w-full" disabled={isLoading}>{isLoading ? <Loader2 className="animate-spin" height="100%"
                    width="100%" /> : "Register"}</button>
            </form>
        </section>
    )
}

export default Register