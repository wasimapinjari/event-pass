import Button from "./Button";
import { useEventPass } from "../contexts/EventPassContext";

export default function EventVisitorForm() {
  const { state, dispatch } = useEventPass();
  function handleSubmit(e) {
    e.preventDefault();
    if (!state.newVisitorData.name) return;
    dispatch({ type: "visitorAdd" });
  }
  const disableChecker =
    !state.newVisitorData?.visitorId &&
    state.currentEvent?.eventCapacity === state.currentEvent?.visitors.length;

  return (
    <form className="main__form" onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          placeholder="John Doe"
          disabled={disableChecker}
          value={state.newVisitorData.name}
          onChange={(e) => {
            dispatch({ type: "visitorSetText", payload: e.target.value });
          }}
        />
      </div>
      <div>
        <label>Type</label>
        <select
          value={state.newVisitorData.type}
          onChange={(e) => {
            dispatch({ type: "visitorSetType", payload: e.target.value });
          }}
        >
          <option>Attendee</option>
          <option>Speaker</option>
          <option>Organiser</option>
        </select>
      </div>
      <div>
        <label>Gender</label>
        <select
          value={state.newVisitorData.gender}
          onChange={(e) => {
            dispatch({ type: "visitorSetGender", payload: e.target.value });
          }}
        >
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>
      <div>
        <Button>{state.newVisitorData.visitorId ? "Change" : "Add"}</Button>
      </div>
    </form>
  );
}
