export default function LabelContent({ label, content }: { label: string; content: any[] | string }) {
  return (
    <div>
      <p className="text-mist-60 mb-2">{label}</p>
      <div>
        {typeof content === "string" ? (
          <p className="text-white">{content}</p>
        ) : (
          content.map((item, i) => (
            <p key={i} className="text-white">
              {item}
            </p>
          ))
        )}
      </div>
    </div>
  );
}
