import { Api } from '@/utils/service';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { userContext } from './_app';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const ContentManagement = (props) => {
    const router = useRouter()
    const [tab, setTab] = useState('howItWorks')
    const [content, setContent] = useState({
        howItWorks: ''
    })
    const [terms, setTerms] = useState({
        termsAndConditions: ''
    })

    const [user, setUser] = useContext(userContext);

    // console.log(content);

    const getContent = () => {
        props.loader(true);
        Api("get", '/api/content/create', router).then(
            (res) => {
                console.log("res================>", res.data);
                setContent(
                    res.data.how[0]
                )
                setTerms(
                    res.data.terms[0]
                )
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
        console.log(content)
        if (content && !content?.howItWorks) {
            props.toaster({ type: "error", message: "How it Works required" });
            return
        }

        props.loader(true);
        Api("post", '/api/content/create', { ...content }, router).then(
            (res) => {
                console.log("res================>", res);
                props.loader(false);
                props.toaster({ type: "success", message: res.message });
                getContent();
            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.message });
            }
        );
    }

    const termsSubmit = () => {
        console.log(terms)
        if (terms && !terms?.termsAndConditions) {
            props.toaster({ type: "error", message: "Terms And Conditions required" });
            return
        }

        props.loader(true);
        Api("post", '/api/terms/create', { ...terms }, router).then(
            (res) => {
                console.log("res================>", res);
                props.loader(false);
                props.toaster({ type: "success", message: res.message });
                getContent();
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
        getContent()
    }, [])

    return (
        <section className='md:px-6 px-2 md:py-4 pb-4 bg-[#FFF8DA]  relative   '>
            <h2 className='upercase text-2xl md:text-3xl font-semibold mb-3'>Content Management</h2>
            <div className='w-[99%] mx-auto md:w-full bg-white h-full border-2 border-black rounded-[30px] p-3 md:p-8 flex flex-col overflow-auto space-y-4'>
                <h3 className='text-md md:text-xl font-semibold'>How it Works :</h3>
                <div className='w-full  p-4 text-sm md:text-md rounded-2xl bg-[#FFF8DA] space-y-4'>
                    <JoditEditor
                        className="editor max-h-screen overflow-auto"
                        rows={8}
                        value={content?.howItWorks}
                        onChange={newContent => {
                            setContent({
                                ...content,
                                howItWorks: newContent
                            })

                        }}
                    />
                    {/* <textarea name="" id="" rows="15" className="w-full h-full bg-transparent outline-none"></textarea> */}
                </div>
                <div className="flex gap-10 items-center justify-center md:justify-start">
                    <button className="text-lg text-black font-semibold  bg-[#FFCD03] rounded-lg md:py-2 py-1 px-2 md:px-8" onClick={submit}>Update how it works</button>
                </div>
                <h3 className='text-md md:text-xl font-semibold'>Terms and Conditions :</h3>
                <div className='w-full  p-4 text-sm md:text-md rounded-2xl bg-[#FFF8DA] space-y-4'>
                    <JoditEditor
                        className="editor max-h-screen overflow-auto"
                        rows={8}
                        value={terms?.termsAndConditions}
                        onChange={newContent => {
                            setTerms({
                                ...terms,
                                termsAndConditions: newContent,
                            });
                        }}
                    />
                    {/* <textarea name="" id="" rows="15" className="w-full h-full bg-transparent outline-none"></textarea> */}
                </div>
                <div className="flex gap-10 items-center justify-center md:justify-start">
                    <button className="text-lg text-black font-semibold  bg-[#FFCD03] rounded-lg md:py-2 py-1 px-2 md:px-8" onClick={termsSubmit}>Update terms and conditions</button>
                </div>
                {/* <div className="flex md:gap-10  items-center gap-2 justify-center md:justify-start w-full">
                    <button className={`text-md md:text-lg cursor-pointer  ${tab === 'howItWorks' && " bg-[#FFCD03]"} text-black border-2 border-[#FFCD03] font-semibold   rounded-lg md:py-2 py-1 px-3 md:px-8`}
                        onClick={() => setTab('howItWorks')}>
                        How it Works?
                    </button>
                    <button className={`text-md md:text-lg cursor-pointer text-black ${tab === 'termsAndCondition' && " bg-[#FFCD03]"} font-semibold border-2 border-[#FFCD03] rounded-lg md:py-2 py-1 px-2 md:px-8`}
                        onClick={() => setTab('termsAndCondition')}>
                        Terms and Conditions
                    </button>
                </div> */}
                {

                    // <div className='w-full  p-4 text-sm md:text-md rounded-2xl bg-[#FFF8DA] space-y-4'>
                    //     <JoditEditor
                    //         className="editor max-h-screen overflow-auto"
                    //         rows={8}
                    //         value={tab === 'howItWorks' ? content.howItWorks : content.termsAndConditions}
                    //         onChange={newContent => {
                    //             if (tab === 'howItWorks') {
                    //                 setContent({
                    //                     ...content,
                    //                     howItWorks: newContent,
                    //                 });
                    //                 return
                    //             }
                    //             setContent({
                    //                 ...content,
                    //                 termsAndConditions: newContent,
                    //             });
                    //         }}
                    //     />
                    //     {/* <textarea name="" id="" rows="15" className="w-full h-full bg-transparent outline-none"></textarea> */}
                    // </div>
                }
                {/* <div className="flex gap-10 items-center justify-center md:justify-start">
                    <button className="text-lg text-black font-semibold  bg-[#FFCD03] rounded-lg md:py-2 py-1 px-2 md:px-8"
                        onClick={submit}>
                        Update details
                    </button>
                </div> */}
            </div>
        </section>
    )
}

export default ContentManagement