import { useEffect, useState } from "react";
import Main from "./Main";
import Sidebar from "./Sidebar";

export default function App() {
  const initialData = [
    {
      eventId: "0",
      eventName: "Default Event",
      eventCapacity: 10,
      visitors: [
        { visitorId: "1", name: "Male", type: "Attendee", gender: "Male" },
        { visitorId: "2", name: "Female", type: "Speaker", gender: "Female" },
      ],
    },
  ];
  const initialNewVisitorData = {
    id: null,
    name: "",
    type: "Attendee",
    gender: "Male",
  };
  const [eventData, setEventData] = useState(initialData);
  const [currentEvent, setCurrentEvent] = useState(initialData[0]);
  const [newVisitorData, setNewVisitorData] = useState(initialNewVisitorData);

  function onCreate(event) {
    // console.log(event);
    setEventData((eventData) => {
      return [
        ...eventData,
        { ...event, visitors: [] },
      ];
    });   
  }

  function handleSetCurrentEvent(id) {
    // console.log("id:" + id);
    setCurrentEvent(...eventData.filter((event) => event.eventId === id));
  }

  function handleEventDelete() {
    setEventData((eventData) =>
      eventData.filter((event) => event.eventId !== currentEvent.eventId)
    );
  }

  function handleAddVisitor() {
    if (newVisitorData.visitorId) {
      // console.log("data");
      // console.log(newVisitorData);
      setEventData((eventData) =>
        eventData.map((eachEvent) =>
          eachEvent.eventId === currentEvent.eventId
            ? {
                ...eachEvent,
                visitors: eachEvent.visitors.map((visitor) =>
                  visitor.visitorId === newVisitorData.visitorId
                    ? newVisitorData
                    : visitor
                ),
              }
            : eachEvent
        )
      );
      setNewVisitorData(initialNewVisitorData);
      return;
    }
    setEventData((eventData) =>
      eventData.map((eachEvent) =>
        eachEvent.eventId === currentEvent.eventId
          ? {
              ...eachEvent,
              visitors: [
                ...eachEvent.visitors,
                {
                  visitorId: crypto.randomUUID(),
                  name: newVisitorData.name,
                  type: newVisitorData.type,
                  gender: newVisitorData.gender,
                },
              ],
            }
          : eachEvent
      )
    );
    setNewVisitorData(initialNewVisitorData);
    // console.log("fired");
  }

  function handleDelete(visitorId) {
    setEventData((eventData) =>
      eventData.map((eachEvent) =>
        eachEvent.eventId === currentEvent.eventId
          ? {
              ...eachEvent,
              visitors: eachEvent.visitors.filter(
                (visitor) => visitor.visitorId !== visitorId
              ),
            }
          : eachEvent
      )
    );
    setNewVisitorData(initialNewVisitorData);
  }

  function handleEdit(visitorId) {
    const [datax] = currentEvent.visitors.filter(
      (v) => v.visitorId === visitorId
    );
    setNewVisitorData(datax);
  }

  useEffect(() => {
    setCurrentEvent(eventData.length === 0 ? null : eventData[eventData.length - 1]);
  }, [eventData]);


  // console.log("current event data");
  // console.log(eventData);
  // console.log("eventData.length");
  // console.log(eventData.length);

  return (
    <div className="app">
      <Sidebar
        eventData={eventData}
        onCreate={onCreate}
        currentEvent={currentEvent}
        onSetCurrentEvent={handleSetCurrentEvent}
      />
      <Main
        eventData={eventData}
        currentEvent={currentEvent}
        onDeleteEvent={handleEventDelete}
        onAddVisitor={handleAddVisitor}
        onDelete={handleDelete}
        onEdit={handleEdit}
        newVisitorData={newVisitorData}
        onSetNewVisitorData={setNewVisitorData}
      />
    </div>
  );
}
