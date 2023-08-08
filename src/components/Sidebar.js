import SidebarEventForm from "./SidebarEventForm";

export default function Sidebar({eventData, onCreate, currentEvent, onSetCurrentEvent}) {
  return (
    <aside className="sidebar">
      <center>
        <h1>
          EVENT
          <br />
          PASS
        </h1>
        <SidebarEventForm eventData={eventData} onCreate={onCreate} currentEvent={currentEvent} onSetCurrentEvent={onSetCurrentEvent} />
      </center>
    </aside>
  );
}
