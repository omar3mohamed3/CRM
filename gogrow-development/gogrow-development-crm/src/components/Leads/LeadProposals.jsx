import React, { useEffect } from "react";
import pdf from "/public/pdf.png";
import image from "/public/Rectangle 142.png";
import { FiDownload } from "react-icons/fi";
import CardHeader from "../CardHeader";
import * as Yup from "yup";
import { ErrorMessage, Form, Formik } from "formik";
import { MdCloudUpload } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLeadProposal,
  fetchLeadProposals,
  uploadLeadProposal,
} from "../../Store/leadsSlice/leadProposalsSlice";
import { Link, useParams } from "react-router-dom";
import Loader from "../Layout/Loader";

const LeadProposals = () => {
  const { id: leadId } = useParams();
  const dispatch = useDispatch();
  const { proposals, loading, error, uploadLoading } = useSelector(
    (state) => state.leadProposals
  );

  useEffect(() => {
    dispatch(fetchLeadProposals(leadId));
  }, [dispatch, leadId]);

  const handleDelete = (proposalId) => {
    dispatch(deleteLeadProposal({ leadId, proposalId }));
  };

  const initialValues = {
    proposalIcon: null, // Correct the initial value to null
  };

  const validationSchema = Yup.object({
    proposalIcon: Yup.mixed()
      .required("File is required")
      .test(
        "fileSize",
        "File size should be less than 10MB",
        (value) => value && value.size <= 10 * 1024 * 1024 // 10 MB
      ),
  });

  const onSubmit = (values, { resetForm }) => {
    const file = values.proposalIcon;
    if (file) {
      dispatch(uploadLeadProposal({ leadId, file })).then(() => {
        resetForm(); // Reset the form after successful upload
      });
    }
  };

  const handleDownload = (documentPath, documentName) => {
    // Create an invisible link element
    const link = document.createElement("a");
    link.href = documentPath;
    link.setAttribute("download", documentName);
    link.setAttribute("target", "_blank");

    // Append link to the body (required for Firefox)
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  };

  return (
    <div className=" mt-4     flex flex-col gap-5">
      {/* Propsals */}
      <div className="  h-[175px] overflow-y-auto">
        {loading ? (
          <Loader />
        ) : (
          proposals?.length > 0 && (
            <div className="mb-2">
              <div className="grid grid-cols-1 px-4 gap-4">
                {proposals?.map((proposal) => (
                  <div
                    key={proposal?.id}
                    className="flex items-center bg-[#F5FAFF] border border-[#78C4FF] rounded p-2">
                    <img
                      src={
                        proposal?.document_path?.endsWith(".pdf") === "pdf"
                          ? pdf
                          : image
                      }
                      className="h-8 w-8 mr-2"
                    />
                    <div>
                      <p className="text-xs">{proposal?.document_name}</p>
                      <p className="text-xs text-gray-500">{proposal?.size}</p>
                    </div>
                    <div className=" flex items-center  ml-auto divide-x-2  ">
                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(proposal?.id)}
                        className=" px-1">
                        <FaRegTrashCan className="ml-auto text-[#515151]" />
                      </button>
                      {/* Download */}
                      {/* Download */}
                      <button
                        onClick={() =>
                          handleDownload(
                            proposal?.document_path,
                            proposal?.document_name
                          )
                        }
                        className="px-1">
                        <FiDownload className="ml-auto text-[#515151]" />
                      </button>
                      {/* Preview */}
                      <Link
                        to={proposal?.document_path}
                        target="_blank"
                        // onClick={() => handleShowProposal(proposal.id)}
                        className=" px-1">
                        <MdOutlineRemoveRedEye className="ml-auto text-[#515151]" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
      {/* Upload Proposal */}
      <CardHeader>Upload Proposal</CardHeader>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {({ setFieldValue, values }) => {
          return (
            <Form>
              {/* Module Icon */}
              <div className="mb-1">
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2   rounded-md">
                  <div className="space-y-1 flex flex-col items-center text-center">
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="proposalIcon"
                        className="relative cursor-pointer text-center  bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <MdCloudUpload className="  text-borderGray text-[80px]" />
                        {/* <span>Upload a file</span> */}
                        <input
                          id="proposalIcon"
                          name="proposalIcon"
                          type="file"
                          onChange={(event) => {
                            setFieldValue(
                              "proposalIcon",
                              event.currentTarget.files[0]
                            );
                          }}
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      {values?.proposalIcon?.name ||
                        "PNG, JPG, GIF,PDF up to 10MB"}
                    </p>
                    <ErrorMessage
                      name="proposalIcon"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-2  flex justify-end">
                <button
                  disabled={loading}
                  type="submit"
                  className="  px-12  bg-customBlue text-white p-2  rounded-full shadow hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Save
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default LeadProposals;
