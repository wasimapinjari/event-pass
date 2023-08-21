import Button from "./Button";
import SidebarEventOption from "./SidebarEventOption";
import { useEventPass } from "../contexts/EventPassContext";

export default function SidebarEventForm() {
  const { state, dispatch } = useEventPass();
  function handleSubmit(e) {
    e.preventDefault();
    if (!state.newEventData.eventName || !state.newEventData.eventCapacity)
      return;
    dispatch({
      type: "eventCreate",
      payload: {
        eventId: crypto.randomUUID(),
        eventName: state.newEventData.eventName,
        eventCapacity: state.newEventData.eventCapacity,
      },
    });
    handleReset();
  }

  function handleReset() {
    dispatch({ type: "eventReset" });
  }

  function handleEventCapacity(e) {
    dispatch({ type: "eventCapacityValidate", payload: e.target.value });
  }

  function handleEventName(e) {
    dispatch({ type: "eventNameValidate", payload: e.target.value });
  }

  // console.log(currentEvent);
  return (
    <section>
      <form className="sidebar__form" onSubmit={handleSubmit}>
        <div>
          <label>Select Event</label>
          <select
            value={state.currentEvent?.eventId}
            onChange={(e) => {
              dispatch({ type: "eventSwitch", payload: e.target.value });
            }}
          >
            {state.eventData.map((event) => (
              <SidebarEventOption
                key={event.eventId}
                id={event.eventId}
                eventName={event?.eventName}
              />
            ))}
          </select>
        </div>
        <div>
          <label>Event Name</label>
          <input
            placeholder={`KubeCon ${new Date().getFullYear()}`}
            type="text"
            value={state.newEventData.eventName}
            onChange={handleEventName}
          />
        </div>
        <div>
          <label>Event Capacity</label>
          <input
            type="text"
            placeholder="100"
            value={state.newEventData.eventCapacity}
            onChange={handleEventCapacity}
          />
        </div>
        <div>
          <Button>Create</Button>
          <Button onClick={handleReset}>Reset</Button>
        </div>
      </form>
    </section>
  );
}
