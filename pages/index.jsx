import Image from 'next/image'
import { Inter } from 'next/font/google'
import UserListContainer from '@/components/UserListContainer'
import Table from '@/components/Table/table'
import { useContext, useEffect, useMemo, useState } from 'react'
import { columnsData } from '@/utils/Table/columns'
import { products } from '@/utils/data'
import { useRouter } from 'next/router'
import { Api } from '@/utils/service'
import moment from 'moment'
import { userContext } from './_app'

const inter = Inter({ subsets: ['latin'] })


export default function Home(props) {
  const router = useRouter()
  const [bookings, setBookings] = useState([])
  const [SortedBookings, setSortedBookings] = useState([])
  const [donationNames, setDonationNames] = useState([])

  const [user, setUser] = useContext(userContext);
  const [donationType, setDonationType] = useState("")
  const [chooseWinnerUser, setChooseWinnerUser] = useState([])

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
        <p className='font-semibold text-lg'>{moment(value).format('DD MMM YYYY  hh:mm:ssa')}</p>
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

  const paymentHandler = ({ row, value }) => {
    console.log(value)
    return (
      <div className=' p-4 flex flex-col items-center  justify-center'>
        <p className={`font-semibold text-lg ${value === 'Completed' ? 'text-green-700' : 'text-yellow-500'}`}>{value || 'Pending'}</p>
        {value !== 'Completed' && <button className='bg-green-700 text-white font-semibold p-2 rounded-md' onClick={() => { paymentStatusUpdate(row) }}>Complete</button>}
      </div>
    )
  }

  const columns = useMemo(
    () => [
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
        Header: "PAYMENT",
        accessor: 'payment_status',
        Cell: paymentHandler
      },
      {
        Header: "DONATION DATE",
        accessor: 'createdAt',
        Cell: startDateHandler

      }
    ],
    [SortedBookings]
  );
  console.log(SortedBookings)
  const paymentStatusUpdate = (row) => {
    const newData = { ...SortedBookings[row.index] }
    newData.payment_status = 'Completed'
    props.loader(true);
    Api("post", '/api/booking/update', newData).then(
      (res) => {
        props.loader(false);
        console.log(row)
        setSortedBookings(pre => {
          console.log(pre)
          pre[row.index].payment_status = 'Completed'
          return [...pre]
        })
        props.toaster({ type: "success", message: res?.message });
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );


  }

  const getBookings = () => {
    props.loader(true);
    Api("get", '/api/booking/allBooking', router).then(
      (res) => {
        console.log("res================>", res);
        setBookings(res.data)
        setSortedBookings(res.data)
        // let tickets = new Set(res.data.map((book) => book.ticket?.title))
        // setDonationNames(res.data)
        props.loader(false);
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  }
  const getAllTickets = () => {
    props.loader(true);
    Api("get", '/api/tickets/getalltickets', router).then(
      (res) => {
        console.log("res================>", res);
        // setBookings(res.data)
        // setSortedBookings(res.data)
        // // let tickets = new Set(res.data.map((book) => book.ticket?.title))
        setDonationNames(res.data)
        props.loader(false);
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  }

  const getBookingsByid = (id) => {
    props.loader(true);
    Api("get", `/api/booking/allBookingbyId/${id}`, router).then(
      (res) => {
        console.log("res================>", res);
        // setBookings(res.data)
        setSortedBookings(res.data)
        // let tickets = new Set(res.data.map((book) => book.ticket?.title))
        // setDonationNames(Array.from(tickets))
        props.loader(false);
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  }

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("PBuser"))) {
      router.push('/login')
    }
    getBookings()
    // getBookingsByid('All')
    getAllTickets()
  }, [])


  const sortingHandler = (e) => {
    let val = e.target.value
    console.log(e)

    //console.log(val)
    if (!val) {
      setChooseWinnerUser([{}])
      console.log(val)
      getBookings()

      // setSortedBookings(bookings)
      return
    }
    setDonationType(val)
    const d = donationNames.find(f => f._id === val)
    console.log(d)
    if (d) {
      setChooseWinnerUser(d?.winnerUser)
    } else {
      setChooseWinnerUser([{}])
    }

    getBookingsByid(val)
    // let sorted = bookings.filter((book) => book.ticket?.title?.toLowerCase().includes(val.toLowerCase()))
    //console.log(sorted)
    // setSortedBookings(sorted)
  }

  const chooseWinner = () => {
    const data = {
      id: donationType,
    }
    console.log(data)
    // return
    props.loader(true);
    Api("post", '/api/chooseWinner', data, router).then(
      (res) => {
        console.log("res================>", res);

        props.loader(false);
        props.toaster({ type: "success", message: res.message });
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  }


  return (
    <section className='max-w-screen md:max-w-full md:px-6 px-2 py-4 bg-[#FFF8DA] md:max-h-auto relative  flex flex-col  '>
      <div className='w-full md:space-y-5 space-y-2 text-center md:text-left'>
        <h2 className='upercase text-2xl md:text-3xl font-semibold'>User Donation Tracking</h2>
        <div className='flex flex-col sm:flex-row sm:items-center sm:gap-20 md:justify-between'>
          <h2 className='upercase text-2xl md:text-3xl md:mb-0 mb-[8px]'>List of All users.</h2>

          <div className='flex md:flex-row flex-col justify-center items-center gap-5'>
            <div className='flex items-center justify-center md:justify-start gap-2'>
              <p>Donation Type:</p>
              <select name="" id="" className='px-2 md:py-1 border border-black' onChange={sortingHandler}>
                <option value="">All Donations</option>
                {
                  donationNames?.map((name, i) => (
                    name &&
                    <option key={i} value={name._id}>{name?.title}</option>
                  ))
                }
              </select>
            </div>
            {donationType !== '' && chooseWinnerUser?.length === 0 && <button className='bg-custom-yellow w-40 h-[40px] text-lg text-black font-semibold rounded-lg' onClick={chooseWinner}>Choose Winner</button>}
          </div>
        </div>
      </div>
      <div className='row-span-5 md:py-4 w-full h-auto  mt-3 md:mt-0 '>
        <div className='h-auto w-[99%]  md:w-full mx-auto rounded-[30px]   border-2 border-black bg-white p-2 md:p-4'>

          {/* <UserListContainer /> */}
          <Table columns={columns} data={SortedBookings} />
        </div>
      </div>
    </section>
  )
}
