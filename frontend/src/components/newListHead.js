export default function NewListHead({ listName, setListName }) {
  return (
    <div className="container text-center row bg-secondary mb-1">
      <div className="my-2 col col-12 text-center">
        <input
          type="text"
          className="newListName col col-7 border-0 bg-dark text-white text-center"
          value={listName}
          onChange={(event) => {
            setListName(event.target.value);
          }}
          placeholder="ToDo List"
        />
      </div>
    </div>
  );
}
