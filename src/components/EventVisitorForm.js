import Button from "./Button";

export default function EventVisitorForm({
  onAddVisitor,
  newVisitorData,
  onSetNewVisitorData,
  currentEvent,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    if (!newVisitorData.name) return;
    onAddVisitor();
  }
  const disableChecker =
    !newVisitorData?.visitorId &&
    currentEvent?.eventCapacity === currentEvent?.visitors.length;

  return (
    <form className="main__form" onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        {disableChecker ? (
          <input
            type="text"
            disabled
            value={newVisitorData.name}
            onChange={(e) => {
              const value = e.target.value;
              onSetNewVisitorData((p) => {
                return {
                  ...p,
                  name: value.length < 50 ? value : newVisitorData.name,
                };
              });
            }}
          />
        ) : (
          <input
            type="text"
            value={newVisitorData.name}
            onChange={(e) => {
              const value = e.target.value;
              onSetNewVisitorData((p) => {
                return {
                  ...p,
                  name: value.length < 50 ? value : newVisitorData.name,
                };
              });
            }}
          />
        )}
      </div>
      <div>
        <label>Type</label>
        <select
          value={newVisitorData.type}
          onChange={(e) => {
            const value = e.target.value;
            onSetNewVisitorData((p) => {
              return { ...p, type: value };
            });
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
          value={newVisitorData.gender}
          onChange={(e) => {
            const value = e.target.value;
            onSetNewVisitorData((p) => {
              return { ...p, gender: value };
            });
          }}
        >
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>
      <div>
      <Button>{newVisitorData.visitorId ? "Change" : "Add"}</Button>
      </div>
    </form>
  );
}
