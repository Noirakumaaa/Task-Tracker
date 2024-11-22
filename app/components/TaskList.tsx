"use client";
import React, { useEffect, useState } from "react";

interface taskForm {
  id: string;
  name: string;
  description: string;
  status: string;
  deadline: Date;
  start_date: Date;
}

const TaskComponent = () => {
  const [taskItems, setTaskItems] = useState<taskForm[]>([]);
  const [selectedItems, setSelectedItems] = useState<taskForm[]>([]);
  const [showEdit, setShowedit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/task", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data, "get data ");
        setTaskItems(data.TaskList);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (task: taskForm, checked: boolean) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, task]);
    } else {
      setSelectedItems((prev) => prev.filter((item) => item.id !== task.id));
    }
  };

  return (
    <div className="overflow-x-auto w-[80%] h-full p-10 ">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Task</th>
            <th>Description</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {taskItems.length > 0 ? (
            taskItems.map((element, index) => (
              <tr key={index}>
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      onChange={(e) =>
                        handleCheckboxChange(element, e.target.checked)
                      }
                    />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{element.name || "Task Name"}</div>
                    </div>
                  </div>
                </td>
                <td>{element.description || "Description"}</td>
                <td>
                  {element.deadline
                    ? new Date(element.deadline).toLocaleDateString()
                    : "Deadline"}
                </td>
                <td>{element.status || "Description"}</td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4">
                No data found
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Task</th>
            <th>Description</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </tfoot>
      </table>
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
    </div>
  );
};

export default TaskComponent;
