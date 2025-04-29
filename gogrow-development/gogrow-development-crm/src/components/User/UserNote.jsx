import React, { useEffect, useRef, useState } from "react";
import { FaArrowsRotate } from "react-icons/fa6";
import { TfiSearch } from "react-icons/tfi";
import ReactToPrint from "react-to-print";
import UserNoteTable from "./UserNoteTable";
import UserBulkAction from "./UserBulkAction";
import UserAddNote from "./UserAddNote";
import { useParams } from "react-router-dom";

const UserNote = () => {
  const { id } = useParams();
  const [note, setNote] = useState(false);
  const componentRef = useRef(null);

  const AddNote = () => {
    setNote((show) => !show);
  };

  return (
    <div className=" h-full">
      <span className="   text-[16px] font-bold leading-[23px]">Note</span>
      <div
        style={{ height: "calc(100% - 25px)" }}
        className="   overflow-y-auto   shadow-card rounded-card bg-white text-[9px]  py-4">
        <div className="border-b px-4 pb-2">
          <button
            onClick={AddNote}
            disabled={!id}
            className=" px-2 py-px text-[12px] leading-[18px]  rounded-[2px] font-medium text-white bg-[#3BA6EB]">
            {note ? "Close" : "New Note"}
          </button>
        </div>
        {note ? (
          // Add Note
          <UserAddNote onClose={() => setNote((show) => !show)} />
        ) : (
          <>
            {/* Bulk  Bar */}
            {/* <UserBulkAction componentRef={componentRef} /> */}

            {/* Table */}

            <UserNoteTable componentRef={componentRef} />
          </>
        )}
      </div>
    </div>
  );
};

export default UserNote;
