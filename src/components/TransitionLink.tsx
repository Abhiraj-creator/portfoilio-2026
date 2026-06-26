"use client";

import Link, { type LinkProps } from "next/link";
import {
  useCallback,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import useViewTransition from "@/hooks/useViewTransition";

type TransitionLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "onClick"
> &
  LinkProps & {
    children: ReactNode;
    className?: string;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  };

const isModifiedEvent = (event: MouseEvent<HTMLAnchorElement>) =>
  event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

const TransitionLink = ({
  href,
  children,
  onClick,
  target,
  rel,
  ...props
}: TransitionLinkProps) => {
  const { navigateTo } = useViewTransition();

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);

      if (event.defaultPrevented) return;
      if (typeof href !== "string") return;
      if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (target && target !== "_self") return;
      if (isModifiedEvent(event)) return;

      event.preventDefault();
      navigateTo(href);
    },
    [href, navigateTo, onClick, target],
  );

  return (
    <Link href={href} target={target} rel={rel} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

export default TransitionLink;
