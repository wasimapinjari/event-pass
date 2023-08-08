import EventVisitorForm from "./EventVisitorForm";
import EventInfo from "./EventInfo";
import EventVisitors from "./EventVisitors";

export default function Main({
  eventData,
  currentEvent,
  onDeleteEvent,
  onAddVisitor,
  onEdit,
  onDelete,
  newVisitorData,
  onSetNewVisitorData,
}) {
  return (
    <main className="main">
      <EventVisitorForm
        onAddVisitor={onAddVisitor}
        newVisitorData={newVisitorData}
        onSetNewVisitorData={onSetNewVisitorData}
        currentEvent={currentEvent}
      />
      <EventInfo currentEvent={currentEvent} onDeleteEvent={onDeleteEvent} />
      <EventVisitors
        currentEvent={currentEvent}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </main>
  );
}
