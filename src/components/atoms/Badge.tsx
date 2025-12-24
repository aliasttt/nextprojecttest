"use client";

export function Badge({
  children,
  className = "",
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <span
      className={
        "inline-flex min-w-6 items-center justify-center rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 " +
        className
      }
    >
      {children}
    </span>
  );
}




