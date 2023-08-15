import React, { useState } from "react";
import { NotionImage } from "./NotionImage";

const getPlainText = richText => {
  return richText && richText.length > 0 ? richText[0].plain_text : "";
};

const renderTextBlock = (textBlock, key) => {
  const isBold = textBlock.annotations.bold ? "" : "";
  const isItalic = textBlock.annotations.italic ? "italic" : "";
  const isStrikethrough = textBlock.annotations.strikethrough ? "line-through" : "";
  const isUnderline = textBlock.annotations.underline ? "underline" : "";

  return (
    <React.Fragment key={key}>
      <p className={`${isBold} ${isItalic} ${isStrikethrough} ${isUnderline}`}>{textBlock.plain_text}</p>
      {textBlock.plain_text.includes("\n") && <div className="py-1 opacity-0">&nbsp;</div>}
    </React.Fragment>
  );
};

const ToggleBlock = ({ block, allBlocks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const value = block.toggle;

  return (
    <div key={block.id} className="py-2">
      <div className="flex cursor-pointer items-center font-semibold text-white" onClick={() => setIsOpen(!isOpen)}>
        <div className={`mr-2 inline-block transform transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.66732 1.33398L13.334 8.01732L2.66732 14.6673L2.66732 1.33398Z" fill="white" />
          </svg>
        </div>
        {value.rich_text && value.rich_text[0] && value.rich_text[0].plain_text ? value.rich_text[0].plain_text : ""}
      </div>

      <div className="my-2 ml-7 max-w-3xl">
        {isOpen && block.children.map(childBlock => <RenderBlock block={childBlock} allBlocks={allBlocks} />)}
      </div>
    </div>
  );
};

const QuoteBlock = ({ block }) => {
  const value = block.quote;
  return (
    <div key={block.id} className="border-white-100 bg-gray-1300 my-3 max-w-3xl rounded-r-xl border-l-2 px-7 py-4 italic text-white">
      {value.rich_text.map((text, i) => {
        return <p key={i}>{text && text.plain_text ? text.plain_text : ""}</p>;
      })}
    </div>
  );
};

const RenderBlock = ({ block, allBlocks }) => {
  if (!block || !block.type) return null;

  const type = block.type;
  const value = block[type];

  if (!value) return null;

  let text, isBold, isItalic, isStrikethrough, isUnderline;

  switch (type) {
    case "paragraph":
      if (value.rich_text.length === 0) {
        return (
          <div key={block.id} className="py-1 opacity-0">
            &nbsp;
          </div>
        );
      } else {
        return (
          <div key={block.id} className=" max-w-4xl py-2">
            {value.rich_text.map((text, i) => {
              if (!text.plain_text) return null;

              isBold = text.annotations.bold ? " text-white-90" : "";
              isItalic = text.annotations.italic ? "italic" : "";
              isStrikethrough = text.annotations.strikethrough ? "line-through" : "";
              isUnderline = text.annotations.underline ? "underline" : "";
              const formattedText = (
                <p key={i} className={`${isBold} ${isItalic} ${isStrikethrough} ${isUnderline} text-white`}>
                  {text.plain_text}
                </p>
              );

              return text.href ? (
                <a href={text.href} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline hover:text-blue-800" key={i}>
                  {formattedText}
                </a>
              ) : (
                formattedText
              );
            })}
          </div>
        );
      }

    case "heading_1":
      return (
        <h1 key={block.id} className="mb-3 mt-8 max-w-4xl text-3xl  font-semibold text-white md:text-4xl  lg:text-[38px] lg:!leading-[2.9rem]">
          {getPlainText(value.rich_text)}
        </h1>
      );

    case "heading_2":
      return (
        <h2 key={block.id} className="mt-8 max-w-4xl text-2xl  font-semibold text-white ">
          {getPlainText(value.rich_text)}
        </h2>
      );

    case "heading_3":
      return (
        <h3 key={block.id} className="mt-8 max-w-4xl text-xl  font-semibold text-white ">
          {getPlainText(value.rich_text)}
        </h3>
      );
    case "divider":
      return <hr key={block.id} className="my-5 opacity-30" />;

    case "bulleted_list_item":
      text = value.rich_text[0];
      isBold = text.annotations.bold ? "" : "";
      isItalic = text.annotations.italic ? "italic" : "";
      isStrikethrough = text.annotations.strikethrough ? "line-through" : "";
      isUnderline = text.annotations.underline ? "underline" : "";

      return (
        <span>
          <li key={block.id} className="max-w-4xl py-1  text-white ">
            {value.rich_text.map((text, i) => {
              if (!text.plain_text) return null;

              isBold = text.annotations.bold ? "" : "";
              isItalic = text.annotations.italic ? "italic" : "";
              isStrikethrough = text.annotations.strikethrough ? "line-through" : "";
              isUnderline = text.annotations.underline ? "underline" : "";
              return (
                <span key={i} className={`${isBold} ${isItalic} ${isStrikethrough} ${isUnderline}`}>
                  {text.plain_text}
                </span>
              );
            })}
            {block.has_children && block.children && (
              <ul className="ml-8 list-disc">
                {block.children.map((childBlock, i) => (
                  <RenderBlock block={childBlock} allBlocks={allBlocks} key={i} />
                ))}
              </ul>
            )}
          </li>
        </span>
      );

    case "numbered_list_item":
      return (
        <>
          <li className="max-w-4xl list-decimal py-1  text-white ">
            {value.rich_text.map((text, i) => {
              if (!text.plain_text) return null;

              isBold = text.annotations.bold ? "" : "";
              isItalic = text.annotations.italic ? "italic" : "";
              isStrikethrough = text.annotations.strikethrough ? "line-through" : "";
              isUnderline = text.annotations.underline ? "underline" : "";
              return (
                <span key={i} className={`${isBold} ${isItalic} ${isStrikethrough} ${isUnderline}`}>
                  {text.plain_text}
                </span>
              );
            })}
          </li>
          {block.has_children && block.children && (
            <ul className="ml-8 list-decimal">
              {block.children.map((childBlock, i) => (
                <RenderBlock block={childBlock} allBlocks={allBlocks} key={i} />
              ))}
            </ul>
          )}
        </>
      );

    case "table":
      if (!block.children) return null;

      return (
        <div className="w-full max-w-full overflow-x-auto  ">
          <table key={block.id} className="my-8 w-full table-auto rounded-2xl">
            <tbody>
              {block.children.map((rowBlock, rowIndex) => {
                const row = rowBlock.table_row;
                return (
                  <tr key={rowBlock.id}>
                    {row.cells.map((cell, cellIndex) => {
                      return rowIndex === 0 && block.table.has_column_header ? (
                        <th
                          key={cellIndex}
                          className={`bg-gray-1100 px-6 py-4 text-sm text-white ${cellIndex === 0 ? "first:rounded-tl-2xl" : ""} ${
                            cellIndex === row.cells.length - 1 ? "last:rounded-tr-2xl" : ""
                          }`}
                        >
                          {cell.map((textBlock, textIndex) => renderTextBlock(textBlock, textIndex))}
                        </th>
                      ) : (
                        <td
                          key={cellIndex}
                          className={`border-gray-1200 bg-gray-1300 text-white-70 border px-6 py-4 text-sm ${
                            rowIndex === block.children.length - 1 && cellIndex === 0 ? "first:rounded-bl-2xl" : ""
                          } ${rowIndex === block.children.length - 1 && cellIndex === row.cells.length - 1 ? "last:rounded-br-2xl" : ""}`}
                        >
                          {cell.map((textBlock, textIndex) => renderTextBlock(textBlock, textIndex))}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );

    case "image":
      const imageUrl = value.file.url;
      const imgCaption = value.caption && value.caption[0] ? value.caption[0].plain_text : "";

      return (
        <div key={block.id} className="my-8">
          {/* <img src={imageUrl} alt={imgCaption || "image"} className="my-2 h-auto w-full" /> */}
          <NotionImage src={imageUrl} alt={imgCaption || "image"} blockId={block.id} />
          {imgCaption && <p className="my-4 text-center italic text-gray-600">{imgCaption}</p>}
        </div>
      );

    case "video":
      const videoUrl = value.external.url;
      const vidCaption = value.caption && value.caption[0] ? value.caption[0].plain_text : "";

      return (
        <div key={block.id} className="relative mx-auto my-2">
          <iframe
            className="h-max w-max md:h-[20rem] md:w-[45rem] lg:h-[35rem] lg:w-[65rem]"
            src={videoUrl}
            title={vidCaption || "video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          {vidCaption && <p className="my-4 text-center italic text-gray-600">{vidCaption}</p>}
        </div>
      );

    case "toggle":
      return <ToggleBlock block={block} allBlocks={allBlocks} />;

    case "quote":
      return <QuoteBlock block={block} />;

    default:
      return null;
  }
};
export default RenderBlock;
