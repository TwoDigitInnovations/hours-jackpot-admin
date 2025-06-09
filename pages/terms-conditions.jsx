import { Api } from '@/utils/service';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const Termsconditions = (props) => {
    const router = useRouter()
    const [terms, setTerms] = useState('')
    const termsSubmit = () => {
        props.loader(true)
        Api("get", '/api/content/create', router).then(
            (res) => {
                props.loader(false)
                console.log("res================>", res);
                setTerms(res.data.terms[0].termsAndConditions)
            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.message });
            }
        );
        props.loader(false)
    }
    useEffect(() => {
        termsSubmit()
    }, [])
    return (
        <section className='w-screen h-full ' >
            {/* <div className='h-full max-w-6xl mx-auto p-4 md:p-0  '>
                <h1 className='text-2xl md:text-3xl font-semibold text-custom-orange uppercase text-center mt-2'>Terms and Conditions for Paul Barber App</h1>
                <div className='space-y-3 my-4'>
                    <h2 className='font-medium text-xl md:text-2xl text-custom-orange'>
                        Introduction
                    </h2>
                    <p className='text-md md:text-lg text-black'>
                        These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, Paul Barber App accessible at https//paulbarberapp.com.                    </p>
                    <p className='text-md md:text-lg text-black'>These Terms will be applied fully and affect to your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here. You must not use this Website if you disagree with any of these Website Standard Terms and Conditions. These Terms and Conditions have been generated with the help of the Terms And Conditiions Sample Generator.</p>
                    <p className='text-md md:text-lg text-black'>Minors or people below 18 years old are not allowed to use this Website.</p>
                    <h2 className='font-medium text-xl md:text-2xl text-custom-orange'>
                        Intellectual Property Rights
                    </h2>
                    <p className='text-md md:text-lg text-black'>
                        Other than the content you own, under these Terms, Paul Barber App and/or its licensors own all the intellectual property rights and materials contained in this Website.
                    </p>
                    <p className='text-md md:text-lg text-black'>You are granted limited license only for purposes of viewing the material contained on this Website.</p>
                    <h2 className='font-medium text-xl md:text-2xl text-custom-orange'>
                        Restrictions
                    </h2>
                    <p className='text-md md:text-lg text-black'>You are specifically restricted from all of the following:</p>
                    <p className='text-md md:text-lg text-black'>publishing any Website material in any other media;</p>
                    <p className='text-md md:text-lg text-black'>selling, sublicensing and/or otherwise commercializing any Website material;</p>
                    <p className='text-md md:text-lg text-black'>publicly performing and/or showing any Website material;</p>
                    <p className='text-md md:text-lg text-black'>using this Website in any way that is or may be damaging to this Website;</p>
                    <p className='text-md md:text-lg text-black'>using this Website in any way that impacts user access to this Website;</p>
                    <p className='text-md md:text-lg text-black'>using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;</p>
                    <p className='text-md md:text-lg text-black'>engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;</p>
                    <p className='text-md md:text-lg text-black'>using this Website to engage in any advertising or marketing.</p>
                    <p className='text-md md:text-lg text-black'>Certain areas of this Website are restricted from being access by you and Paul Barber App may further restrict access by you to any areas of this Website, at any time, in absolute discretion. Any user ID and password you may have for this Website are confidential and you must maintain confidentiality as well.</p>
                    <h2 className='font-medium text-xl md:text-2xl text-custom-orange'>
                        Your Content
                    </h2>
                    <p className='text-md md:text-lg text-black'>In these Website Standard Terms and Conditions, "Your Content" shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant Paul Barber App a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.</p>
                    <p className='text-md md:text-lg text-black'>Your Content must be your own and must not be invading any third-party's rights. Paul Barber App reserves the right to remove any of Your Content from this Website at any time without notice.</p>
                    <h2 className='font-medium text-xl md:text-2xl text-custom-orange'>
                        No warranties
                    </h2>
                    <p className='text-md md:text-lg text-black'>This Website is provided "as is," with all faults, and Paul Barber App express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.</p>
                    <h2 className='font-medium text-xl md:text-2xl text-custom-orange'>
                        Limitation of liability
                    </h2>
                    <p className='text-md md:text-lg text-black'>In no event shall Paul Barber App, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract.  Paul Barber App, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.</p>
                    <h2 className='font-medium text-xl md:text-2xl text-custom-orange'>
                        Indemnification
                    </h2>
                    <p className='text-md md:text-lg text-black'>You hereby indemnify to the fullest extent Paul Barber App from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these Terms.</p>
                    <h2 className='font-medium text-xl md:text-2xl text-custom-orange'>
                        Severability
                    </h2>
                    <p className='text-md md:text-lg text-black'>If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.</p>
                    <h2 className='font-medium text-xl md:text-2xl text-custom-orange'>
                        Variation of Terms
                    </h2>
                    <p className='text-md md:text-lg text-black'>Paul Barber App is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis.</p>
                    <h2 className='font-medium text-xl md:text-2xl text-custom-orange'>
                        Assignment
                    </h2>
                    <p className='text-md md:text-lg text-black'>The Paul Barber App is allowed to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.</p>
                    <h2 className='font-medium text-xl md:text-2xl text-custom-orange'>
                        Entire Agreement
                    </h2>
                    <p className='text-md md:text-lg text-black'>These Terms constitute the entire agreement between Paul Barber App and you in relation to your use of this Website, and supersede all prior agreements and understandings.</p>
                    <h2 className='font-medium text-xl md:text-2xl text-custom-orange'>
                        Governing Law & Jurisdiction
                    </h2>
                    <p className='text-md md:text-lg text-black'>These Terms will be governed by and interpreted in accordance with the laws of the State of ae, and you submit to the non-exclusive jurisdiction of the state and federal courts located in ae for the resolution of any disputes.</p>
                </div>
            </div> */}

            <div className='h-full max-w-6xl mx-auto p-4 md:p-0 ' dangerouslySetInnerHTML={{ __html: terms }}>
            </div>
        </section>
    )
}

export default Termsconditions