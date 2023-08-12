export default function ListHead({ headline }) {
  if (headline.active === 1) {
    return (
      <div className="row bg-secondary mb-1 rounded-1">
        <h2 className="text-center">{headline.name}</h2>
      </div>
    );
  } else {
    return (
      <div className="row bg-secondary mb-1 rounded-1">
        <h2 className="text-center">
          <del className="inactiveList">{headline.name}</del>
        </h2>
      </div>
    );
  }
}
