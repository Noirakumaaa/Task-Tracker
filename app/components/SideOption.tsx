"use client";
import React from "react";
import TaskOption from "./TaskOption";

const SideOption = () => {


  return (
    <div className="border w-[20%] h-[100%] flex justify-center items-center">
      <ul>
        <li><TaskOption /></li>
        <li>Add Schedule</li>
        <li>Edit Chatbot</li>
      </ul>
    </div>
  );
};

export default SideOption;
