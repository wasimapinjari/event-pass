import { useEventPass } from "../contexts/EventPassContext";
import Visitor from "./Visitor";

export default function EventVisitors() {
  const { state } = useEventPass();
  return (
    <section className="main-content">
      {state.currentEvent?.visitors.map((visitor) => (
        <Visitor key={visitor.visitorId} visitor={visitor} />
      ))}
    </section>
  );
}
