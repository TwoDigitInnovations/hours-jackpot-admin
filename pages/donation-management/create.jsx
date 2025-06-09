import { Api, ApiFormData } from '@/utils/service'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../_app'

const currencies = [
  // { name: "Australian Dollar", code: "AUD", symbol: "$" },
  // { name: "United States Dollar", code: "USD", symbol: "$" },
  // { name: "British Pound Sterling", code: "GBP", symbol: "£" },
  // { name: "Euro", code: "EUR", symbol: "€" },
  // { name: "Canadian Dollar", code: "CAD", symbol: "$" },
  { name: "Indian Rupee", code: "INR", symbol: "₹" },
];
const currencySymbols = {
  AUD: "$",
  USD: "$",
  GBP: "£",
  EUR: "€",
  CAD: "$",
  INR: "₹"
}

const Create = (props) => {
  const [selectedCurrency, setSelectedCurrency] = useState({ name: "Select currency", code: "Select currency", symbol: null });
  const [donation, setDonation] = useState({
    image: "",
    title: "",
    start_date: new Date(),
    end_date: new Date(),
    currency: "",
    currency_symbol: "",
    winning_price: "",
    ticket_price: "",
    tooltip: "",
    capacity: "",
    video: "",
  })
  const [user, setUser] = useContext(userContext);

  const router = useRouter()

  const submit = () => {
    if (donation.image && donation.ticket_price && donation.title && donation.tooltip && donation.start_date && donation.end_date && donation.winning_price && donation.currency && donation.capacity && donation.answer) {
      console.log(donation)
      if (new Date(donation.start_date) < new Date() || new Date(donation.start_date) < new Date()) {
        props.toaster({ type: "error", message: "Past Date not Valid" });
        return
      }
      if (new Date(donation.start_date) > new Date(donation.end_date)) {
        props.toaster({ type: "error", message: "End date should be after start date" });
        return
      }

      let id = null;
      if (router.query?.ticket) {
        donation.id = JSON.parse(router.query?.ticket)._id
      }
      console.log(donation)

      props.loader(true);
      Api("post", '/api/tickets/create', donation, router).then(
        (res) => {
          console.log("res================>", res);
          props.loader(false);
          props.toaster({ type: "success", message: res.message || 'Donation Successful' });
          setDonation({
            image: '',
            title: "",
            start_date: "",
            end_date: "",
            winning_price: "",
            currency: "",
            currency_symbol: "",
            ticket_price: "",
            tooltip: "",
            answer: "",
            video: "",
          })
          router.push('/donation-management')
        },
        (err) => {
          props.loader(false);
          console.log(err);
          props.toaster({ type: "error", message: err?.message });
        }
      );
    } else {
      props.toaster({ type: "error", message: "Fill information properly" });

    }
  }

  const uploadPic = (file, type) => {
    console.log(file[0])
    const data = new FormData();
    data.append("file", file[0]);
    props.loader(true)
    ApiFormData("post", "/api/user/fileupload", data, router).then(
      (res) => {
        props.loader(false);
        if (res?.status) {
          donation[type] = res.data.file
          setDonation({ ...donation })
          props.toaster({
            type: "success",
            message: "Meadia Uploded",
          });
          console.log(res);
        } else {
          props.toaster({ type: "error", message: res?.data?.message });
        }
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.data?.message });
        props.toaster({ type: "error", message: err?.message });
      }
    );
  }

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("PBuser"))) {
      router.push('/login')
    }

    if (router.query.ticket) {
      console.log(router.query)

      let data = JSON.parse(router?.query?.ticket)
      setDonation({
        image: data.image,
        title: data.title,
        start_date: data.start_date,
        end_date: data.end_date,
        winning_price: data.winning_price,
        ticket_price: data.ticket_price,
        tooltip: data.tooltip,
        currency_symbol: data.currency_symbol,
        currency: data.currency,
        answer: data.answer,
        capacity: data.capacity,
        video: data.video
      })
      console.log(data)
    }
  }, [router.query])

  // console.log(donation)
  // console.log(currencies)


  return (
    <section className='md:px-6 px-2  py-4 bg-[#FFF8DA] relative  flex flex-col items-center md:items-start md:space-y-6  text-center md:text-left  '>
      <div className='w-full '>
        <h2 className='upercase text-2xl md:text-3xl font-semibold'>Donation Management</h2>
      </div>
      <div className='space-y-4 max-w-[99%] w-full  overflow-scroll '>
        <h2 className='upercase text-2xl md:text-3xl '>Post new Donation</h2>
        <form action="" className='border-2 border-black bg-white p-4 md:p-8 rounded-[30px] w-full  grid md:grid-cols-2 gap-4'>
          <div className='border-2 border-black bg-transparent p-2 rounded-[30px] relative'>
            <p className='bg-[#FFCD03] rounded-md px-2 absolute top-0 left-8 z-20 translate-y-[-50%]'>Name of the Donation </p>
            <input type="text" className='w-full h-full p-2 bg-transparent outline-none'
              value={donation.title}
              placeholder='Donation name'
              onChange={(e) => setDonation({ ...donation, title: e.target.value })} />
          </div>
          <div className='border-2 border-black bg-transparent p-2 rounded-[30px] relative'>
            <p className='bg-[#FFCD03] rounded-md px-2 absolute top-0 left-8 z-20 translate-y-[-50%]'>Currency</p>
            <select className='w-full h-full p-2 bg-transparent outline-none'
              onChange={(e) => {
                console.log(e.target.value)
                setDonation({ ...donation, currency: (e.target.value), currency_symbol: currencySymbols[e.target.value] })
              }}

              value={donation.currency}
            >
              <option value={''}>Select Currency</option>
              {
                currencies.map((curr) => (
                  <option value={curr.code}>{curr.code}</option>
                ))
              }
            </select>
          </div>
          <div className='border-2 border-black bg-transparent p-2 rounded-[30px] relative'>
            <p className='bg-[#FFCD03] rounded-md px-2 absolute top-0 left-8 z-20 translate-y-[-50%]'>Start Date</p>

            <input type="datetime-local" className='w-full h-full p-2 bg-transparent outline-none'
              value={format(
                new Date(donation?.start_date || new Date()),
                "yyyy-MM-dd'T'HH:mm"
              )}
              min={new Date().toISOString().slice(0, 16)}
              onChange={(e) => {

                setDonation({ ...donation, start_date: new Date(e.target.value) })
              }} />
          </div>
          <div className='border-2 border-black bg-transparent p-2 rounded-[30px] relative'>
            <p className='bg-[#FFCD03] rounded-md px-2 absolute top-0 left-8 z-20 translate-y-[-50%]'>End Date</p>
            <input type="datetime-local" className='w-full h-full p-2 bg-transparent outline-none'
              value={format(
                new Date(donation?.end_date || new Date()),
                "yyyy-MM-dd'T'HH:mm"
              )}
              min={new Date().toISOString().slice(0, 16)}
              onChange={(e) => setDonation({ ...donation, end_date: new Date(e.target.value) })} />
          </div>
          <div className='border-2 border-black bg-transparent p-2 rounded-[30px] relative flex items-center  px-3'>
            <p className='bg-[#FFCD03] rounded-md px-2 absolute top-0 left-8 z-20 translate-y-[-50%]'>Cost of the Donation</p>
            {
              donation.currency_symbol && <p className='p-2'>{donation.currency_symbol}</p>
            }
            <input type="number" className='w-full h-full py-2 bg-transparent outline-none'
              value={donation.ticket_price}
              placeholder='Donation cost'
              onChange={(e) => setDonation({ ...donation, ticket_price: e.target.value })} />
          </div>

          <div className='border-2 border-black bg-transparent p-2 rounded-[30px] relative flex  items-center px-3'>
            <p className='bg-[#FFCD03] rounded-md px-2 absolute top-0 left-8 z-20 translate-y-[-50%]'>Winnings</p>
            {
              donation.currency_symbol && <p className='p-2'>{donation.currency_symbol}</p>
            }
            <input type="number" className='w-full h-full py-2 bg-transparent outline-none'
              value={donation.winning_price}
              placeholder='Winning amount'
              onChange={(e) => setDonation({ ...donation, winning_price: e.target.value })} />
          </div>

          <div className='border-2 border-black bg-transparent p-2 rounded-[30px] relative flex  items-center px-3'>
            <p className='bg-[#FFCD03] rounded-md px-2 absolute top-0 left-8 z-20 translate-y-[-50%]'>Capacity</p>
            <input type="number" className='w-full h-full py-2 bg-transparent outline-none'
              value={donation.capacity}
              placeholder='Capacity'
              onChange={(e) => setDonation({ ...donation, capacity: e.target.value })} />
          </div>

          <div className='border-2 border-black bg-transparent p-2 rounded-[30px] relative'>
            <p className='bg-[#FFCD03] rounded-md px-2 absolute top-0 left-8 z-20 translate-y-[-50%]'>Donation photo upload</p>
            <input type="file" className='w-full h-full p-2 bg-transparent outline-none'
              placeholder='Image URL'
              onChange={(e) => uploadPic(e.target.files, 'image')} />
            {/* <input type="text" className='w-full h-full py-2 bg-transparent outline-none'
              value={donation.image}
              placeholder='Image url'
              onChange={(e) => {
                console.log(e)
                setDonation({ ...donation, image: e.target.value })
              }} /> */}
          </div>

          <div className='border-2 border-black bg-transparent p-2 rounded-[30px] relative'>
            <p className='bg-[#FFCD03] rounded-md px-2 absolute top-0 left-8 z-20 translate-y-[-50%]'>ToolTip</p>
            <input type="text" className='w-full h-full p-2 bg-transparent outline-none'
              value={donation.tooltip}
              placeholder='Tooltip'
              onChange={(e) => setDonation({ ...donation, tooltip: e.target.value })} />
          </div>

          <div className='border-2 border-black bg-transparent p-2 rounded-[30px] relative'>
            <p className='bg-[#FFCD03] rounded-md px-2 absolute top-0 left-8 z-20 translate-y-[-50%]'>Answer (Date & Time)</p>
            <input type="datetime-local" className='w-full h-full p-2 bg-transparent outline-none'
              value={format(
                new Date(donation?.answer || new Date()),
                "yyyy-MM-dd'T'HH:mm"
              )}
              min={new Date().toISOString().slice(0, 16)}
              placeholder='Answer (Date & Time)'
              onChange={(e) => setDonation({ ...donation, answer: e.target.value })} />
          </div>

          <div className='border-2 border-black bg-transparent p-2 rounded-[30px] relative'>
            <p className='bg-[#FFCD03] rounded-md px-2 absolute top-0 left-8 z-20 translate-y-[-50%]'>Video upload</p>
            <input type="file" className='w-full h-full p-2 bg-transparent outline-none'
              placeholder='Video URL'
              onChange={(e) => uploadPic(e.target.files, 'video')} />
            {/* <input type="text" className='w-full h-full py-2 bg-transparent outline-none'
              value={donation.video}
              placeholder='Video url'
              onChange={(e) => {
                console.log(e)
                setDonation({ ...donation, video: e.target.value })
              }} /> */}
          </div>
        </form>
        <div className='flex items-center justify-center w-full'>
          <button className="text-lg text-black font-semibold rounded-lg bg-[#FFCD03] py-2  px-8" onClick={submit} >
            {router.query.ticket ? "Update" : "Post"}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Create