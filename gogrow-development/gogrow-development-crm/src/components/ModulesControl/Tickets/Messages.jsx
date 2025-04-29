import { FiDownload } from "react-icons/fi";
import pdf from "/pdf.png";
import image from "/Rectangle 142.png";
import file from "/file.png";
import { Link } from "react-router-dom";

const Messages = ({ message }) => {
  const {
    sender,
    sender_photo,
    time_ago,
    message: content,
    file_url,
    attachments,
  } = message;

  return (
    <>
      <div className={` flex   items-center   mb-4 `}>
        <div className="w-10 h-10 bg-pink-100  rounded-full flex items-center justify-center mr-3">
          <img
            className=" w-10 h-10 rounded-full"
            src={sender_photo}
            alt={sender?.name}
          />
          <span className="text-sm font-semibold text-pink-500">
            {sender?.initials}
          </span>
        </div>
        <div>
          <p className="font-semibold">{sender?.name}</p>
          <p className="text-xs text-gray-500">{time_ago}</p>
        </div>
      </div>
      <div
        className="mb-4"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {attachments.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            {attachments?.length} Attachments
          </p>
          <div className="grid grid-cols-2 px-4 gap-4">
            {attachments?.map((attachment, index) => (
              <Link
                target="_blank"
                to={attachment.file_url}
                key={index}
                className="flex items-center bg-[#F5FAFF] border border-[#78C4FF] rounded p-2">
                <img
                  src={attachment?.type === "pdf" ? file : file}
                  className="h-8 w-8 mr-2"
                />
                <div>
                  <p className="text-xs">{attachment?.name}</p>
                  <p className="text-xs text-gray-500">{attachment?.size}</p>
                </div>
                <FiDownload className="ml-auto text-[#3182F1]" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Messages;
