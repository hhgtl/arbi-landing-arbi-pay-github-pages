import {
  Children,
  Fragment,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";
import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import s from "./animated-header.module.scss";

type AnimatedHeaderProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /** Delay step between lines, seconds */
  stagger?: number;
};

/**
 * Splits children into visual lines: breaks on <br /> elements
 * and "\n" inside plain strings. Inline elements (accent spans etc.)
 * stay within their line.
 */
const splitIntoLines = (children: ReactNode): ReactNode[][] => {
  const lines: ReactNode[][] = [[]];

  const pushNode = (node: ReactNode): void => {
    if (node === null || node === undefined || typeof node === "boolean") {
      return;
    }

    if (typeof node === "string") {
      const parts = node.split("\n");
      parts.forEach((part, i) => {
        if (i > 0) lines.push([]);
        if (part) lines[lines.length - 1].push(part);
      });
      return;
    }

    if (isValidElement(node)) {
      if (node.type === "br") {
        lines.push([]);
        return;
      }
      if (node.type === Fragment) {
        Children.toArray(node.props.children).forEach(pushNode);
        return;
      }
    }

    lines[lines.length - 1].push(node);
  };

  Children.toArray(children).forEach(pushNode);

  return lines.filter((line) => line.length > 0);
};

export const AnimatedHeader = ({
  as: Tag = "h2",
  stagger = 0.15,
  className,
  children,
  ...rest
}: AnimatedHeaderProps): JSX.Element => {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const lines = splitIntoLines(children);

  return (
    <Tag
      ref={ref}
      className={clsx(s.header, isVisible && s.visible, className)}
      {...rest}
    >
      {lines.map((line, i) => (
        <span key={i} className={s.line}>
          <span
            className={s.lineInner}
            style={{ transitionDelay: `${i * stagger}s` }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
};
