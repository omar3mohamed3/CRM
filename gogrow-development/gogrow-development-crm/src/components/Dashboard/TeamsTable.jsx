import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatNumber } from "../../Url/url";

const TeamsTable = () => {
  const { summary } = useSelector((state) => state.dashboard);

  const navigate = useNavigate();
  const columns = [
    "Team",
    "Team Leader",
    "Team Members",
    "Target",
    "Latest Deal",
    "",
  ];

  const tableData = summary?.newest_teams?.map((team) => ({
    id: team.id,
    team: team.team_name,
    teamLeader: team.leader || "Leader #1",
    teamMembers: team?.team_members || 15,
    target: team.target || 15000,
    latestDeal: team.number_of_deals,
  }));

  const handleNavigateToTeam = (id) => {
    navigate(`/teams/${id}`);
  };

  return (
    <div className="bg-white shadow-card rounded-card p-6 h-full flex flex-col">
      <div className="flex-grow overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              {columns.map((col, index) => (
                <th
                  key={col}
                  className={`${
                    index === 0 ? "text-left" : "text-center"
                  } pb-3 text-[20px] leading-[30px] font-semibold`}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData?.map((row, index) => (
              <tr
                key={index}
                onClick={() => handleNavigateToTeam(row.id)}
                className="border-b cursor-pointer last:border-b-0">
                <td className="py-5">{row.team}</td>
                <td className="py-5 text-center">{row.teamLeader}</td>
                <td className="py-5 text-center">{row.teamMembers}</td>
                <td className="py-5 text-center">{formatNumber(row.target)}</td>
                <td className="py-5 text-center">{row.latestDeal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link
        to={"/teams"}
        className="mt-4 hover:text-blue-500 text-blue-600 self-start">
        See More
      </Link>
    </div>

    // <Table columns={columns}>
    //   {tableData.map((row, index) => (
    //     <tr
    //       key={index}
    //       onClick={() => handleNavigateToTeam(row.id)}
    //       className="border-b cursor-pointer last:border-b-0">
    //       <td className="py-5">{row.team}</td>
    //       <td className="py-5 text-center">{row.teamLeader}</td>
    //       <td className="py-5  text-center">{row.teamMembers}</td>
    //       <td className="py-5  text-center">{row.target}</td>
    //       <td className="py-5  text-center">{row.latestDeal}</td>
    //       {/* <td className="py-5 text-right">
    //         <button className="text-gray-400 hover:text-gray-600">
    //           <GoKebabHorizontal
    //             className=" text-[16px] rotate-90"
    //             size={16}
    //           />
    //         </button>
    //       </td> */}
    //     </tr>
    //   ))}
    //   <Link
    //     to={"/teams"}
    //     className="  mt-auto hover:text-blue-500 text-blue-600">
    //     See More
    //   </Link>
    // </Table>
  );
};

export default TeamsTable;
