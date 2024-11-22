'use client'
import React from "react";
import Image from "next/image"; 
import BurgerMenu from "@/public/burger-bar.png";
import { redirect } from "next/navigation";
import Cookies from "js-cookie"; 

const DropDown = () => {

  const Logout = () => {
    Cookies.remove('token', { path: '/' });
    Cookies.remove('role', { path: '/' });
    Cookies.remove('user_id', { path: '/' });
    redirect('/')
  }


  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1 bg-gray-100">
      <Image src={BurgerMenu} alt="Burger Menu" width={30} height={30} />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        <li>
        <button onClick={Logout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default DropDown;
