import { default as dynamic } from "next/dynamic";
import { SetStateAction } from "react";

const Skrim = ({ when, onClick, children }: { when: boolean; onClick: SetStateAction<any>; children?: any }) => {
  const bodyRef = React.useRef(document.body);

  React.useEffect(() => {
    const body = bodyRef.current;
    body.style.overflow = when ? "hidden" : "auto";
  }, [when]);

  if (!when) return <></>;

  return (
    <div className="fixed left-0 right-0 top-0 z-50 grid h-full w-full cursor-pointer">
      <div className="bg-smoke-70 fixed h-full w-full opacity-60" onClick={onClick}></div>
      {children}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Skrim), { ssr: false });
