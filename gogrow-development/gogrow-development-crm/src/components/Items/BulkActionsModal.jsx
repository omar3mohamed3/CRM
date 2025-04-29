import { useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import SingleSelectFilterDropdown from "../../pages/Leads/SingleSelectFilterDropdown";
import { leadsStatus, teamsList } from "../../pages/Leads/FakeLists";
import { IoClose } from "react-icons/io5";

const BulkActionModal = ({
  deleteBulk = () => {},
  isOpen,
  onClose,
  withAssign = true,
}) => {
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div
          className="bg-white rounded-lg absolute top-[20%] shadow-lg p-6 w-full max-w-md"
          ref={modalRef}>
          <div className=" flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold mb-4">Bulk Actions</h2>
              <button
                type="submit"
                onClick={() => {
                  deleteBulk();
                  onClose();
                }}
                className="px-2 py-1 text-[16px] mb-2 bg-red-600 text-white rounded-md">
                Mass Delete
              </button>
            </div>
            {!withAssign && (
              <button
                className="   px-2 py-2 rounded-md hover:bg-slate-200"
                onClick={onClose}>
                <IoClose />
              </button>
            )}
          </div>
          {withAssign && (
            <Formik
              initialValues={{ status: "", assigned: "" }}
              onSubmit={(values) => {
                console.log("Bulk action values:", values);
                // Handle bulk action logic here
              }}>
              {({ setFieldValue }) => (
                <Form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Assigned
                    </label>
                    <SingleSelectFilterDropdown
                      filters={teamsList}
                      setFieldValue={(value) =>
                        setFieldValue("assigned", value)
                      }
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={onClose}
                      className="mr-2 px-4 py-2 bg-gray-200 rounded-md">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="mr-2 px-4 py-2 bg-gray-200 rounded-md">
                      Save
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    )
  );
};

export default BulkActionModal;
