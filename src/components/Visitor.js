import Button from "./Button";
import Card from "./Card";

export default function Visitor({ visitor, onEdit, onDelete }) {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <Card gender={visitor.gender}>
      <form onSubmit={handleSubmit}>
        <h2>{visitor.name}</h2>
        <h3>{visitor.type}</h3>
        <Button onClick={() => onEdit(visitor.visitorId)}>Edit</Button>
        <Button onClick={() => onDelete(visitor.visitorId)}>Delete</Button>
      </form>
    </Card>
  );
}
