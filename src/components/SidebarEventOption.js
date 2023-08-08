export default function Sidebar({eventName, id}) {
  return (
    <option value={id}>
      {eventName}
    </option>
  );
}
