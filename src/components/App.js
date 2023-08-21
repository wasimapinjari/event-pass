import Main from "./Main";
import Sidebar from "./Sidebar";
import { EventPassProvider } from "../contexts/EventPassContext";

export default function App() {
  return (
    <EventPassProvider>
      <div className="app">
        <Sidebar />
        <Main />
      </div>
    </EventPassProvider>
  );
}
