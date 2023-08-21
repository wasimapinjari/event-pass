import EventVisitorForm from "./EventVisitorForm";
import EventInfo from "./EventInfo";
import EventVisitors from "./EventVisitors";

export default function Main() {
  return (
    <main className="main">
      <EventVisitorForm />
      <EventInfo />
      <EventVisitors />
    </main>
  );
}
