export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Nextcare.life",
  description:
    "Nextcare Life delivers AI-powered digital healthcare solutions, converting handwritten prescriptions into accurate digital formats using advanced CDSS technology. Streamline workflows and enhance healthcare with our innovative platform.",
  // 'An unique approach to skin care. Prescription based Skincare at your fingertips',
  keywords:
    "Digital prescription, CDSS, Clinical decision support system, CDSS solution for healthcare, Future of healthcare, Nextcare life, Nextcare, Nextcare.life, nextcare.life, Handwritten to digital prescription, Healthcare digitisation, CDSS platform, Digital healthcare solutions, Prescription management system, Electronic prescription software, Digital transformation in healthcare, Clinical support system, Digital health platforms, Medical decision-making tools, E-prescription system, Smart healthcare solutions, Future of digital healthcare, Handwritten prescription digitisation, Healthcare automation, Clinical data management, Intelligent healthcare systems, Medical informatics, CDSS healthcare technology, Smart CDSS solutions, Prescription accuracy with CDSS, Clinical decision tools",
  // 'Skincare, Glow, Dermatologist, Online Doctor, Healthcare ,  Nextcarelife,Skincare Products ,AI based skincare ,Online Skincare ,Medical Buddy, Nextcare.life, Nextcare, Skincare, Health, Skin Care, Skin Care Products, Skin Care Products, Skin Care Products, Skin Care Products, Skin Care Products, Skin Care Products, Skin Care Products, Skin Care Products, Skin Care Products, Skin Care Products, Skin Care Products, Skin Care Products, Skin Care Products, Skin',
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "AI",
      href: "/ai",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
