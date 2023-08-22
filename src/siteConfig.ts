import {SiteProps} from "@nes-digital-service/turas.design-system-react/dist/types";

import {breadcrumbConfig} from "./breadcrumbs";

import TurasLogo from "./img/turas-logo.png";
import NDPLogo from "./img/NDP-logo-tagline-white.svg";
import NHSLogo from "./img/nhs-logo-white-banner.png";

export const SiteConfig: SiteProps = {
  // header
  nav: {
    siteTitle: "NDP Media Store",
    siteLogo: TurasLogo,
    hideUserIcon: true,
  },

  breadcrumbConfig: breadcrumbConfig,

  // footer
  footer: {
    footerImage: NDPLogo,
    footerImageWidth: "260px",
    footerNhsImage: NHSLogo,
    // footerNhsImageWidth: string | number,
    footerLinks: [
      {
        label: "Accessibility",
        href: "https://www.nes.scot.nhs.uk/legal-and-site-information/accessibility/",
        target: "_blank"
      },
      {
        label: "Privacy",
        href: "https://www.nes.scot.nhs.uk/legal-and-site-information/privacy/",
        target: "_blank"
      },
    ],
    copyrightOwner: "NHS Education for Scotland",
    copyrightYear: "2023",
    versionString: "VERSION (TODO)", // TODO `${config.version} (${config.environmentName})`,
  },
};

export const ServerConfig = {
  host: '192.168.1.150',
  port: 3000,
}
