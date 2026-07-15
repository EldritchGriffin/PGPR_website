import AboutView from "./AboutView";
import {
  getAboutPage,
  getSiteSettings,
  getTeamMembers,
} from "../../lib/sanity/queries";

export default async function Page() {
  const [aboutPage, teamMembers, siteSettings] = await Promise.all([
    getAboutPage(),
    getTeamMembers(),
    getSiteSettings(),
  ]);

  const businessTeam = teamMembers.filter((m) => m.group === "business");
  const rdTeam = teamMembers.filter((m) => m.group === "rd");

  return (
    <AboutView
      aboutPage={aboutPage}
      businessTeam={businessTeam}
      rdTeam={rdTeam}
      siteSettings={siteSettings}
    />
  );
}
