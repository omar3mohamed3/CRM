const ModalFooter = ({ onClose }) => {
  return (
    <div className=" pt-3 flex gap-4 justify-end items-center">
      <button
        type="submit"
        className=" w-[80px] py-1  rounded text-white bg-[#2563EB] text-[15px] leading-[23px]">
        Save
      </button>
      <button
        onClick={onClose}
        type="button"
        className=" w-[80px] py-1  rounded  text-primary border border-borderGray text-[15px] leading-[23px]">
        Close
      </button>
    </div>
  );
};

export default ModalFooter;
