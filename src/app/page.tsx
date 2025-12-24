import { redirect } from "next/navigation";

export default function Home() {
  // URL-based i18n requirement: the app lives under /en and /tr.
  // Root URL redirects to default locale for a predictable canonical URL.
  redirect("/en");
}
