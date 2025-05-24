import { useState } from "react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from '../assets/logo.png'; 




type Props = {}

const Navbar = (props: Props) => {

  return (
    <div className="flex items-center justify-between fixed top-0 z-30 w-full ">
      <div className="flex items-center justify-between mx-auto w-5/6">
        <div className="flex items-center justify-between w-full gap-16">
            {/*left side-only logo*/}
          <img alt="logo" src={Logo} className="h-20 w-auto"/>
            {/*right side-from to become a member*/}
          <div className="flex items-center justify-between w-full">
            {/*left of right side*/}
            <div className="flex items-center justify-between gap-8 text-sm">
               <p className="cursor-pointer">Trading</p>
                <p className="cursor-pointer">Team 11</p>
                <p className="cursor-pointer">Read</p>
                <p className="cursor-pointer">Trust & Safety</p>
                <p className="cursor-pointer">Careers</p>
            </div>
            {/*right of right side*/}
            <div className="flex items-center justify-between gap-8">
              <p className="cursor-pointer">Home</p>
              <p className="cursor-pointer">Portfolio</p>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
                Login/Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar