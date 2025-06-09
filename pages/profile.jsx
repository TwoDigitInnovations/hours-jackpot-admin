import { Api } from '@/utils/service';
import axios from 'axios'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import { userContext } from './_app';

const Profile = (props) => {
    const [user, setUser] = useContext(userContext);
    const router = useRouter()

    return (
        // <div className='w-full h-full flex flex-col gap-3 justify-center items-center bg-blue-300 pt-[30vh]'>
        //     <p>number</p>
        //     <input type="text" onChange={((e) => setData({ ...data, phone: e.target.value }))} />
        //     <p>Password</p>
        //     <input type="text" onChange={((e) => setData({ ...data, password: e.target.value }))} />
        //     <button className=' bg-white p-2 ' onClick={submit}>Submit</button>
        // </div>
        <section style={{height:'calc(100vh - 100px)'}}
         className='  relative  '>
            <div className='h-full w-full flex items-center justify-center overflow-scroll '>
                <div className='xl:w-[600px] md:w-[500px] w-[95%] bg-white h-auto p-4 md:p-10  shadow-xl rounded-3xl flex flex-col gap-2 items-center justify-center'>
                    <div className='md:w-16 md:h-16  w-10 h-10 rounded-full overflow-hidden'>
                        <img src="/logo.png" alt="" className='w-full h-full object-contain ' />
                    </div>
                    {/* <div className=' space-y-2 text-center '>
                        <h2 className='text-3xl font-semibold'>Welcome back!</h2>
                    </div> */}
                    <div>
                        <div >
                            <p>Phone Number</p>
                            <input type="number" className='w-[300px] mt-1 md:w-[400px] outline-none h-full p-2 border-2 border-blak rounded-xl'
                                value={user?.phone}
                                disabled
                            />
                        </div>
                    </div>
                    <div>
                        <div >
                            <p>First Name</p>
                            <input type="text" className='w-[300px] mt-1 md:w-[400px] outline-none h-full p-2 border-2 border-blak rounded-xl'
                                value={user?.firstname + " " + user?.lastname}
                                disabled
                            />
                        </div>
                    </div>

                    {/* <div className=' flex flex-col items-center justify-center space-y-2'>
                        <button className="text-lg text-black font-semibold  bg-[#FFCD03] rounded-lg md:py-2 py-1 px-4 md:px-8"
                           
                        >
                            Sign up</button>
                        
                    </div> */}
                </div>
            </div>
        </section>
    )
}

export default Profile