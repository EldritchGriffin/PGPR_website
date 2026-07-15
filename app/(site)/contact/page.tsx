import ContactView from "./ContactView";
import { getContactPage, getSiteSettings } from "../../lib/sanity/queries";

export default async function Page() {
  const [contactPage, siteSettings] = await Promise.all([
    getContactPage(),
    getSiteSettings(),
  ]);

  return <ContactView contactPage={contactPage} siteSettings={siteSettings} />;
}
