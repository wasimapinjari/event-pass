import Button from "./Button";

export default function EventInfo({ currentEvent, onDeleteEvent }) {
  // console.log(currentEvent);
  return (
    <section className="event-info">
      {currentEvent ? (
        <>
          <div className="event-content">
            <p>{currentEvent.eventName}</p>
            <p>|</p>
            <p>
              Remaining Seats: {currentEvent.visitors.length === currentEvent.eventCapacity ? <span style={{color: "#c51605bb"}}>Full</span> : <span style={{color: "#5b9a8bbb"}}>{currentEvent.visitors.length}/{currentEvent.eventCapacity}</span>}
            </p>
          </div>
          <div>
            <Button onClick={onDeleteEvent}>Delete</Button>
          </div>
        </>
      ) : (
        <p>Create an event to get started!</p>
      )}
    </section>
  );
}
