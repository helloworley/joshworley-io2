export default function TitleDescription({ title, description }) {
  return (
    <div className="max-w-2xl">
      <h1 className="mb-4 text-4xl text-white">{title}</h1>
      <p className="text-white">{description}</p>
    </div>
  );
}
