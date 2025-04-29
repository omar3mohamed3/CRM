import React, { useEffect } from "react";
import { MailX, UserCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchActivityLogs } from "../../Store/leadsSlice/activityLogSlice";
import Loader from "../Layout/Loader";

const LeadActivityLog = () => {
  const dispatch = useDispatch();
  const { id: leadId } = useParams(); // Fetch the leadId from route parameters if applicable
  const { logs, loading, error } = useSelector((state) => state.activityLog);

  useEffect(() => {
    if (leadId) {
      dispatch(fetchActivityLogs({ leadId }));
    }
  }, [dispatch, leadId]);

  const activityLogs = logs?.list?.map((log) => ({
    id: log.id, // useId
    list: log.activities.map((activity) => ({
      type: activity.type,
      date: activity.date,
      user: log.user,
    })),
  }));

  const activities = [
    {
      id: 1, // useId
      list: [
        {
          type: "Updated lead status from New Lead From Campaign to Not Qualified",
          date: "3 Days ago",
          user: "Go Grow",
        },
        {
          type: "Created Lead Initial lead creation",
          date: "3 Days ago",
          user: "Go Grow",
        },
      ],
    },
    {
      id: 2,
      list: [
        {
          type: "Updated lead status from Not Qualified to Qualified",
          date: "2 Days ago",
          user: "Go Grow",
        },
        {
          type: "Scheduled Follow-up Follow-up scheduled with the lead",
          date: "1 Day ago",
          user: "Go Grow",
        },
      ],
    },
    {
      id: 3,
      list: [
        {
          type: "Updated lead status from Not Qualified to Qualified",
          date: "2 Days ago",
          user: "Go Grow",
        },
        {
          type: "Scheduled Follow-up Follow-up scheduled with the lead",
          date: "1 Day ago",
          user: "Go Grow",
        },
        {
          type: "Scheduled Follow-up Follow-up scheduled with the lead",
          date: "1 Day ago",
          user: "Go Grow",
        },
      ],
    },
  ];

  return (
    <div className="p-4">
      <div className="h-[57vh]   flex flex-col gap-4 px-2 overflow-y-auto">
        {loading ? (
          <Loader />
        ) : (
          activityLogs?.map((activityGroup) => (
            <div
              className="border-l-[#22C55E]   relative border-l"
              key={activityGroup.id}>
              <div className="  h-[7px] w-[7px]  bg-[#22C55E] rounded-full absolute -left-1 top-0" />
              <div className="h-[7px] w-[7px]  bg-[#22C55E] rounded-full absolute -left-1 top-[50%]" />
              <div className="h-[7px] w-[7px]  bg-[#22C55E] rounded-full absolute -left-1 top-[100%]" />
              {activityGroup.list.map((activity, idx) => (
                <div
                  key={idx}
                  className="  border-b py-[18px]   ml-5 mb-2">
                  <div className="text-[18px]  text-primary font-bold">
                    {activity.date}
                  </div>
                  <div className=" flex items-center">
                    <div className="mr-4 relative">
                      <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
                        <UserCircle className="w-6 h-6 text-orange-500" />
                      </div>
                      {idx < activityGroup.list.length - 1 && (
                        <div className="absolute top-8 bottom-0 left-1/2 w-0.5 bg-gray-200 -ml-px"></div>
                      )}
                    </div>
                    <p className=" text-[15px] leading-[23px]">
                      {activity.user} - {activity.type}
                    </p>
                    {/* {activity.details && (
                    <p className="text-sm text-gray-600">{activity.details}</p>
                  )} */}
                  </div>
                </div>
              ))}
            </div>
          ))
        )}

        {/* <div className="mt-4">
        <Formik
          initialValues={{ activity: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {() => (
            <Form>
              <div className=" ">
                <Field
                  as="textarea"
                  name="activity"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows="4"
                  placeholder="Enter Activity"
                />
                <ErrorMessage
                  name="activity"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              <div className="  flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div> */}
      </div>
    </div>
  );
};

export default LeadActivityLog;
