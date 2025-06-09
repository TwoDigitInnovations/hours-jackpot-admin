import React from 'react'

const UserList = () => {
    return (
        <div className='grid grid-cols-12 my-2 hover:shadow-lg rounded-xl cursor-pointer hover:scale-[0.97] transition-all duration-300'>
            <div className=' p-4 col-span-1'>
                <div className='w-12 h-12 rounded-full overflow-hidden'>
                    <img src="/img.jpg" alt="" className='w-full h-full object-cover' />
                </div>
            </div>
            <div className=' p-4 col-span-2 flex items-center'>
                <p className='font-semibold text-xl'>Harry Potter</p>
            </div>
            <div className=' p-4 col-span-4 flex items-center'>
                <p className='font-semibold text-xl'>Contact No- 999XXXXXXX</p>
            </div>
            <div className=' p-4 col-span-3 flex items-center'>
                <p className='font-semibold text-xl text-green-400'>Purchased</p>
            </div>
            <div className=' p-4 col-span-2 flex items-center'>
                <p className='font-semibold text-xl text-neutral-400'>More Details</p>
            </div>
        </div>
    )
}

export default UserList