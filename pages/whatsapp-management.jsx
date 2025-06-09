import { Api } from '@/utils/service';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { userContext } from './_app';
import { validateMobileNumber } from '@/utils/validator';

const WhatsappManagement = (props) => {
    const router = useRouter()
    const [whatsappNumber, setWhatsappNumber] = useState({
        number: '',
        id: ""
    })

    const [user, setUser] = useContext(userContext);


    const getWhatsApp = () => {
        props.loader(true);
        Api("get", '/api/whatsapp/create', router).then(
            (res) => {
                console.log("res================>", res.data[0]);
                setWhatsappNumber({ number: res?.data[0]?.number, id: res?.data[0]?._id })
                props.loader(false);
            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.message });
            }
        );
    }
    const submit = () => {

        if (whatsappNumber.number ) {
            // if(!validateMobileNumber(whatsappNumber.number, props.toaster)){
            //     return
            // }
            props.loader(true);
            Api("post", '/api/whatsapp/create', { ...whatsappNumber }, router).then(
                (res) => {
                    console.log("res================>", res);
                    props.loader(false);
                    getWhatsApp()
                    props.toaster({ type: "success", message: res?.message });
                },
                (err) => {
                    props.loader(false);
                    console.log(err);
                    props.toaster({ type: "error", message: err?.message });
                }
            );
        }
        else {
            props.toaster({ type: "error", message: "Number required" });
        }
    }
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("PBuser"))) {
            router.push('/login')
        }
        getWhatsApp()
    }, [])
    return (
        <section className='md:px-6 px-2 md:py-4 pb-4 bg-[#FFF8DA] relative '>
            <h2 className='upercase text-2xl md:text-3xl font-semibold mb-3'>WhatsApp Number Management</h2>
            <div className='w-[99%] mx-auto md:w-full bg-white h-full border-2 border-black rounded-[30px] p-3 md:p-6 flex flex-col overflow-auto space-y-4'>

                <div className='w-full h-full rounded-[30px] space-y-6'>
                    <div className='bg-[#FFF8DA] text-lg  font-semibold md:w-[400px] w-full'>
                        <input type="number" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" value={whatsappNumber.number} placeholder='9123xxxxxxxx' className='p-3 w-full bg-transparent border-2 border-[#FFCD03] outline-0'
                            onChange={(e) => {
                                // if (e.target.value.length <= 10) {
                                    setWhatsappNumber({ ...whatsappNumber, number: e.target.value })
                                // }
                            }}
                        />
                    </div>
                    <div className='flex items-center 8 gap-10'>
                        <button className='px-4 py-3 text-black font-semibold text-2xl bg-[#FFCD03] rounded-lg' onClick={submit}>Update Number</button>

                    </div>

                </div>
            </div>
        </section>
    )
}

export default WhatsappManagement