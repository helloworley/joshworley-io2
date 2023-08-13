export default function TitleDescription({ title, description }) {
  return (
    <>
      <h1 className="mb-4 text-4xl text-white">{title}</h1>
      <p className="text-white">{description}</p>
    </>
  );
}
