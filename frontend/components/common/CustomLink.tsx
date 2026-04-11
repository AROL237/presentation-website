import Link from "next/link";
import React, { PropsWithChildren } from "react";
type Myprops = {
  href: string;
  title?: string;
  className?: string;
  target?: "_blank" | "_parent" | "_self" | "_top";
} & PropsWithChildren;

export default function CustomLink({
  children,
  href,
  className,
  title,
  target,
}: Myprops) {
  return (
    <Link
      className={`active:text-amber-700 ${className}`}
      target={target}
      href={href}
      title={title}
    >
      {children}
    </Link>
  );
}
