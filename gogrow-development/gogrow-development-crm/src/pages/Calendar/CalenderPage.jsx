import { useDispatch, useSelector } from "react-redux";
import CardLayout from "../../components/CardLayout";
import Hashtag from "../../components/Hashtag";
import CalendarM from "../../components/ModulesControl/Calendar/Calendar";
import { fetchCalendarEvents } from "../../Store/CalendarSlice/calendarSlice";
import { useEffect } from "react";
import { CodeSquare } from "lucide-react";

const CalenderPage = () => {
  const dispatch = useDispatch();

  const { error, loading, events } = useSelector((state) => state.calendar);

  useEffect(() => {
    dispatch(fetchCalendarEvents());
  }, [dispatch]);

  const CalenderList = events.map((event) => ({
    title: event.description.slice(0, 20) + "...",
    start: new Date(event.notify_date),
    end: new Date(event.notify_date),
    color: "green",
    description: event.description,
  }));

  return (
    <div className="">
      <Hashtag># Calendar</Hashtag>
      <CardLayout>
        <CalendarM events={CalenderList} />
      </CardLayout>
    </div>
  );
};

export default CalenderPage;
