export default function DeleteList({ deltask }) {
  return (
    <div
      onClick={deltask}
      href="#"
      className="float-end text-danger me-1 deleteTask"
    >
      X
    </div>
  );
}
