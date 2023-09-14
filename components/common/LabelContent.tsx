import React from "react";

export default function LabelContent({ label, content, className }: { label: string; content: any[] | string | JSX.Element; className?: string }) {
  console.log("content", content);

  const renderContent = () => {
    if (typeof content === "string") {
      return <p className="text-white">{content}</p>;
    }

    if (Array.isArray(content)) {
      return content.map((item, i) => (
        <p key={i} className="text-white">
          {item}
        </p>
      ));
    }

    if (React.isValidElement(content)) {
      return content;
    }

    return null;
  };

  return (
    <div className={className}>
      <p className="text-mist-60 font-sans-serif mb-2">{label}</p>
      <div>{renderContent()}</div>
    </div>
  );
}
