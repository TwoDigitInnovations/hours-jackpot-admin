import Table from '@/components/Table/table'
import { columnsData, DonationManagementColumn } from '@/utils/Table/columns';
import { products } from '@/utils/data';
import { Api } from '@/utils/service';
import moment from 'moment/moment';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { userContext } from '../_app';

const DonationManagement = (props) => {
    const router = useRouter()
    const [donations, setDonations] = useState([])
    const [user, setUser] = useContext(userContext);

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("PBuser"))) {
            router.push('/login')
        }
        getDonations()
    }, [])

    const imgHandler = ({ value }) => {
        return (
            <div className='w-12 h-12 rounded-full overflow-hidden'>
                <img src={value || '/img.jpg'} alt="" className='w-12 h-12 rounded-full object-cover' />
            </div>
        )
    }

    const nameHandler = ({ value }) => {
        return (
            <div className=' p-4  flex items-center'>
                <p className='font-semibold text-lg'>{value}</p>
            </div>
        )
    }

    const manageHandler = ({ value, row }) => {
        const router = useRouter()

        return (
            <div className="flex  items-center gap-3 ">
                <button className="text-lg text-black font-semibold border-2 border-[#FFCD03] rounded-lg py-1 md:px-8 px-3" onClick={() => {
                    router.push(`/donation-management/create`)
                }}>
                    Review
                </button>
                <div className='relative tooltip-container'>
                    <button className="text-lg text-black font-semibold  bg-[#FFCD03] rounded-lg py-1 md:px-8 px-3" onClick={() => {
                        router.push(`/donation-management/create?ticket=${encodeURIComponent(JSON.stringify(row.original))}`)
                    }}>
                        Manage Ticket
                    </button>
                    <div className="absolute hidden bg-black text-white px-2 py-1 rounded text-sm top-full left-1/2 transform -translate-x-1/2 -translate-y-px">
                        {row.original.tooltip}
                    </div>
                </div>
            </div>
        )
    }

    const PriceHandler = ({ value, row }) => {
        return (
            <div className=' p-4 flex items-center'>
                <p className='font-semibold text-lg'>{row.original.currency_symbol}{value}</p>
            </div>
        )
    }

    const startDateHandler = ({ value }) => {

        return (
            <div className=' p-4 flex items-center'>
                <p className='font-semibold text-lg'>{moment(value).format('DD MMM YYYY') + " " + moment(new Date(value)).format('h:mma')}</p>
            </div>
        )
    }

    const columns = useMemo(
        () => [{
            Header: "Image",
            accessor: "image",
            Cell: imgHandler
        },
        {
            Header: "DONATION NAME",
            accessor: "title",
            Cell: nameHandler
        },
        {
            Header: "PRICE",
            accessor: "ticket_price",
            Cell: PriceHandler
        },
        {
            Header: "Start Date",
            accessor: 'start_date',
            Cell: startDateHandler
        },
        {
            Header: "End Date",
            accessor: 'end_date',
            Cell: startDateHandler
        },
        {
            Header: "VIEW & UPDATE",
            accessor: "id",
            Cell: manageHandler
        }
        ],
        []
    );

    const getDonations = () => {
        props.loader(true);
        Api("get", '/api/tickets/getlatest', router).then(
            (res) => {
                console.log("res================>", res);
                setDonations(res.data)
                props.loader(false);
            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.message });
            }
        );
    }



    return (
        <section className='md:px-6 px-2 md:py-4 py-4 bg-[#FFF8DA]  relative  flex flex-col    '>
            <div className='w-full row-span-1 md:space-y-5 space-y-2 text-center'>
                <div className='flex flex-col sm:flex-row sm:items-center sm:gap-20 md:justify-between items-center space-y-2'>
                    <h2 className='upercase text-2xl md:text-3xl font-semibold'>Donation Management</h2>
                    <button className="text-lg text-black font-semibold rounded-lg bg-[#FFCD03] py-2 md:px-8 px-3" onClick={() => {
                        router.push(`/donation-management/create`)
                    }}>
                        New Donation
                    </button>
                </div>
                <div className='flex flex-col sm:flex-row sm:items-center sm:gap-20 md:justify-between '>
                    <h2 className='upercase text-2xl md:text-3xl '>List of All Donations.</h2>
                    {/* <div className='flex items-center justify-center md:justify-start gap-2'>
                        <p>Donation Type:</p>
                        <select name="" id="" className='px-2 py-1 border border-black'>
                            <option value="">All Donations</option>
                        </select>
                    </div> */}
                </div>
            </div>
            <div className='row-span-5 md:py-4 w-full h-full overflow-y-auto mt-3 md:mt-0 md:grid-rows-7'>
                <div className='h-full w-[99%] row-span-5 md:row-span-6   md:w-full mx-auto rounded-[30px] overflow-y-auto  border-2 border-black bg-white p-2 md:p-4'>
                    {/* <UserListContainer /> */}
                    <Table columns={columns} data={donations} />
                </div>
                {/* <div className='w-full md:mt-2  flex justify-center items-center row-span-1'>
                    <button className="text-lg text-black font-semibold rounded-lg bg-[#FFCD03] py-2 md:px-8 px-3" onClick={() => {
                        router.push(`/donation-management/create`)
                    }}>
                        New Donation
                    </button>
                </div> */}
            </div>
        </section>
    )
}



export default DonationManagement
