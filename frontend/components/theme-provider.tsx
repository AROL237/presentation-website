"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

type NextThemesProviderProps = ComponentProps<typeof NextThemesProvider>;

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: NextThemesProviderProps["attribute"];
  defaultTheme?: string;
  enableSystem?: boolean;
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "light",
  enableSystem = true,
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      storageKey="spare-care-theme"
    >
      {children}
    </NextThemesProvider>
  );
}

export default ThemeProvider;