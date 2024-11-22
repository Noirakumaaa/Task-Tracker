import { redirect } from "next/navigation";
import React from "react";

interface Props {
  NotificationName: string;
  NotificationLink: string;
  closeNotification: (value: boolean) => void; 
}

const Notification = ({ NotificationName, NotificationLink, closeNotification }: Props) => {
  const handleLogin = () => {
    if (NotificationLink === "Close") {
      closeNotification(false);
    } else {
      redirect(`/${NotificationLink}`);
    }
  };

  return (
    <div
      role="alert"
      className="fixed bottom-10 left-5 alert alert-success shadow-lg w-[17%] z-50 bg-white"
    >
     {NotificationName === "Loading" ? (
      <span className="loading loading-spinner loading-sm"></span>
     ) :(<svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>)}
      <div>
        <h3 className="font-bold">{NotificationName}</h3>
      </div>
      {NotificationLink !== "Close" && (
        <button
          className="btn btn-outline text-black border-black hover:bg-black hover:text-white"
          onClick={handleLogin}
        >
          {NotificationLink}
        </button>
      )}
    </div>
  );
};

export default Notification;
