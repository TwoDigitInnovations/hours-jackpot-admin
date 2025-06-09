import { Api } from "@/utils/service";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { userContext } from "./_app";
import { validateMobileNumber } from "@/utils/validator";
import { contryCode } from "@/utils/contryCode";

const Login = (props) => {
  const [data, setData] = useState({
    phone: "",
    password: "",
    dial_code: "+91",
  });
  const [user, setUser] = useContext(userContext);

  const router = useRouter();

  const submit = async () => {
    console.log(data);
    if (data.phone && data.password) {
      if (!validateMobileNumber(data.phone, props.toaster)) {
        return;
      }
      props.loader(true);
      Api("post", "/api/auth/signin", { ...data }, router).then(
        (res) => {
          props.loader(false);
          console.log("res================>", res);
          localStorage.setItem("PBuser", JSON.stringify(res.data));
          setUser(res.data);
          localStorage.setItem("token", res.data.token);
          props.toaster({ type: "success", message: "Login Successful" });
          router.push("/donation-management");
        },
        (err) => {
          props.loader(false);
          console.log(err);
          props.toaster({ type: "error", message: err?.message });
        }
      );
    } else {
      props.toaster({ type: "error", message: "Missing credentials" });
    }
  };

  return (
    <section className=" max-h-screen h-screen relative ">
      <div className="h-full w-full flex flex-col items-center justify-center ">
        {/* <div className=" flex flex-col items-center text-center">
          <div>
            <img src="/logo1.jpeg" alt="" className="w-14 h-14 object-contain" />
          </div>
          <p>Powered by Twinhatch Private Limited</p>
        </div> */}
        <div className="xl:w-[600px] md:w-[500px] w-[95%] bg-white h-auto p-4 md:p-10 shadow-xl rounded-3xl flex flex-col gap-4 items-center justify-center">
          <div className="md:w-16 w-10">
            <img src="/logo.png" alt="" className="w-full object-cover" />
          </div>
          <div className=" space-y-2 text-center ">
            <h2 className="text-3xl font-semibold">Welcome back!</h2>
            <p className="text-md md:text-xl font-semibold">Enter your Credentials to access your account</p>
          </div>
          <div>
            <div>
              <p>Contry Dial Code</p>
              <select className="w-[300px] mt-1 md:w-[400px] outline-none h-full p-2 border-2 border-blak rounded-xl"
                value={data.dial_code}
                onChange={(e) => {
                  setData({ ...data, dial_code: e.target.value });
                }}
              >
                {contryCode?.map((item, i) => (
                  <option key={i} value={item.dial_code}>
                    {item.dial_code} {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <div>
              <p>Phone Number</p>
              <input type="number" className="w-[300px] mt-1 md:w-[400px] outline-none h-full p-2 border-2 border-blak rounded-xl" placeholder="Number"
                value={data.phone}
                onChange={(e) => {
                  if (e.target.value.length <= 10) {
                    setData({ ...data, phone: e.target.value });
                  }
                }}
              />
            </div>
          </div>
          <div>
            <div>
              <p>Password</p>
              <input type="password" className="w-[300px] mt-1 md:w-[400px] outline-none h-full p-2 border-2 border-blak rounded-xl" placeholder="Password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })} />
            </div>
          </div>
          <div className=" flex flex-col items-center justify-center space-y-2">
            <button className="text-lg text-black font-semibold  bg-[#FFCD03] rounded-lg md:py-2 py-1 px-4 md:px-8" onClick={submit}>Login</button>
          </div>
          <div className="text-sm md:text-md flex gap-4 items-center flex-col grid-cols-2">
            <div>
              <Link href={"/privacy-policy"} className="text-blue-600 cursor-pointer">Privacy policy</Link>
              <Link href={"/terms-conditions"} className="text-blue-600 cursor-pointer ml-5">Terms and conditions</Link>
            </div>
            <div>
              <Link href={"/refund-policy"} className="text-blue-600 cursor-pointer">Refund policy</Link>
              <Link href={"/ship-delivery"} className="text-blue-600 cursor-pointer ml-5">Ship and Delivery</Link>
              <Link href={"order-checkout"} className="text-blue-600 cursor-pointer ml-5">Order and Checkout</Link>
            </div>
          </div>
          {/* <div className="w-full flex flex-col justify-center items-center">
            <p className="text-md md:text-xl font-semibold">Contact Us</p>
            <p><span className="text-base font-semibold">Email : </span><a className="text-blue-600 cursor-pointer text-base font-normal" href="mailto:sk@twinhatch.com">sk@twinhatch.com</a></p>
            <p><span className="text-base font-semibold">Phone : </span><a className="text-blue-600 cursor-pointer text-base font-normal" href="tel:+918779824236">+918779824236</a></p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Login;
