import React, { useEffect, useState } from "react";

interface AnimateGroupProps {
  children: React.ReactNode | React.ReactNode[];
  type: "fade" | "slide";
  direction?: "left" | "right" | "up" | "down";
  offset?: number;
  initialDelay?: number;
  staggerDelay?: number;
}

export default function AnimateGroup({
  children,
  type = "fade",
  direction = "right",
  offset = 0,
  initialDelay = 0,
  staggerDelay = 100,
}: AnimateGroupProps): JSX.Element {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setAnimate(true);
    });
  }, []);

  const animationClass =
    type === "fade" ? "animate-fade-in" : "animate-slide-in";

  let initialTransform: string;
  switch (direction) {
    case "left":
      initialTransform = `translateX(${offset}%)`;
      break;
    case "right":
      initialTransform = `translateX(-${offset}%)`;
      break;
    case "up":
      initialTransform = `translateY(${offset}%)`;
      break;
    case "down":
      initialTransform = `translateY(-${offset}%)`;
      break;
    default:
      initialTransform = `translateX(0)`;
  }

  return (
    <>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const typedChild = child as React.ReactElement<any>;

        const style: React.CSSProperties & Record<string, string> = {
          animationDelay: `${index * staggerDelay + initialDelay}ms`,
          "--tw-transform-from": initialTransform,
          ...typedChild.props.style,
        };

        const initialClass = !animate ? "opacity-0 will-change-transform" : "";
        const finalClass = animate ? "animate-slide-in" : "";

        const className = `${initialClass} ${finalClass} ${
          typedChild.props.className || ""
        }`;

        return React.cloneElement(typedChild, {
          style,
          className,
          children: typedChild.props.children,
        });
      })}
    </>
  );
}
