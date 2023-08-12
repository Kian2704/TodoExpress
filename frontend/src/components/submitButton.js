export default function SubmitButton({
  name = "Submit",
  isEnabled = false,
  classes = "btn btn-success btn-sm",
}) {
  if (isEnabled) {
    return <input type="submit" className={classes} value={name}></input>;
  } else {
    return (
      <input type="submit" className={classes} disabled value={name}></input>
    );
  }
}
