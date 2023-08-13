export default function LabelContent({ label, content, className }: { label: string; content: any[] | string; className?: string }) {
  return (
    <div className={className}>
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
