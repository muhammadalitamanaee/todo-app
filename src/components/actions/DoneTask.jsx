import React from "react";
import { useEditTaskMutation } from "../../services/tasks";

export default function DoneTask({ id }) {
  const [editTodo, { isLoading, isSuccess }] = useEditTaskMutation();

  const taskDoneHandler = async (id) => {
    await editTodo({
      id: id,
      data: {
        completed: true,
      },
    }).unwrap();
  };
  return (
    <div className="flex justify-between items-center gap-2">
      <button
        disabled={isLoading}
        className="disabled:bg-gray-700"
        onClick={() => {
          taskDoneHandler(id);
        }}
      >
        Done
      </button>
    </div>
  );
}
