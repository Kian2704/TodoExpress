export default function Input({
  show = true,
  eman = "",
  Placeholder = "",
  classes,
  type = "text",
  onChange = "",
  maxlength = 265
}) {
  if (show)
    return (
      <input
        className={classes}
        onChange={onChange}
        type={type}
        placeholder={Placeholder}
        maxLength={maxlength}
      />
    );
}
