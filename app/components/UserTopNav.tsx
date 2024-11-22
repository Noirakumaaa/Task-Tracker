import React from 'react';
import DropDown from './DropDown';
import UserNavButton from './Buttons/UserNavButton';
import UserLogoLink from './UserLogoLink';



const UserTopNav = () => {

  return (
    <>
      <div className="flex justify-center items-center border">
          <UserLogoLink />
      </div>
      <div className="flex justify-center items-center border">
        <ul className="box w-full h-full flex flex-row justify-center items-center">
        <li className="m-3">
          <UserNavButton name="Home" link=""/>
        </li>
        <li className="m-3">
          <UserNavButton name="Task" link="task"/>
        </li>
        <li className="m-3">
          <UserNavButton name="Calendar" link="calendar"/>
        </li>
        <li className="m-3">
          <UserNavButton name="Scheduler" link="scheduler"/>
        </li>
        <li className="m-3">
          <UserNavButton name="Chatbot" link="chatbot"/>
        </li>
      </ul>
      </div>
      <div className="flex justify-center items-center border">
        <DropDown />
      </div>
    </>
  );
};

export default UserTopNav;
