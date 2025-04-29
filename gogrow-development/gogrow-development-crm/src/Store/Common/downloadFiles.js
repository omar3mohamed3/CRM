import axios from "axios";
import { getToken } from "../DashBoard/dashboardSlice";
import toast from "react-hot-toast";

export const handleFileExport = async (apiUrl, fileType) => {
  try {
    const token = getToken(); // Get your authorization token here if needed
    const response = await axios.get(apiUrl, {
      params: { type: fileType ? fileType : null }, // Dynamically pass the file type (e.g., 'excel', 'csv', 'pdf')
      headers: {
        Authorization: `Bearer ${token}`, // If needed
      },
    });

    const downloadUrl = response.data.url; // The file URL returned from the API

    // Dynamically trigger a download for the file
    const link = document.createElement("a");
    link.href = downloadUrl;
    const fileExtension = fileType?.toLowerCase(); // Convert to lowercase for consistent file extensions
    link.setAttribute("download", `exported_file.${fileExtension}`); // You can change the file name dynamically if needed
    link.setAttribute("target", `_blank}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("File exported successfully!");
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
