import { useEventPass } from "../contexts/EventPassContext";
import Button from "./Button";
import Card from "./Card";


export default function Visitor({ visitor }) {
  const { dispatch } = useEventPass();
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <Card gender={visitor.gender}>
      <form onSubmit={handleSubmit}>
        <h2>{visitor.name}</h2>
        <h3>{visitor.type}</h3>
        <Button onClick={() => dispatch({type: "visitorSetEdit", payload: visitor.visitorId})}>Edit</Button>
        <Button onClick={() => dispatch({type: "visitorDelete", payload: visitor.visitorId})}>Delete</Button>
      </form>
    </Card>
  );
}
