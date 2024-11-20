import Link from 'next/link';
import React from 'react';

const TopNav = () => {
  return (
    <div className='grid grid-cols-[20%,60%,20%]'>
      <div className='flex justify-center items-center border p-3'><Link href="/">Logo</Link></div>
      <div className='flex justify-center items-center border p-3'>
        <div className='flex space-x-8'>
          <Link className='btn btn-outline cursor-pointer hover:text-blue-500 m-3' href="/">Home</Link>
          <Link className='btn btn-outline cursor-pointer hover:text-blue-500 m-3' href="/about">About</Link>
          <Link className='btn btn-outline cursor-pointer hover:text-blue-500 m-3' href="/contact">Contact</Link>
        </div>
      </div>
      <div className='flex justify-center items-center border p-3'>
        <Link className="btn btn-outline m-3" href="/login">Login</Link>
        <Link className="btn btn-outline m-3" href="/register">Register</Link>
      </div>
    </div>
  );
}

export default TopNav;
