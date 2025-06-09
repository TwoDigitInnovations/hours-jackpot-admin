import React from 'react'
import UserList from './UserList'

const UserListContainer = () => {
    return (
        <div className='w-full h-full overflow-y-auto overflow-x-hidden  bg-white p-4 rounded-[30px]'>
            <UserList />
            <UserList />
            <UserList />
            <UserList />
            <UserList />
            <UserList />
            <UserList />
        </div>
    )
}

export default UserListContainer