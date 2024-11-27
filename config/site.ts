export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  url: "https://nextcare.life/",
  name: "Nextcare.life",
  title: "Nextcare.life - Future of care",
  description:
    "Nextcare Life delivers AI-powered digital healthcare solutions, converting handwritten prescriptions into accurate digital formats using advanced CDSS technology. Streamline workflows and enhance healthcare with our innovative platform.",
  // 'An unique approach to skin care. Prescription based Skincare at your fingertips',
  keywords:
    "Digital prescription, CDSS, Clinical decision support system, CDSS solution for healthcare, Future of healthcare, Nextcare life, Nextcare, Handwritten prescription to digital prescription, Handwritten to digital prescription, Convert handwritten prescription to digital prescription, CDSS platform, Digital healthcare solutions, Clinical support system, Digital health platforms, Medical decision-making tools, Smart healthcare solutions, Future of digital healthcare, Handwritten prescription digitisation, Smart CDSS solutions, Prescription accuracy with CDSS, Clinical decision tools, Blood report Digitization, Lab Report Digitization, Smart lab report, Health Record History, Health care blog, Health blog",
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

  bmiCalculator: {
    description:
      "A tool to calculate Body Mass Index (BMI) based on height and weight, used to assess whether a person is underweight, normal weight, overweight, or obese.",
    keywords: [
      "BMI",
      "Body Mass Index",
      "calculate BMI",
      "BMI measurement",
      "Fitness",
      "Weight Management",
      "check BMI",
      "Obesity",
      "Overweight",
      "Underweight",
      "Healthy weight",
    ],
  },
  bmrCalculator: {
    description:
      "Our BMR calculator helps you discover your body’s daily calorie needs. By understanding your basal metabolic rate, you can plan your diet and fitness goals.",
    keywords:
      "BMR calculator, daily calorie needs, basal metabolic rate, calculate BMR, calorie calculator, metabolism, weight management.",
  },
  bprCalculator: {
    description:
      "Evaluate your high blood pressure and hypertension risk with our Blood Pressure Risk Calculator. Get tips to manage your cardiovascular health today.",
    keywords:
      "blood pressure risk calculator, hypertension risk, cardiovascular health, BP calculator, heart health",
  },
  pddCalculator: {
    description:
      "Use our Pregnancy Due Date Calculator to predict when your baby will arrive. Track your pregnancy milestones with accurate due date calculations.",
    keywords:
      "pregnancy due date calculator, baby due date, pregnancy milestones, check pregnancy due date, pregnancy tracker, track pregnancy, estimated delivery date.",
  },
  drCalculator: {
    description:
      "Find your risk of developing Type 2 Diabetes with our easy-to-use Diabetes Risk Calculator. Take steps toward prevention and better health today.",
    keywords:
      " diabetes risk calculator, Diabetes calculator, Type 2 diabetes risk, blood sugar assessment, Sugar calculator,  diabetes prevention, health calculator.",
  },
};
