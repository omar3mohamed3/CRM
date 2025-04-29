import { Link } from "react-router-dom";
import CardLayout from "../../components/CardLayout";
import Hashtag from "../../components/Hashtag";
import ImportForm from "../../components/Leads/ImportLead/ImportForm";
import toast from "react-hot-toast";

const ImportLeads = () => {
  return (
    <div>
      <Hashtag># Roles Import Leads</Hashtag>
      <CardLayout>
        <ol className=" text-[16px]   leading-[23px]">
          <li>
            1. Your CSV data should be in the format below. The first line of
            your CSV file should be the column headers as in the table example.
            Also make sure that your file is UTF-8 to avoid unnecessary encoding
            problems.{" "}
          </li>
          <li>
            2. If the column you are trying to import is date make sure that is
            formatted in format Y-m-d (2024-08-28).
          </li>
          <li>
            3. Based on your leads unique validation configured options, the
            lead won't be imported if:
          </li>
        </ol>
        <div>
          <p className=" pl-7 py-3 ">- Lead email already exists</p>
          <p>
            If you still want to import all leads, uncheck all unique validation
            field
          </p>
        </div>
      </CardLayout>
      <div className=" flex justify-between items-center py-6">
        <Hashtag># Import Leads</Hashtag>
        <Link
          target="_blank"
          to="/sample_leads.xlsx"
          download="sample_leads.xlsx" // Triggers download with the given filename
          className=" px-2 py-px bg-[#22C55E] rounded-[2px] text-[15px] text-white">
          Download Sample
        </Link>
      </div>
      <CardLayout>
        <ImportForm />
      </CardLayout>
    </div>
  );
};

export default ImportLeads;
