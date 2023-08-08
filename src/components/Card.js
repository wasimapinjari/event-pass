export default function Card({ children, onClick, gender }) {
  return (
    <div
      className="card"
      onClick={onClick}
      style={{ backgroundColor: gender === "Male" ? "#CEE6F3" : "pink" }}
    >
      {children}
    </div>
  );
}
