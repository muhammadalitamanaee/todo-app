import React from "react";
import { useDeleteTaskMutation } from "../../services/tasks";
import Modal from "../modals/Modal";

function DeleteTask({ setOpen, id }) {
  const [deleteTask, { isLoading, isSuccess }] = useDeleteTaskMutation();

  const taskDeleter = async (id) => {
    await deleteTask(id).unwrap();
  };

  return (
    <Modal.Container
      onClose={() => {
        setOpen(false);
      }}
      modalClass="w-full md:w-[400px] lg:w-[600px]  h-[300px] md:h-[5000px] md:flex md:justify-center md:items-center "
    >
      <Modal.Content
        closeModal={() => {
          setOpen(false);
        }}
        extraHeaderButton
        title="delte task"
        modalContainer="w-full !max-w-4xl"
        modalContent="w-full "
      >
        <div className="min-h-[200px] md:h-full flex justify-center items-center flex-col gap-8 px-0 ">
          <h2 className="text-2xl text-gray-500">
            are you sure to delete the task
          </h2>
          <div className="w-full flex gap-2 justify-center items-center">
            <button
              onClick={() => {
                taskDeleter(id);
              }}
            >
              delte task
            </button>
            <button
              onClick={() => {
                setOpen(false);
              }}
            >
              cancel
            </button>
          </div>
        </div>
      </Modal.Content>
    </Modal.Container>
  );
}

export default DeleteTask;
