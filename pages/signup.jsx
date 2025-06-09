import { Api } from '@/utils/service';
import axios from 'axios'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import { userContext } from './_app';
import { validateMobileNumber } from '@/utils/validator';

const SignUp = (props) => {
    const [data, setData] = useState({
        phone: '',
        password: '',
        firstname: "",
        lastname: "",
        type: "ADMIN",
        otp: '0000'
    })
    const [user, setUser] = useContext(userContext);

    const router = useRouter()

    const submit = async () => {
        console.log(data)
        if (data.phone && data.password && data.lastname && data.firstname && data.otp) {
            if (!validateMobileNumber(data.phone, props.toaster)) {
                return
            }
            props.loader(true);
            Api("post", '/api/auth/signup', { ...data }, router).then(
                (res) => {
                    props.loader(false);
                    console.log("res================>", res);
                    props.toaster({ type: "success", message: "Signup Successful" });
                    router.push('/login')
                },
                (err) => {
                    props.loader(false);
                    console.log(err);
                    props.toaster({ type: "error", message: err?.message });
                }
            );
        }
        else {
            props.toaster({ type: "error", message: "Missing credentials" });
        }
    }

    return (
        // <div className='w-full h-full flex flex-col gap-3 justify-center items-center bg-blue-300 pt-[30vh]'>
        //     <p>number</p>
        //     <input type="text" onChange={((e) => setData({ ...data, phone: e.target.value }))} />
        //     <p>Password</p>
        //     <input type="text" onChange={((e) => setData({ ...data, password: e.target.value }))} />
        //     <button className=' bg-white p-2 ' onClick={submit}>Submit</button>
        // </div>
        <section className='xl:pr-[300px] md:pr-[250px] sm:pr-[200px]  max-h-screen h-screen relative flex items-center overflow-scroll '>
            <div className='h-auto w-full flex items-center justify-center overflow-scroll '>
                <div className='xl:w-[600px] md:w-[500px] w-[95%] bg-white h-auto p-4 md:px-10 md:py-4 shadow-xl rounded-3xl flex flex-col gap-2 items-center justify-center'>
                    <div className='md:w-16 w-10'>
                        <img src="/logo.png" alt="" className='w-full object-cover' />
                    </div>
                    {/* <div className=' space-y-2 text-center '>
                        <h2 className='text-3xl font-semibold'>Welcome back!</h2>
                    </div> */}
                    <div>
                        <div >
                            <p>Phone Number</p>
                            <input type="number" className='w-[300px] mt-1 md:w-[400px] outline-none h-full p-2 border-2 border-blak rounded-xl'
                                placeholder='Number'
                                value={data.phone}
                                onChange={((e) => {
                                    if (e.target.value.length <= 10) {
                                        setData({ ...data, phone: e.target.value })
                                    }
                                })} />
                        </div>
                    </div>
                    <div>
                        <div >
                            <p>First Name</p>
                            <input type="text" className='w-[300px] mt-1 md:w-[400px] outline-none h-full p-2 border-2 border-blak rounded-xl'
                                placeholder='First Name'
                                value={data.firstname}
                                onChange={((e) => setData({ ...data, firstname: e.target.value }))} />
                        </div>
                    </div>
                    <div>
                        <div >
                            <p>Last Name</p>
                            <input type="text" className='w-[300px] mt-1 md:w-[400px] outline-none h-full p-2 border-2 border-blak rounded-xl'
                                placeholder='Last Name'
                                value={data.lastname}
                                onChange={((e) => setData({ ...data, lastname: e.target.value }))} />
                        </div>
                    </div>
                    <div>
                        <div >
                            <p>Password</p>
                            <input type="password" className='w-[300px] mt-1 md:w-[400px] outline-none h-full p-2 border-2 border-blak rounded-xl'
                                placeholder='Password'
                                value={data.password}
                                onChange={((e) => setData({ ...data, password: e.target.value }))} />
                        </div>
                    </div>
                    <div>
                        <div >
                            <p>OTP</p>
                            <input type="number" className='w-[300px] mt-1 md:w-[400px] outline-none h-full p-2 border-2 border-blak rounded-xl'
                                placeholder='OTP'
                                value={data.otp}
                                onChange={((e) => setData({ ...data, otp: e.target.value }))} />
                        </div>
                    </div>
                    <div className=' flex flex-col items-center justify-center space-y-2'>
                        <button className="text-lg text-black font-semibold  bg-[#FFCD03] rounded-lg md:py-2 py-1 px-4 md:px-8"
                            onClick={submit}
                        >
                            Signup</button>
                        <p>Already have an Account ? <Link href={'/login'} className='text-blue-600'>Login</Link> </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp