import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";

const initialData = [
  {
    eventId: crypto.randomUUID(),
    eventName: "Default Event",
    eventCapacity: 10,
    visitors: [
      {
        visitorId: crypto.randomUUID(),
        name: "Male",
        type: "Attendee",
        gender: "Male",
      },
      {
        visitorId: crypto.randomUUID(),
        name: "Female",
        type: "Speaker",
        gender: "Female",
      },
    ],
  },
];

const initialNewVisitorData = {
  id: null,
  name: "",
  type: "Attendee",
  gender: "Male",
};

const initialNewEventData = {
  eventName: "",
  eventCapacity: "",
};

const initialState = {
  eventData: initialData,
  currentEvent: initialData[0],
  newVisitorData: initialNewVisitorData,
  newEventData: initialNewEventData,
};

function initialStateResolver(initialState) {
  return JSON.parse(localStorage.getItem("state")) || initialState;
};

const EventPassContext = createContext();

function EventPassProvider({ children }) {
  function reducer(state, action) {
    switch (action.type) {
      case "eventNameValidate":
        return {
          ...state,
          newEventData: {
            ...state.newEventData,
            eventName:
              action.payload.length < 51
                ? action.payload
                : state.newEventData.eventName,
          },
        };

      case "eventCapacityValidate":
        if (action.payload <= 0) {
          return {
            ...state,
            newEventData: { ...state.newEventData, eventCapacity: "" },
          };
        }
        return {
          ...state,
          newEventData: {
            ...state.newEventData,
            eventCapacity:
              action.payload >= 0 ||
              !isNaN(action.payload) ||
              action.payload < 50000
                ? +action.payload
                : state.newEventData.eventCapacity,
          },
        };

      case "eventCreate":
        return {
          ...state,
          eventData: [...state.eventData, { ...action.payload, visitors: [] }],
        };

      case "eventDelete":
        return {
          ...state,
          eventData: state.eventData.filter(
            (event) => event.eventId !== state.currentEvent.eventId
          ),
        };

      case "eventSwitch":
        return {
          ...state,
          currentEvent: state.eventData.filter(
            (event) => event.eventId === action.payload
          )[0],
        };

      case "eventSwitchToLast":
        return {
          ...state,
          currentEvent: state.eventData[state.eventData.length - 1],
        };

      case "eventReset":
        return {
          ...state,
          newEventData: initialNewEventData,
        };

      case "eventDataRefresh":
        return {
          ...state,
          currentEvent: state.eventData?.filter(
            (event) => event?.eventId === state.currentEvent?.eventId
          )[0],
        };

      case "eventEmpty":
        return {
          ...state,
          currentEvent: null,
        };

      case "visitorSetText":
        return {
          ...state,
          newVisitorData: {
            ...state.newVisitorData,
            name:
              action.payload.length < 50
                ? action.payload
                : state.newVisitorData.name,
          },
        };

      case "visitorSetType":
        return {
          ...state,
          newVisitorData: { ...state.newVisitorData, type: action.payload },
        };

      case "visitorSetGender":
        return {
          ...state,
          newVisitorData: { ...state.newVisitorData, gender: action.payload },
        };

      case "visitorAdd":
        if (state.newVisitorData.visitorId) {
          return {
            ...state,
            newVisitorData: initialNewVisitorData,
            eventData: state.eventData.map((eachEvent) =>
              eachEvent.eventId === state.currentEvent.eventId
                ? {
                    ...eachEvent,
                    visitors: eachEvent.visitors.map((visitor) =>
                      visitor.visitorId === state.newVisitorData.visitorId
                        ? state.newVisitorData
                        : visitor
                    ),
                  }
                : eachEvent
            ),
          };
        }
        return {
          ...state,
          newVisitorData: initialNewVisitorData,
          eventData: state.eventData.map((eachEvent) =>
            eachEvent.eventId === state.currentEvent.eventId
              ? {
                  ...eachEvent,
                  visitors: [
                    ...eachEvent.visitors,
                    {
                      visitorId: crypto.randomUUID(),
                      name: state.newVisitorData.name,
                      type: state.newVisitorData.type,
                      gender: state.newVisitorData.gender,
                    },
                  ],
                }
              : eachEvent
          ),
        };

      case "visitorDelete":
        return {
          ...state,
          newVisitorData: initialNewVisitorData,
          eventData: state.eventData.map((eachEvent) =>
            eachEvent.eventId === state.currentEvent.eventId
              ? {
                  ...eachEvent,
                  visitors: eachEvent.visitors.filter(
                    (visitor) => visitor.visitorId !== action.payload
                  ),
                }
              : eachEvent
          ),
        };

      case "visitorSetEdit":
        return {
          ...state,
          newVisitorData: state.currentEvent.visitors.filter(
            (v) => v.visitorId === action.payload
          )[0],
        };

      default:
        throw new Error("Unknown action type: " + action.type);
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState, initialStateResolver);

  const eventArrayLength = useRef(state.eventData.length);

  useEffect(() => {
    if (eventArrayLength.current !== state.eventData.length) {
      eventArrayLength.current = state.eventData.length;
      if (state.eventData.length === 0) {
        return dispatch({ type: "eventEmpty" });
      }
      return dispatch({
        type: "eventSwitchToLast",
      });
    }
    dispatch({ type: "eventDataRefresh" });
  }, [state.eventData]);

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  return (
    <EventPassContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </EventPassContext.Provider>
  );
}

function useEventPass() {
  const value = useContext(EventPassContext);
  return value;
}

export { EventPassProvider, useEventPass };
