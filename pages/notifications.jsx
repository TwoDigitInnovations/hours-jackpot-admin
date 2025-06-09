import UserListContainer from '@/components/UserListContainer'
import Table from '@/components/Table/table';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { columns, columnsData } from '@/utils/Table/columns';
import { products } from '@/utils/data';
import { Api } from '@/utils/service';
import { useRouter } from 'next/router';
import moment from 'moment';
import { AiOutlineCheck } from 'react-icons/ai';
import { userContext } from './_app';

const Notifications = (props) => {

    const router = useRouter()
    const [bookings, setBookings] = useState([])
    const [notification, setNotification] = useState('')
    const [SortedBookings, setSortedBookings] = useState([])
    const [donationNames, setDonationNames] = useState([])
    const [selected, setSelected] = useState([])
    const [allSelected, setAllSelected] = useState(false)

    const [user, setUser] = useContext(userContext);


    const nameHandler = ({ value }) => {
        return (
            <div className=' p-4  flex items-center  justify-center'>
                <p className='font-semibold text-lg'>{value}</p>
            </div>
        )
    }
    const statusHandler = ({ value }) => {
        return (
            <div className=' p-4 flex items-center  justify-center'>
                <p className={`font-semibold text-lg `}>{value}</p>
            </div>
        )
    }
    const PriceHandler = ({ value, row }) => {
        return (
            <div className=' p-4 flex items-center  justify-center'>
                <p className='font-semibold text-lg'>{row.original.ticket.currency_symbol}{value}</p>
            </div>
        )
    }
    const startDateHandler = ({ value }) => {
        return (
            <div className=' p-4 flex items-center  justify-center'>
                <p className='font-semibold text-lg'>{moment(value).format('DD MMM YYYY  hh:mma')}</p>
            </div>
        )
    }

    const qtyHandler = ({ value }) => {
        return (
            <div className=' p-4 flex items-center  justify-center'>
                <p className='font-semibold text-lg'>{value}</p>
            </div>
        )
    }
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("PBuser"))) {
            router.push('/login')
        }
    })


    useEffect(() => {
        let updated = SortedBookings.map((book) => {
            if (allSelected) {
                book.checked = true
                return book
            }
            else {
                book.checked = false
                return book
            }
        })
        setSortedBookings(updated)
    }, [allSelected])

    const checkBoxHandler = ({ value, row }) => {
        return (
            <div className=' p-4 flex items-center  justify-center'>
                {/* <input type="checkbox" name="" id={value} className='w-5 h-5 cursor-pointer' checked={allSelected || row.original.checked} onChange={() => {
                    console.log(SortedBookings)

                    let updated = SortedBookings.map((book) => {
                        //console.log(book)
                        if (book._id === value) {
                            book.checked = !book.checked
                            return book
                        }
                        return book
                    })
                    // console.log(updated)
                    setSortedBookings(updated)
                }} /> */}
                <div className={`w-5 h-5 ${selected.includes(value) && 'bg-[#FFCD03]'} ${(row.original.checked) && 'bg-[#FFCD03]'} border border-[#FFCD03] flex items-center justify-center cursor-pointer`}
                    onClick={() => {
                        let updated = SortedBookings.map((book) => {
                            //console.log(book)
                            if (book._id === value) {
                                book.checked = !book.checked
                                return book
                            }
                            return book
                        })
                        // console.log(updated)
                        setSortedBookings(updated)
                    }}
                >
                    <AiOutlineCheck className={`font-semibold  ${(row.original.checked) ? 'text-black' : 'text-white'}`} />
                </div>
            </div>
        )
    }


    const columns = useMemo(() => [
        {
            Header: "SELECT",
            accessor: "_id",
            Cell: checkBoxHandler
        },
        {
            Header: "NAME",
            accessor: "user.firstname",
            Cell: nameHandler
        },
        {
            Header: "NUMBER",
            accessor: "user.phone",
            Cell: nameHandler
        },
        {
            Header: "EMAIL",
            accessor: "user.email",
            Cell: statusHandler
        },
        {
            Header: "DONATION NAME",
            accessor: "ticket.title",
            Cell: nameHandler
        },
        {
            Header: "TICKET PRICE",
            accessor: "ticket.ticket_price",
            Cell: PriceHandler
        },
        {
            Header: "QUANTITY",
            accessor: 'qty',
            Cell: qtyHandler
        },
        {
            Header: "DONATION DATE",
            accessor: 'ticket.createdAt',
            Cell: startDateHandler

        }
    ], [SortedBookings, allSelected])

    const getBookings = () => {
        props.loader(true);
        Api("get", '/api/booking/allBooking', router).then(
            (res) => {
                console.log("res================>", res);
                props.loader(false);
                res.data.forEach((i) => {
                    i.checked = false
                })
                setBookings(res.data)
                setSortedBookings(res.data)
                let tickets = new Set(res.data.map((book) => book.ticket?.title))
                setDonationNames(Array.from(tickets))
            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.message });
            }
        );
    }

    const sendNotification = () => {
        let users = Array.from(new Set(
            SortedBookings.filter((book) => {
                if (book.checked && book.user) {
                    return book
                }
            })
                .map((book) => book.user?._id)
        ))
        // console.log(users)
        if (!notification) {
            props.toaster({ type: "error", message: "Notification Required" })
            return
        }
        if (users.length === 0) {
            props.toaster({ type: "error", message: "Select Bookings" })
            return
        }
        props.loader(true);
        Api("post", '/api/notification/create', { notification, users: users }, router).then(
            (res) => {
                props.loader(false);
                console.log("res================>", res);
                setNotification('')
                getBookings()
                props.toaster({ type: 'success', message: res.message });
            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.message });
            }
        );
    }
    useEffect(() => {
        getBookings()
    }, [])


    const sortingHandler = (e) => {
        let val = e.target.value
        //console.log(val)
        if (!val) {
            setSortedBookings(bookings)
            return
        }

        let sorted = bookings.filter((book) => book.ticket?.title?.toLowerCase().includes(val.toLowerCase()))
        //console.log(sorted)
        setSortedBookings(sorted)
    }

    return (
        <section className='md:px-6 px-2 md:py-4 py-4 bg-[#FFF8DA] relative   '>
            <h2 className='upercase text-2xl md:text-3xl font-semibold mb-3'>Notification Broadcasting</h2>
            <div className='w-[99%] mx-auto md:w-full bg-white h-full border-2 border-black rounded-[30px] p-3 md:p-6 flex flex-col overflow-auto space-y-4'>
                <h2 className='upercase text-2xl md:text-3xl font-semiboldtext-center md:text-left'>Notification:</h2>
                <div className='p-3 md:p-4 bg-[#FFF8DA] text-sm  md:text-lg rounded-3xl font-semibold'>
                    <textarea type="text" className='w-full bg-transparent outline-none' rows={5} value={notification}
                        placeholder='Write Something'
                        onChange={(e) => setNotification(e.target.value)} />
                </div>
                <div className='flex items-center  gap-10 justify-center md:justify-start'>
                    <button className='md:px-10 md:py-3 px-3 py-1 text-black font-semibold text-md md:text-2xl bg-[#FFCD03] rounded-lg'
                        onClick={sendNotification}
                    >Send Notification</button>
                    <div className='flex items-center gap-2'>
                        <p className='text-lg font-medium'>Sort:</p>
                        <select name="" id="" className='px-2 md:py-1 border border-black' onChange={sortingHandler}>
                            <option value="">All Donations</option>
                            {
                                donationNames?.map((name, idx) => (
                                    name &&
                                    <option key={idx} value={name}>{name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <button className=' px-3 py-1 text-black  text-md bg-[#FFCD03] rounded-lg' onClick={() => setAllSelected(!allSelected)}>{allSelected ? "Unselect all" : "Select All"}</button>
                </div>
                <div className='h-full w-full'>
                    <Table columns={columns} data={SortedBookings} />
                </div>
            </div>
        </section>
    )
}

export default Notifications