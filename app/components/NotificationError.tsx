import { redirect } from "next/navigation";
import React from "react";

interface Props {
  NotificationName: string;
  NotificationLink: string;
  closeNotification: (value: boolean) => void;
}

const NotificationError = ({
  NotificationLink,
  closeNotification,
}: Props) => {
  const handleLogin = () => {
    if (NotificationLink === "Close") {
      closeNotification(false);
    } else {
      redirect(`/${NotificationLink}`);
    }
  };

  return (

      <div role="alert" className="fixed bottom-10 left-5 w-[22%] alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Failed to add the task. Please try again.</span>
        {NotificationLink !== "Close" ? (
        <button
          className="btn btn-outline text-black border-black hover:bg-black hover:text-white"
          onClick={handleLogin}
        >
          {NotificationLink}
        </button>
      ) : (
        <button className="btn btn-square"
        onClick={()=>closeNotification(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
      </div>
     
  );
};

export default NotificationError;
