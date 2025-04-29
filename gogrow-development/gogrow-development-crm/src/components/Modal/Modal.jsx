import { Form, Formik } from "formik";
import React, { useEffect, useRef } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  return (
    isOpen && (
      <div className="fixed overflow-y-auto  inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div
          className="  absolute top-[1%]     w-full max-w-[940px]"
          // className="bg-white rounded-lg absolute top-[20%] shadow-lg p-6 w-full max-w-[940px]"
          ref={modalRef}>
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
