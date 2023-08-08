import Visitor from "./Visitor";

export default function EventVisitors({ onEdit, onDelete, currentEvent }) {
  return (
    <section className="main-content">
      {currentEvent?.visitors.map((visitor) => (
        <Visitor key={visitor.visitorId} visitor={visitor} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </section>
  );
}
