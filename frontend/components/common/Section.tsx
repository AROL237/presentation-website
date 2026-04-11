import React, { PropsWithChildren, ReactNode } from "react";

type SectionProps = {
  className: String;
} & PropsWithChildren;

export default function Section({ children, className }: SectionProps) {
  return <div className={` ${className}`}>{children}</div>;
}
