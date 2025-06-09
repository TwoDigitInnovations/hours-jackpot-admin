import { useState } from "react";
import Footer from "./Footer";
import LeftPannel from "./LeftPannel";
import Navbar from "./Navbar";
import { useRouter } from "next/router";



const Layout = ({ children, loader, toaster, constant }) => {

    const [openTab, setOpenTab] = useState(false)
    const router = useRouter()

    return (
        <>
            <div>
                <div className="max-w-screen flex bg-[#FFF8DA] min-h-screen relative ">
                    {
                        !(router.pathname.includes('/login') ||
                            router.pathname.includes('/signup') ||
                            router.pathname.includes('/privacy-policy') ||
                            router.pathname.includes('/refund-policy') ||
                            router.pathname.includes('/ship-delivery') ||
                            router.pathname.includes('/order-checkout') ||
                            router.pathname.includes('/terms-condition')) &&
                        <>

                            <LeftPannel setOpenTab={setOpenTab} openTab={openTab} />

                        </>
                    }
                    <div className={`w-full  max-h-screeen overflow-auto ${!(router.pathname.includes('/login') ||
                        router.pathname.includes('/signup') ||
                        router.pathname.includes('/privacy-policy') ||
                        router.pathname.includes('/refund-policy') ||
                        router.pathname.includes('/ship-delivery') ||
                        router.pathname.includes('/order-checkout') ||
                        router.pathname.includes('/terms-condition')) && "xl:pl-[300px] md:pl-[250px] sm:pl-[200px]"}`}>
                        <main className={"w-full max-h-screen overflow-auto  relative bg-[#FFF8DA]  "}>
                            {
                                !(router.pathname.includes('/login') || router.pathname.includes('/signup') ||
                                    router.pathname.includes('/privacy-policy') ||
                                    router.pathname.includes('/refund-policy') ||
                                    router.pathname.includes('/ship-delivery') ||
                                    router.pathname.includes('/order-checkout') ||
                                    router.pathname.includes('/terms-condition')) &&
                                <Navbar setOpenTab={setOpenTab} openTab={openTab} />
                            }
                            {children}
                        </main>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        </>
    );
};

export default Layout;
