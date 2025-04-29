import React from "react";
import CardLayout from "../CardLayout";
import { IoClose } from "react-icons/io5";

const ModalHeader = ({ setIsModalOpen, title }) => {
  return (
    <CardLayout>
      <div className=" flex justify-between  text-[20px] font-medium leading-[30px] items-center">
        {/* Modal Title */}
        <span>{title}</span>

        {/* close */}
        <button
          className="p-2 rounded-md hover:bg-slate-200"
          onClick={() => setIsModalOpen(false)}>
          <IoClose className="  text-[16px]" />
        </button>
      </div>
    </CardLayout>
  );
};

export default ModalHeader;
