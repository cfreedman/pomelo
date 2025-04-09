import { JSX } from "react";

interface RecipeContainerProps {
  children: React.ReactNode;
}

export default function RecipeContainer({
  children,
}: RecipeContainerProps): JSX.Element {
  return (
    <div className="w-[40%] px-[50px] py-[50px] bg-blue-50 flex flex-col items-center">
      {children}
    </div>
  );
}
