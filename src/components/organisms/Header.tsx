"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/i18n/I18nProvider";
import { LocaleSwitcher } from "@/components/molecules/LocaleSwitcher";
import { ThemeToggle } from "@/components/molecules/ThemeToggle";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { Badge } from "@/components/atoms/Badge";

function NavItem({
  href,
  label,
  isActive,
}: Readonly<{ href: string; label: string; isActive: boolean }>) {
  return (
    <Link
      href={href}
      className={
        "rounded-xl px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 " +
        (isActive
          ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
          : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-100")
      }
    >
      {label}
    </Link>
  );
}

export function Header() {
  const { dict, locale } = useI18n();
  const pathname = usePathname() ?? `/${locale}`;
  const favoritesCount = useFavoritesStore((s) => s.ids.length);

  const homeHref = `/${locale}`;
  const favoritesHref = `/${locale}/favorites`;

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/60 bg-white/70 backdrop-blur dark:border-zinc-800/60 dark:bg-black/40">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href={homeHref}
          className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
        >
          {dict.common.appName}
        </Link>

        <nav aria-label={dict.common.appName} className="flex items-center gap-1">
          <NavItem
            href={homeHref}
            label={dict.nav.home}
            isActive={pathname === homeHref}
          />
          <div className="flex items-center gap-2">
            <NavItem
              href={favoritesHref}
              label={dict.nav.favorites}
              isActive={pathname.startsWith(favoritesHref)}
            />
            <Badge>{favoritesCount}</Badge>
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}


