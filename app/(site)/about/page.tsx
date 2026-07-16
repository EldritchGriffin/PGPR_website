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

  // Team section currently spotlights just the two co-founders.
  const FEATURED_TEAM = ["Hamza El Kharroubi", "Abdessadek Aghrinane"];
  const featured = teamMembers.filter((m) => FEATURED_TEAM.includes(m.name));
  const businessTeam = featured.filter((m) => m.group === "business");
  const rdTeam = featured.filter((m) => m.group === "rd");

  return (
    <AboutView
      aboutPage={aboutPage}
      businessTeam={businessTeam}
      rdTeam={rdTeam}
      siteSettings={siteSettings}
    />
  );
}
