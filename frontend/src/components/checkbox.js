export default function Checkbox({
  show,
  eman,
  setClicked,
  checked,
  classes,
  label,
}) {
  if (show)
    if (checked)
      return (
        <div className="col col-12 text-center">
          <label className="col col-12 text-center" htmlFor="highlight">
            {label}
          </label>
          <input
            type="checkbox"
            className={classes}
            checked
            onClick={setClicked}
            name={eman}
          />
        </div>
      );
    else
      return (
        <div className="col col-12 text-center">
          <label className=" text-center" htmlFor="highlight">
            {label}
          </label>
          <input
            type="checkbox"
            className={classes}
            onClick={setClicked}
            name={eman}
          />
        </div>
      );
}
