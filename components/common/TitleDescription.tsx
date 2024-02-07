export default function TitleDescription({ title, description }) {
  return (
    <div className="text-center">
      <h1 className="mb-2 text-4xl text-white">{title}</h1>
      <p className="text-mist-50">{description}</p>
    </div>
  );
}
