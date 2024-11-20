import React from 'react'
import DropDown from './DropDown'

const UserTopNav = () => {
  return (
    <>
        <div className='border h-full w-full grid grid-cols-[20%,70%,10%]'>
          <div className='flex justify-center items-center border'>Logo</div>
          <div className='flex justify-center items-center border'>option</div>
          <div className='flex justify-center items-center border'><DropDown /></div>
        </div>
    </>

  )
}

export default UserTopNav