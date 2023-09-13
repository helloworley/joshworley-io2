import { ModalFrame } from "@/components/skrim/ModalFrame";

export default function ModalWindow({
  className,
  children,
  from = "bottom",
}: {
  className?: string;
  children: any;
  from?: "top" | "bottom" | "left" | "right";
}) {
  return (
    <ModalFrame
      className={["border-gray-1200 relative rounded-lg border p-4 md:w-[480px] md:p-8 lg:px-16", className].join(" ")}
      animate={{ from: from }}
    >
      {children}
    </ModalFrame>
  );
}
