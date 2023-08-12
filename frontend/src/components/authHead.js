export default function AuthHead({ login }) {
  if (login)
    return (
      <div className="container row bg-secondary mb-1">
        <div className="my-2 col col-12 text-center">
          <h2 className="text-center"> Login </h2>
        </div>
      </div>
    );

  return (
    <div className="container row bg-secondary mb-1">
      <div className="my-2 col col-12 text-center">
        <h2 className="text-center"> Register </h2>
      </div>
    </div>
  );
}
