import { PersistentNavbar } from "../components/PersistentNavbar";
import { PageTransition } from "../components/PageTransition";
import { getSiteSettings } from "../lib/sanity/queries";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();

  return (
    <>
      <PersistentNavbar navLabels={siteSettings.navLabels} />
      <PageTransition>{children}</PageTransition>
    </>
  );
}
