import Layout from "@/components/Layout";
import Loader from "@/components/loader";
import Toaster from "@/components/toaster";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
// require("../server");

export const userContext = createContext();

export default function App({ Component, pageProps }) {

  const router = useRouter()
  const [user, setUser] = useState();
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState({
    type: "",
    message: "",
  });

  const setUserToken = () => {
    let data = JSON.parse(localStorage.getItem("PBuser")) || {};
    setUser(data);
    if (!data.token) {
      if (!(router.pathname.includes('refund-policy') ||
        router.pathname.includes('terms-conditions') ||
        router.pathname.includes('privacy-policy') ||
        router.pathname.includes('ship-delivery') ||
        router.pathname.includes('order-checkout'))) {
        router.push('/login')
      }
    }
    };
    useEffect(() => {
      setUserToken();
    }, [])

    useEffect(() => {
      setOpen(open);
    }, [open]);


    useEffect(() => {
      setToast(toast);
      if (!!toast.message) {
        setTimeout(() => {
          setToast({ type: "", message: "" });
        }, 5000);
      }
    }, [toast]);

    return (
      <>
        <userContext.Provider value={[user, setUser]}>
          <Layout>
            <Loader open={open} />
            <div className="fixed right-5 top-20 min-w-max z-50">
              {!!toast.message && (
                <Toaster type={toast.type} message={toast.message} />
              )}
            </div>
            <Component {...pageProps} loader={setOpen} toaster={setToast} />
          </Layout>
        </userContext.Provider>
      </>
    );
  }
