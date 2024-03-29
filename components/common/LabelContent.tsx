import React from "react";

export default function LabelContent({
  label,
  content,
  relation,
  className,
}: {
  label: string;
  content?: string | JSX.Element;
  className?: string;
  relation?: { data: any[] };
}) {
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
      {relation ? (
        <>
          {relation?.data.map((item, i) => {
            return (
              <p className="text-white" key={i}>
                {item.attributes.name}
              </p>
            );
          })}
        </>
      ) : (
        <div>{renderContent()}</div>
      )}
    </div>
  );
}
