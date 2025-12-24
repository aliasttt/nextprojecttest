"use client";

import type { ButtonHTMLAttributes } from "react";

export function IconButton({
  className = "",
  ...props
}: Readonly<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      {...props}
      className={
        "inline-flex h-10 w-10 items-center justify-center rounded-xl " +
        "bg-zinc-100 text-zinc-900 transition-colors hover:bg-zinc-200 " +
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 " +
        "dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 " +
        className
      }
    />
  );
}




