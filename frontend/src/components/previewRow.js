export default function previewRow({ ident, value, show = true }) {
  if (show)
    return (
      <div className="row">
        <div className="col col-6 text-center">{ident + ":"}</div>
        <div className="col col-6 text-center">{value}</div>
      </div>
    );
}
