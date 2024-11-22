"use client";
import React, { useState } from "react";

const EditButton = () => {
  const [showEdit, setShowedit] = useState(false);
  return (
    <>
      <button className="btn" onClick={() => setShowedit(true)}>
        Edit Task
      </button>
      {showEdit && (
        <div
          role="alert"
          className="fixed bottom-[5%] right-[20%] w-[50%] alert alert-info bg-white flex justify-center items-center"
        >
          <span>Edit Task</span>
          <button className="btn btn-outline btn-error mr-1 w-[20%]">
            DELETE
          </button>
          <button className="btn btn-outline btn-success mr-1 w-[20%]">
            Edit
          </button>
          <button className="btn btn-outline btn-success mr-1 w-[20%]">
            DONE
          </button>
          <button className="btn btn-square"
          onClick={()=>setShowedit(false)}>
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
        </div>
      )}
    </>
  );
};

export default EditButton;
