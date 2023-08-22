import { useEventPass } from "../contexts/EventPassContext";
import Button from "./Button";

export default function EventInfo() {
  const { state, dispatch } = useEventPass();
  return (
    <section className="event-info">
      {state.currentEvent ? (
        <>
          <div className="event-content">
            <p>{state.currentEvent.eventName}</p>
            <p>|</p>
            <p>
              Remaining Seats:{" "}
              {state.currentEvent.visitors.length === state.currentEvent.eventCapacity ? (
                <span style={{ color: "#c51605bb" }}>Full</span>
              ) : (
                <span style={{ color: "#5b9a8bbb" }}>
                  {state.currentEvent.visitors.length}/{state.currentEvent.eventCapacity}
                </span>
              )}
            </p>
          </div>
          <div>
            <Button onClick={() => dispatch({ type: "eventDelete" })}>Delete</Button>
          </div>
        </>
      ) : (
        <p>Create an event to get started!</p>
      )}
    </section>
  );
}
