import { userContext } from '@/pages/_app'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { AiOutlineBell } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'

const Navbar = ({ setOpenTab, openTab }) => {

  const [user, setUser] = useContext(userContext);

  const router = useRouter()
  return (
    <navbar className='w-full  z-20 md:bg-[#FFF8DA] bg-[#FFD93F] rounded-b-[30px] sticky top-0 max-w-screen'>
      <div className='w-full py-4 px-6 flex items-center justify-between  md:border-b-2 border-[#FFD93F] md:bg-[#FFF8DA] bg-[#FFD93F] '>
        <div className='w-8 h-8 flex items-center justify-center md:hidden cursor-pointer' onClick={(() => router.push('/'))}>
          <img src="/logo.png" alt="" />
        </div>
        <div>
          {/* <h2 className='text-3xl font-bold cursor-pointer' onClick={(()=> router.push('/'))}>Dashboard</h2> */}
        </div>

        {
          user?.token &&
          <div className='md:flex items-center gap-3 hidden   cursor-pointer' onClick={() => router.push('/profile')}>
            {/* <div>
              <AiOutlineBell className='text-2xl' />
            </div> */}
            <div className='flex items-center gap-3  cursor-pointer'>
              <div className='w-12 h-12 rounded-full overflow-hidden'>
                <img src="/img.jpg" alt="" className='w-full h-full object-cover' />
              </div>
              <div className='flex flex-col text-left justify-center'>
                <p className='text-lg font-semibold'>
                  {user?.firstname + " " + user?.lastname}
                </p>
                <p className='-mt-2 text-sm'>{user?.phone}</p>
              </div>
            </div>
          </div>
        }
        <div className='md:hidden'>
          <GiHamburgerMenu className='text-2xl ' onClick={() => setOpenTab(!openTab)} />
        </div>
      </div>
    </navbar>
  )
}

export default Navbar