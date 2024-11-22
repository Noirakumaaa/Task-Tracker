import React, { useState } from "react";
import Cookies from "js-cookie";
import Notification from "../Notification";
import NotificationError from "../NotificationError";

const AddTask = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [taskError, setTaskError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialForm] = useState({
    user_id: Cookies.get("user_id"),
    name: "",
    description: "",
    status: "PENDING",
    start_date: "",
    deadline: "",
  })
  const [formData, setFormData] = useState(initialForm);

  const openModal = () => {
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    modal.showModal();
  };

  const CloseModal = () => {
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    modal.close();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.table(formData);
    setShowNotification(true);

    const startDate = new Date(formData.start_date).toISOString();
    const deadline = new Date(formData.deadline).toISOString();

    const dataToSend = {
      ...formData,
      start_date: startDate,
      deadline: deadline,
    };

    const res = await fetch("http://localhost:3000/api/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    if (res.ok) {
      CloseModal();
      setLoading(false);
    } else {
      CloseModal();
      setShowNotification(false);
      setTaskError(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const today = new Date().toISOString().split('T')[0]; // Today's date for min input

  return (
    <div>
      <button className="btn" onClick={openModal}>
        Add Task
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center m-5">Add New Task</h3>
          <form onSubmit={handleSubmit}>
            <div className="py-2">
              <label htmlFor="name" className="block mb-3">Task Name</label>
              <input
                type="text"
                id="name"
                className="input input-bordered w-full"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="py-2">
              <label htmlFor="description" className="block mb-3">Description</label>
              <textarea
                id="description"
                className="input input-bordered w-full"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="py-2">
              <label htmlFor="start_date" className="block mb-3">Start Date</label>
              <input
                type="date"
                id="start_date"
                className="input input-bordered w-full"
                value={formData.start_date}
                onChange={handleChange}
                required
                min={today}
              />
            </div>
            <div className="py-2">
              <label htmlFor="deadline" className="block mb-3">Deadline</label>
              <input
                type="date"
                id="deadline"
                className="input input-bordered w-full"
                value={formData.deadline}
                onChange={handleChange}
                required
                min={today}
              />
            </div>
            <div className="modal-action">
              <button type="submit" className="btn">Save Task</button>
              <button
                type="button"
                className="btn"
                onClick={CloseModal}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
      {showNotification && (loading ? (
        <Notification 
        NotificationName="Loading" 
        NotificationLink="Close" 
        closeNotification={(e) => setShowNotification(e)} 
      />
      ): (
        <Notification 
          NotificationName="Task Added Successfully" 
          NotificationLink="Close" 
          closeNotification={(e) => setShowNotification(e)} 
        />
      ))}

      {taskError && (
        <NotificationError 
          NotificationName="Error" 
          NotificationLink="Close" 
          closeNotification={(e) => setTaskError(e)} 
        />
      )}
    </div>
  );
};

export default AddTask;
