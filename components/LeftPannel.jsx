import { userContext } from '@/pages/_app'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { AiOutlineBell, AiOutlineFilePdf, AiOutlineUser, AiOutlineLogout, AiOutlineWhatsApp } from 'react-icons/ai'
import { BsTicketPerforated } from 'react-icons/bs'
import { ImCross } from 'react-icons/im'

const LeftPannel = ({ setOpenTab, openTab }) => {
    const router = useRouter()
    const [user, setUser] = useContext(userContext);

    const logOutHandler = () => {
        localStorage.removeItem("PBuser")
        localStorage.removeItem("token")
        setUser({})
        router.push('/login')
    }

    return (
        <>
            <div className='xl:w-[300px] fixed top-0 left-0 z-20  md:w-[250px] sm:w-[200px] hidden sm:grid grid-rows-4 h-screen overflow-hidden rounded-tr-[40px] bg-gradient-to-b from-[#FFCD03] to-[#FFF8DE]'>
                <div className=' row-span-1  w-full h-full flex items-center justify-center cursor-pointer' onClick={(() => router.push('/'))}>
                    <img className='w-40 h-40 object-contain' src="/logo.png" alt="" />
                </div>
                <div className='flex flex-col justify-between row-span-3  w-full h-full'>
                    <ul className='w-full h-full flex flex-col text-left '>
                        <li className='flex items-center'>
                            <div className={`h-10  p-[6px] rounded-tr-xl rounded-br-xl ${router.pathname.includes('donation-management') ? 'bg-black' : 'bg-transparent'}`}>
                            </div>
                            <div className=' p-4 text-black font-semibold flex items-center gap-2 '>
                                <div className='w-6'>
                                    < BsTicketPerforated className='text-2xl' />
                                </div>
                                <Link href={'/donation-management'}>Donation Management</Link>
                            </div>
                        </li>
                        <li className='flex items-center'>
                            <div className={`h-10 p-[6px] rounded-tr-xl rounded-br-xl ${router.pathname === '/' ? 'bg-black' : 'bg-transparent'}`}>
                            </div>
                            <div className=' p-4 text-black font-semibold flex items-center gap-2 '>
                                <div className='w-6'>
                                    < AiOutlineUser className='text-2xl' />
                                </div>
                                <Link href={'/'}>User Donation Tracking</Link>
                            </div>
                        </li>
                        <li className='flex items-center'>
                            <div className={`h-10  p-[6px] rounded-tr-xl rounded-br-xl ${router.pathname.includes('user-management') ? 'bg-black' : 'bg-transparent'}`}>
                            </div>
                            <div className=' p-4 text-black font-semibold flex items-center gap-2 '>
                                <div className='w-6'>
                                    < AiOutlineUser className='text-2xl' />
                                </div>
                                <Link href={'/user-management'}>User Management</Link>
                            </div>
                        </li>
                        <li className='flex items-center'>
                            <div className={`h-10  p-[6px] rounded-tr-xl rounded-br-xl ${router.pathname.includes('notification') ? 'bg-black' : 'bg-transparent'}`}>
                            </div>
                            <div className=' p-4 text-black font-semibold flex items-center gap-2 '>
                                <div className='w-6'>
                                    < AiOutlineBell className='text-2xl' />
                                </div>
                                <Link href={'/notifications'}>Notification Broadcasting</Link>
                            </div>
                        </li>
                        <li className='flex items-center'>
                            <div className={`h-10  p-[6px] rounded-tr-xl rounded-br-xl ${router.pathname.includes('whatsapp-management') ? 'bg-black' : 'bg-transparent'}`}>
                            </div>
                            <div className=' p-4 text-black font-semibold flex items-center gap-2 '>
                                <div className='w-6'>
                                    < AiOutlineWhatsApp className='text-2xl' />
                                </div>
                                <Link href={'/whatsapp-management'}>WhatsApp Number Management</Link>
                            </div>
                        </li>
                        <li className='flex items-center'>
                            <div className={`h-10  p-[6px] rounded-tr-xl rounded-br-xl ${router.pathname.includes('content-management') ? 'bg-black' : 'bg-transparent'}`}>
                            </div>
                            <div className=' p-4 text-black font-semibold flex items-center gap-2 '>
                                <div className='w-6'>
                                    < AiOutlineFilePdf className='text-2xl' />
                                </div>
                                <Link href={'/content-management'}>Content Management</Link>
                            </div>
                        </li>
                    </ul>
                    <div className='p-6 text-center font-semibold '>
                        <li className=' p-4 text-black font-semibold flex items-center gap-2 '>
                            <div className='w-6'>
                                < AiOutlineLogout className='text-2xl' />
                            </div>
                            {
                                user?.token ?
                                    <p onClick={logOutHandler} className=' cursor-pointer'>Log out</p>
                                    :
                                    <Link href={'/login'}>LogIn</Link>
                            }
                        </li>
                    </div>
                </div>

            </div>


            <div className={`w-full absolute top-0 left-0 z-40 sm:hidden flex flex-col h-screen overflow-hidden  bg-[#FFF8DA] ${openTab ? 'scale-x-100' : 'scale-x-0'} transition-all duration-300 origin-left`}>
                <div className=' row-span-1  w-full  relative'>
                    <ImCross className='absolute top-4 right-4 z-40 text-2xl' onClick={() => setOpenTab(!openTab)} />
                    <div className='flex items-center gap-3 w-full  p-3 border-b-2 border-[#FFD93F]'>
                        <div className='w-12 h-12 rounded-full overflow-hidden'>
                            <img src="/img.jpg" alt="" className='w-full h-full object-cover' />
                        </div>
                        <div className='flex flex-col text-left justify-center'>
                            <p className='text-lg font-semibold'>
                                {/* Paul Barabar */}
                                {user?.firstname + " " + user?.lastname}
                            </p>
                            <p className='-mt-2 text-sm'>{user?.phone}</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center row-span-3 h-full  w-full  mt-4'>
                    <ul className='w-full h-full flex flex-col text-left px-4 gap-2 justify-center items-center'>
                        <li className=' p-4 text-black font-semibold flex items-center gap-2 bg-[#FFD93F] rounded-lg w-full' onClick={() => setOpenTab(!openTab)}>
                            <div className='w-6'>
                                < BsTicketPerforated className='text-2xl' />
                            </div>
                            <Link href={'/donation-management'}>Donation Management</Link>
                        </li>
                        <li className=' p-4 text-black font-semibold flex items-center gap-2 bg-[#FFD93F] rounded-lg w-full' onClick={() => setOpenTab(!openTab)}>
                            <div className='w-6'>
                                < AiOutlineUser className='text-2xl' />
                            </div>
                            <Link href={'/'}>User Donation Tracking</Link>
                        </li>
                        <li className=' p-4 text-black font-semibold flex items-center gap-2 bg-[#FFD93F] rounded-lg w-full' onClick={() => setOpenTab(!openTab)}>
                            <div className='w-6'>
                                < AiOutlineUser className='text-2xl' />
                            </div>
                            <Link href={'/user-management'}>User Management</Link>
                        </li>
                        <li className=' p-4 text-black font-semibold flex items-center gap-2 bg-[#FFD93F] rounded-lg w-full' onClick={() => setOpenTab(!openTab)}>
                            <div className='w-6'>
                                < AiOutlineBell className='text-2xl' />
                            </div>
                            <Link href={'/notifications'}>Notification Broadcasting</Link>
                        </li>
                        <li className=' p-4 text-black font-semibold flex items-center gap-2 bg-[#FFD93F] rounded-lg w-full' onClick={() => setOpenTab(!openTab)}>
                            <div className='w-6'>
                                < AiOutlineWhatsApp className='text-2xl' />
                            </div>
                            <Link href={'/whatsapp-management'}>WhatsApp Number Management</Link>
                        </li>
                        <li className=' p-4 text-black font-semibold flex items-center gap-2 bg-[#FFD93F] rounded-lg w-full' onClick={() => setOpenTab(!openTab)}>
                            <div className='w-6'>
                                < AiOutlineFilePdf className='text-2xl' />
                            </div>
                            <Link href={'/content-management'}>Content Management</Link>
                        </li>
                        <li className=' p-4 text-black font-semibold flex items-center gap-2 bg-[#FFD93F] rounded-lg '>
                            <div className='w-6 cursor-pointer'>
                                < AiOutlineLogout className='text-2xl' />
                            </div>
                            {
                                user?.token ?
                                    <p onClick={logOutHandler} className=' cursor-pointer'>Log out</p>
                                    :
                                    <Link href={'/login'}>LogIn</Link>
                            }
                        </li>
                    </ul>

                </div>

            </div>
        </>
    )
}

export default LeftPannel