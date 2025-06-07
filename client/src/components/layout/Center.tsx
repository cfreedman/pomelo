import { ReactNode } from "react";

export default function Center({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-blue-50">
      {children}
    </div>
  );
}
