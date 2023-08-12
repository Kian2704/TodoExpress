export default function Select({
  options = [{ value: "1", tag: "Eins" }],
  eman,
  show = true,
}) {
  if (show)
    return (
      <select name={eman}>
        {options.map((option) => (
          <option value={option.value} key="d">
            {option.tag}
          </option>
        ))}
      </select>
    );
}
