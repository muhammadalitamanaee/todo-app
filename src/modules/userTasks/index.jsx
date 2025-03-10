import React, { useState } from "react";
import { useGetAllTasksQuery } from "../../services/tasks";
import { useAppSelector } from "../../redux/hooks";
import TaskSection from "../../components/InCompletedTaskSection";
import SwitchableField from "../../components/SwitchableField";
import TaskAdder from "../../components/TaskAdder";
import CompletedTaskSection from "../../components/CompletedTaskSection";
import InCompletedTaskSection from "../../components/InCompletedTaskSection";

const switchList = ["Done", "InProgress"];

export default function UserTasks() {
  const { isFetching, isSuccess } = useGetAllTasksQuery();
  const [switchSection, setSwitchSection] = useState(0);
  const inCompletedTasks = useAppSelector(
    (state) => state.userTasks.inCompletedTasks
  );
  const completedTasks = useAppSelector(
    (state) => state.userTasks.completedTasks
  );

  const handleSwitchBtn = (index) => {
    setSwitchSection(index);
  };
  return (
    <div className="md:min-w-[700px] min-w-[200px] h-full flex justify-center items-center flex-col gap-4">
      <div className="bg-slate-200 rounded-full border-gray-200  border-[1px] md:gap-3 gap-2   h-[56px] outline-none flex flex-row items-center justify-center py-2 px-3 ">
        {switchList.map((item, index) => (
          <SwitchableField
            key={index}
            index={index}
            selectedOption={switchSection}
            onClick={() => handleSwitchBtn(index)}
            title={item}
          />
        ))}
      </div>
      <TaskAdder />
      {!isFetching && isSuccess && inCompletedTasks?.length > 0 ? (
        <div className=" bg-amber-500 flex w-full justify-center rounded-lg items-center min-h-80 h-auto">
          {switchSection === 0 ? (
            <CompletedTaskSection tasks={completedTasks} />
          ) : (
            <InCompletedTaskSection tasks={inCompletedTasks} />
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
