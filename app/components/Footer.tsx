"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { LOGO_GLYPH_LIGHT, LOGO_TEXT_LIGHT } from "../lib/tokens";
import { fadeIn, viewport } from "../lib/motion";
import type { SiteSettingsData } from "../lib/sanity/queries";

interface FooterProps {
  siteSettings: SiteSettingsData;
  /**
   * Override the border-radius classes. Default: `"rounded-tl-[8px] rounded-tr-[80px] rounded-br-[8px] rounded-bl-[80px]"`.
   * Home page uses `"rounded-tl-[8px] rounded-tr-[8px] rounded-br-[80px] rounded-bl-[8px]"`.
   */
  roundedClass?: string;
}

// Icon artwork is part of the coded design system — the CMS only supplies
// which platforms are enabled and where they link to.
const SOCIAL_ICON_PATHS: Record<string, string> = {
  facebook: "M12 0C5.373 0 0 5.373 0 12C0 18.016 4.432 22.984 10.206 23.852V15.18H7.237V12.026H10.206V9.927C10.206 6.452 11.899 4.927 14.787 4.927C16.17 4.927 16.902 5.03 17.248 5.076V7.829H15.278C14.052 7.829 13.624 8.992 13.624 10.302V12.026H17.217L16.73 15.18H13.624V23.877C19.481 23.083 24 18.075 24 12C24 5.373 18.627 0 12 0Z",
  instagram: "M6.998 0C3.139 0 0 3.142 0 7.002V17.002C0 20.861 3.142 24 7.002 24H17.002C20.861 24 24 20.858 24 16.998V6.998C24 3.139 20.858 0 16.998 0H6.998ZM19 4C19.552 4 20 4.448 20 5C20 5.552 19.552 6 19 6C18.448 6 18 5.552 18 5C18 4.448 18.448 4 19 4ZM12 6C15.309 6 18 8.691 18 12C18 15.309 15.309 18 12 18C8.691 18 6 15.309 6 12C6 8.691 8.691 6 12 6ZM12 8C10.939 8 9.922 8.421 9.172 9.172C8.421 9.922 8 10.939 8 12C8 13.061 8.421 14.078 9.172 14.828C9.922 15.579 10.939 16 12 16C13.061 16 14.078 15.579 14.828 14.828C15.579 14.078 16 13.061 16 12C16 10.939 15.579 9.922 14.828 9.172C14.078 8.421 13.061 8 12 8Z",
  linkedin: "M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM7.496 5.403C8.338 5.403 8.899 5.964 8.899 6.712C8.899 7.46 8.338 8.021 7.403 8.021C6.561 8.022 6 7.46 6 6.712C6 5.964 6.561 5.403 7.496 5.403ZM9 17H6V9H9V17ZM19 17H16.176V12.628C16.176 11.419 15.423 11.14 15.141 11.14C14.859 11.14 13.917 11.326 13.917 12.628C13.917 12.814 13.917 17 13.917 17H11V9H13.918V10.116C14.294 9.465 15.047 9 16.459 9C17.871 9 19 10.116 19 12.628V17Z",
};

export function Footer({
  siteSettings,
  roundedClass = "rounded-tl-[8px] rounded-tr-[80px] rounded-br-[8px] rounded-bl-[80px]",
}: FooterProps) {
  return (
    <motion.footer
      className={`w-full mt-5 ${roundedClass} overflow-hidden
        px-6 sm:px-16 lg:px-[200px] pt-14 lg:pt-[100px] pb-10 lg:pb-[72px] bg-[#213026] text-[#f4fff8]`}
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-12">
        <Link href="/" className="flex items-center gap-4 shrink-0 hover:opacity-85 transition-opacity">
          <Image src={LOGO_GLYPH_LIGHT} alt="" width={63} height={90} className="w-[36px] h-[52px] lg:w-[63px] lg:h-[90px]" />
          <Image src={LOGO_TEXT_LIGHT} alt="PGPR Technologies" width={130} height={50} className="w-[78px] h-[30px] lg:w-[130px] lg:h-[50px]" />
        </Link>

        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 lg:gap-[140px]">
          <div className="flex flex-col gap-5">
            <h4 className="font-bold text-2xl lg:text-[40px] lg:leading-[52px]">Learn More</h4>
            <nav className="flex flex-col gap-4 font-medium text-[15px]">
              {([ ["About", "/about"], ["Products", "/#products"], ["Contact", "/contact"] ] as const).map(([label, href]) => (
                <a key={label} href={href}
                  className="hover:text-[#2dba5d] hover:translate-x-1 transition-all duration-200 inline-block w-fit">
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-5">
            <h4 className="font-bold text-2xl lg:text-[40px] lg:leading-[52px]">Say Hello!</h4>
            <div className="flex flex-col gap-4 font-medium text-[15px]">
              <a href={`mailto:${siteSettings.email}`}
                className="hover:text-[#2dba5d] hover:translate-x-1 transition-all duration-200 inline-block w-fit">
                {siteSettings.email}
              </a>
              <a href={`tel:${siteSettings.phone.replace(/[^+\d]/g, "")}`}
                className="hover:text-[#2dba5d] hover:translate-x-1 transition-all duration-200 inline-block w-fit">
                {siteSettings.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
        <p className="text-[15px] font-medium text-[#f4fff8]/70">
          {siteSettings.footerCopyrightText}
        </p>
        <div className="flex items-center gap-4">
          {siteSettings.socialLinks.map(({ platform, href }) => (
            <a key={platform} href={href} target="_blank" rel="noopener noreferrer" aria-label={platform}
              className="opacity-70 hover:opacity-100 transition-opacity">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#ECE9F1" xmlns="http://www.w3.org/2000/svg">
                <path d={SOCIAL_ICON_PATHS[platform]} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
}
