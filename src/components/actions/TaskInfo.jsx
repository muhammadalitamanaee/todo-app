import React from "react";
import Modal from "../modals/Modal";
import TaskInfoDetail from "../TaskInfoDetail";

export default function TaskInfo({
  task: { id, completed, userId, todo },
  setOpen,
}) {
  console.log(completed);
  console.log(todo);
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
        <div className="w-full min-h-[200px] md:h-full flex justify-center items-center flex-col gap-3 px-0 ">
          <div className="w-full flex flex-col gap-2">
            <TaskInfoDetail label={"id"} content={id} />
            <TaskInfoDetail
              label={"completion status"}
              content={completed ? "Done" : "inProgress"}
            />
            <TaskInfoDetail label={"userId"} content={userId} />
            <TaskInfoDetail label={"title"} content={todo} />
          </div>
        </div>
      </Modal.Content>
    </Modal.Container>
  );
}
