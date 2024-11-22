'use client'
import Link from 'next/link';
import React from 'react';
import { useEffect } from "react";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

const TopNav = () => {
  useEffect(()=>{
    const user_id = Cookies.get("user_id")
    if(user_id){
      redirect(`/v1/${user_id}`)
    }
  },[])
  return (
    <div className='grid grid-cols-[20%,60%,20%] h-[10%]'>
      <div className='flex justify-center items-center border p-3'><Link href="/">Logo</Link></div>
      <div className='flex justify-center items-center border p-3'>
        <div className='flex space-x-8'>
          <Link className='btn btn-outline cursor-pointer hover:text-blue-500 m-3' href="/">Home</Link>
          <Link className='btn btn-outline cursor-pointer hover:text-blue-500 m-3' href="/u/about">About</Link>
          <Link className='btn btn-outline cursor-pointer hover:text-blue-500 m-3' href="/u/contact">Contact</Link>
        </div>
      </div>
      <div className='flex justify-center items-center border p-3'>
        <Link className="btn btn-outline m-3" href="/u/login">Login</Link>
        <Link className="btn btn-outline m-3" href="/u/register">Register</Link>
      </div>
    </div>
  );
}

export default TopNav;
