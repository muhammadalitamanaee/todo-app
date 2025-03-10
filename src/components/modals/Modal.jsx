import { useState } from "react";

import { createPortal } from "react-dom";

function Trigger(Component, buttonProps) {
  const WrappedComponent = (props) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <button onClick={() => setOpen(true)} {...buttonProps} />
        {open && <Component {...props} setOpen={setOpen} />}
      </>
    );
  };
  return WrappedComponent;
}

const Container = ({ children, onClose, modalClass, report }) =>
  createPortal(
    <>
      <div
        onClick={onClose}
        className="fixed z-[999] inset-0 bg-gray-900 bg-opacity-80 backdrop-blur-lg"
      />
      <div
        className={`modal fixed inset-0 m-auto z-[9999]  h-fit overflow-y-auto p-4 text-center sm:items-center sm:p-0 rounded-lg max-md:p-0 w-fit max-md:w-full flex items-center justify-center
          } ${report ? "max-md:h-full max-md:rounded-none" : ""}`}
      >
        <div className={`lg:mx-0 mx-4 ${modalClass}`}>{children}</div>
      </div>
    </>,
    document.body
  );

const Content = ({
  title = "عنوان کارت",
  successDescription = "",
  children,
  modalContainer,
  id,
  modalContent,
  extraHeaderButton,
  closeModal,
  titleClass,
}) => (
  <div
    id={id}
    className={`relative transition overflow-hidden rounded-lg shadow-xl sm:my-8 sm:w-full lg:mx-0 mx-4 sm:max-w-xl duration-300 max-md:mx-0 ${modalContainer}`}
  >
    <div
      className={`px-4 md:p-6 py-4  gap-y-4 md:gap-y-6 flex flex-col bg-white ${modalContent}`}
    >
      <div className="flex flex-col gap-y-4 w-full items-center">
        <div
          className={`w-full font-extrabold text-[22px] pb-3 flex ${
            extraHeaderButton
              ? "flex-row items-center justify-between"
              : "justify-start"
          }  border-b-[1px] border-gray-300`}
        >
          <span className={`md:text-lg text-[16px] font-bold ${titleClass}`}>
            {title}
          </span>
          {extraHeaderButton && (
            <button
              onClick={closeModal}
              className="text-accent-danger text-xs md:text-sm"
            >
              خروج
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-between items-center md:gap-y-12">
        {successDescription?.length > 0 && (
          <div className="bg-accent-successTint border-2 border-accent-success font-semibold py-2 px-2 w-full rounded-lg text-center ">
            <span>{successDescription}</span>
          </div>
        )}
        <div className="flex flex-col w-full items-center gap-y-4 md:gap-y-6">
          {children}
        </div>
      </div>
    </div>
  </div>
);
const Modal = {
  Trigger,
  Container,
  Content,
};
export default Modal;
