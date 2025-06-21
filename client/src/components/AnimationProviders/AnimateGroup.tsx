import React, { useEffect, useState } from "react";

interface AnimateGroupProps {
  children: React.ReactNode | React.ReactNode[];
  type: "fade" | "slide";
  direction?: "left" | "right" | "up" | "down";
  offset: "small" | "medium" | "large";
  initialDelay?: number;
  staggerDelay?: number;
}

export default function AnimateGroup({
  children,
  type = "fade",
  direction = "right",
  offset = "small",
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
    type === "fade"
      ? "animate-fade-in"
      : `animate-slide-in-${direction}-${offset}`;

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
        };

        const className = `${
          animate ? `opacity-0 ${animationClass}` : "opacity-0"
        } contents`;

        return (
          <div className={className} style={style} key={index}>
            {typedChild}
          </div>
        );
      })}
    </>
  );
}

export function AnimateTableRows({
  children,
  type = "fade",
  direction = "right",
  offset = "small",
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
    type === "fade"
      ? "animate-fade-in"
      : `animate-slide-in-${direction}-${offset}`;

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
        };

        const className = `${
          animate ? `opacity-0 ${animationClass}` : "opacity-0"
        } contents`;

        return (
          <div className={className} style={style} key={index}>
            {typedChild}
          </div>
        );
      })}
    </>
  );
}
