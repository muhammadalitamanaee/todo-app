import React, { useState } from "react";
import { useEditTaskMutation } from "../services/tasks";
import DeleteTask from "./actions/DeleteTask";
import DoneTask from "./actions/DoneTask";
import { FormProvider, useForm } from "react-hook-form";
import EditAndSubmit from "./actions/EditAndSubmit";
import TaskInfo from "./actions/TaskInfo";

export default function CompletedTaskSection({ tasks }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [editableField, setEditableField] = useState(null);
  const [editTask, { isError, isSuccess, isLoading }] = useEditTaskMutation();

  const methods = useForm({
    shouldFocusError: true,
    defaultValues: {
      completedTask: tasks,
    },
  });

  const { handleSubmit, register } = methods;
  const EditTaskHandler = async (data) => {
    const changedTask = data.completedTask.find(
      ({ id }) => id === editableField
    );
    console.log(changedTask);

    await editTask({ data: { ...changedTask }, id: editableField })
      .unwrap()
      .finally(() => {
        // gives us err but the payload is currect
        setEditableField(null);
      });
  };

  if (tasks.length === 0) {
    return <p>there is no task here</p>;
  }

  return (
    <FormProvider
      className={"w-full rounded-lg flex flex-col gap-4"}
      {...methods}
    >
      <form
        className="w-full flex flex-col gap-2"
        onSubmit={handleSubmit(EditTaskHandler)}
      >
        {tasks.map(({ id, completed, userId, todo }, index) => (
          <div className="w-full px-2 flex justify-between  text-lg " key={id}>
            <input
              {...register(`completedTask.${index}.todo`, {
                disabled: !(editableField === id),
              })}
              className="min-w-fit relative inline-block cursor-pointer"
            />

            <div className=" flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setOpenDeleteModal(true);
                }}
              >
                Delete
              </button>
              {openDeleteModal && (
                <DeleteTask setOpen={setOpenDeleteModal} id={id} />
              )}
              <button
                onClick={() => {
                  setOpenInfoModal(true);
                }}
                type="button"
              >
                info
              </button>
              {openInfoModal && (
                <TaskInfo
                  setOpen={setOpenInfoModal}
                  task={{ id, completed, userId, todo }}
                />
              )}
              <EditAndSubmit
                editableField={editableField}
                id={id}
                setEditableField={setEditableField}
              />
            </div>
          </div>
        ))}
      </form>
    </FormProvider>
  );
}
