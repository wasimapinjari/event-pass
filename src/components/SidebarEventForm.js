import { useState } from "react";
import Button from "./Button";
import SidebarEventOption from "./SidebarEventOption";

export default function SidebarEventForm({ eventData, onCreate, currentEvent, onSetCurrentEvent }) {
  const [eventName, setEventName] = useState("");
  const [eventCapacity, setEventCapacity] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if(!eventName || !eventCapacity) return;
    onCreate({eventId: crypto.randomUUID(), eventName, eventCapacity});
    handleReset();
  }

  function handleReset() {
    setEventName("");
    setEventCapacity("");
  }

  function handleEventCapacity(e) {
    if(e.target.value <= 0) {
      setEventCapacity("");
      return;
    }
    setEventCapacity(e.target.value);
    setEventCapacity(e.target.value >= 0 || !isNaN(e.target.value) || e.target.value < 50000  ? +e.target.value :  eventCapacity)
  }

  // console.log(currentEvent);
  return (
    <section>
      <form className="sidebar__form" onSubmit={handleSubmit}>
        <div>
          <label>Select Event</label>
          <select value={currentEvent?.eventId} onChange={(e) => {
            onSetCurrentEvent(e.target.value)
          }}>
            {eventData.map((event) => (
              <SidebarEventOption
                key={event.eventId}
                id={event.eventId}
                eventName={event?.eventName}
                onSetCurrentEvent={onSetCurrentEvent}
              />
            ))}
          </select>
        </div>
        <div>
          <label>Event Name</label>
          <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value.length < 51 ? e.target.value : eventName )} />
        </div>
        <div>
          <label>Event Capacity</label>
          <input type="text" value={eventCapacity} onChange={handleEventCapacity} />
        </div>
        <div>
          <Button>Create</Button>
          <Button onClick={handleReset}>Reset</Button>
        </div>
      </form>
    </section>
  );
}
