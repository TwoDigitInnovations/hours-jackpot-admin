import React, { useEffect, useMemo, useState } from 'react'
// import Table from '@/components/Table/table'
import { Api } from '@/utils/service'
import { useRouter } from 'next/router'
import moment from 'moment'
import { FiEdit } from "react-icons/fi";
import { RxCrossCircled } from 'react-icons/rx'
import Table from '@/components/Table/table';


function UserManagement(props) {
    const router = useRouter()
    const [userList, setUserList] = useState([]);
    const [viewPopup, setviewPopup] = useState(false)
    const [openWallet, setOpenWallet] = useState("");
    const [walletId, setWalletId] = useState("");

    useEffect(() => {
        getUser()
    }, [])

    const getUser = () => {
        props.loader(true);
        Api("get", '/api/auth/getUser', router).then(
            (res) => {
                props.loader(false);
                console.log("res================>", res);
                setUserList(res.data)
            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.message });
            }
        );
    }

    const updateUserWallet = async (e) => {
        e.preventDefault();

        const data = {
            wallet: openWallet,
            _id: walletId
        }

        console.log(data)
        // return

        props.loader(true);
        Api("post", '/api/auth/updateUserWalletInc', data, router).then(
            (res) => {
                props.loader(false);
                console.log("res================>", res);
                if (res.success) {
                    setOpenWallet("")
                    setWalletId("")
                    setviewPopup(false)
                    getUser()
                    props.toaster({ type: "success", message: res?.message });
                }
                else {
                    props.toaster({ type: "error", message: res?.data?.message });
                }
            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.message });
            }
        );
    }

    const firstname = ({ value }) => {
        return (
            <div className='p-4 flex justify-center items-center'>
                <p className='text-black text-lg font-semibold'>{value}</p>
            </div>
        )
    }

    const lastname = ({ value }) => {
        return (
            <div className='p-4 flex justify-center items-center'>
                <p className='text-black text-lg font-semibold'>{value}</p>
            </div>
        )
    }

    const phone = ({ value, row }) => {
        // console.log(row?.original)
        return (
            <div className='p-4 flex justify-center items-center'>
                <p className='text-black text-lg font-semibold'>{row?.original?.dial_code}{row?.original?.phone}</p>
            </div>
        )
    }

    const email = ({ value }) => {
        return (
            <div className='p-4 flex justify-center items-center'>
                <p className={`text-black text-lg font-semibold`}>{value}</p>
            </div>
        )
    }

    const userId = ({ value, row }) => {
        console.log(row?.original)
        return (
            <div className='p-4 flex justify-center items-center'>
                <p className={`text-black text-lg font-semibold`}>{row?.original?.user_id || row?.original?._id}</p>
            </div>
        )
    }

    const wallet = ({ value, row }) => {
        // console.log(row?.original)
        return (
            <div className='p-4 flex flex-col justify-center items-center'>
                <p className='text-black text-lg font-semibold'>{value}</p>
                <div className="bg-custom-yellow w-10 flex items-center  justify-evenly  border border-black rounded-[8px] mt-[10px]">
                    <div className="p-[10px] items-center flex justify-center cursor-pointer" onClick={() => { setviewPopup(true); setWalletId(row?.original?._id) }}>
                        <FiEdit className="text-[16px] text-black" />
                    </div>
                </div>

                {/* <p className='text-black text-lg font-semibold'>{value}</p> */}
            </div>
        )
    }

    const columns = useMemo(
        () => [
            {
                Header: "FIRST NAME",
                accessor: "firstname",
                Cell: firstname
            },
            {
                Header: "LAST NAME",
                accessor: "lastname",
                Cell: lastname
            },
            {
                Header: "NUMBER",
                accessor: "phone",
                Cell: phone
            },
            {
                Header: "EMAIL",
                accessor: "email",
                Cell: email
            },
            {
                Header: "User Id",
                accessor: "user_id",
                Cell: userId
            },
            {
                Header: "WALLET",
                accessor: "wallet",
                Cell: wallet
            },
        ],
        []
    );

    return (
        <section className='max-w-screen md:max-w-full md:px-6 px-2 py-4 bg-[#FFF8DA] md:max-h-auto relative flex flex-col'>
            <div className='w-full md:space-y-5 space-y-2 text-center md:text-left'>
                <h2 className='upercase text-2xl md:text-3xl font-semibold'>User Management</h2>
            </div>

            {viewPopup && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-black/30 flex justify-center items-center z-50">
                    <div className="relative w-[300px] md:w-[360px] h-auto  bg-white rounded-[15px] m-auto">
                        <div className="absolute top-2 right-2 p-1 rounded-full  text-black w-8 h-8 cursor-pointer" onClick={() => setviewPopup(!viewPopup)}>
                            <RxCrossCircled className="h-full w-full font-semibold " />
                        </div>

                        <div className='px-5 md:py-10 py-5'>
                            <form className='w-full' onSubmit={updateUserWallet}>
                                <p className='text-black text-lg font-semibold pb-1'>wallet</p>
                                <input className='w-full h-[40px] px-2 border-2 border-black rounded  text-black text-lg font-semibold' type="number"
                                    value={openWallet}
                                    onChange={((e) => {
                                        setOpenWallet(e.target.value)
                                    })}
                                    required
                                />
                                <button className="text-lg text-black font-semibold  bg-custom-yellow rounded-lg w-full h-[40px] mt-5" type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <div className='row-span-5 md:py-4 w-full h-auto mt-3 md:mt-0'>
                <div className='h-auto w-full md:w-full mx-auto md:rounded-[30px] rounded-xl border-2 border-black bg-white px-2 md:px-5 pb-2'>
                    <Table columns={columns} data={userList} />
                </div>
            </div>
        </section>
    )
}

export default UserManagement
