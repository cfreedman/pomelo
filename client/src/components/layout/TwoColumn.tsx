import { JSX } from "react";

interface TwoColumnProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export default function TwoColumn({
  left,
  right,
}: TwoColumnProps): JSX.Element {
  return (
    <div className="flex my-3 mx-2 w-full">
      <div className="px-3 flex-auto">{left}</div>
      <div className="px-3 flex-auto">{right}</div>
    </div>
  );
}
