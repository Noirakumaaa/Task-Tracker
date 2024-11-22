import React from "react";
import AddTask from "./Buttons/AddTask";
import EditButton from "./EditButton";

const TaskOption = () => {
  return (
    <>    <details className="collapse collapse-plus bg-base-200">
      <summary className="collapse-title text-xl font-medium">
        Task Option
      </summary>
      <div className="collapse-content">
        <AddTask />
      </div>
      <div className="collapse-content">
      <EditButton />
      </div>
    </details>

    </>

  );
};

export default TaskOption;
