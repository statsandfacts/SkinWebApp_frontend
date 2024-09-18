const CONST = {
  WITHOUT_HEADER_PAGE: '/auth',
  WITHOUT_FOOTER: ['/treatment', '/auth', '/upload-prescription'],
  RUPEE: '₹',
  IMAGE_URL: 'https://s3.us-east-2.amazonaws.com/nextcare.life',
  APP_URL: 'https://nextcare.life',
  APP_NAME: 'nextcare.life',
  LOGIN_OPEN_MODAL_AT: 3,

  // Review Carousel
  REVIEW_CAROUSEL_ITEMS: [
    {
      name: 'Aditi',
      description:
        'Elated to embark on this transformative digital journey through nextcare.life, a pioneering platform revolutionizing healthcare with personalized solutions, empowering me towards optimal well-being.',
      image: '/images/review1.png',
    },
    {
      name: 'Shivani',
      description:
        'I am pleased to consult nextcare.life for diagnosis, as it provides reliable medical information from trusted sources, helping me understand potential conditions and seek proper treatment when needed',
      image: '/images/review2.png',
    },
    {
      name: 'Shakshi',
      description:
        'I am delighted to address my blackhead condition through their platform, which promises accurate analysis and appropriate treatment recommendations.',
      image: '/images/review3.png',
    },
  ],

  TESTIMONIAL_SLIDER_ITEMS: [
    {
      image: '/images/review-1.jpg',
      name: ' Emily J.',
      comment:
        'Nextcare.life offers convenient online skin diagnosis. By uploading images of my clogged pores, I can receive professional analysis and treatment recommendations from dermatologists.',
    },
    {
      image: '/images/review-2.avif',
      name: 'David R.',
      comment:
        "Nextcare.life provides a convenient skin diagnosis service. I'm pleased to utilize it for identifying my condition of whiteheads, which are small, white bumps on the skin.",
    },
    {
      image: '/images/review-3.jpg',
      name: ' Samantha K.',
      comment:
        'I am glad you find the website nextcare.life helpful for diagnosing your skin pigmentation condition. Consulting credible online resources for health concerns can provide valuable information and guidance.',
    },
    {
      image: '/images/review-4.jpg',
      name: 'L. Menon',
      comment:
        'Nextcare.life offers personalized skin analysis tools that accurately assess your current skin condition, allowing you to make informed decisions for optimal skin health and beauty.',
    },
    {
      image: '/images/review-5.webp',
      name: '  Jessica M.',
      comment:
        'Visiting nextcare.life fills me with joy and contentment. This website offers valuable resources and services that cater to my needs, leaving me delighted and satisfied.',
    },
  ],

  DIGITAL_PRESCRIPTION_SLIDER_ITEMS: [
    {
      image: '/images/review-1.jpg',
      name: 'Emily J.',
      comment:
        'Nextcare.live transformed my handwritten prescription into a digital format quickly and easily. The process was seamless, and the digital copy is clear and well-organized.',
    },
    {
      image: '/images/review-2.avif',
      name: 'David R.',
      comment:
        "The service at nextcare.live is incredibly convenient. They converted my doctor's handwritten notes into a digital prescription, making it easy to share with my pharmacist.",
    },
    {
      image: '/images/review-3.jpg',
      name: 'Samantha K.',
      comment:
        'Nextcare.live is a game-changer in healthcare. Their service digitized my prescription efficiently, allowing me to keep a secure, easily accessible record of my medication.',
    },
    {
      image: '/images/review-4.jpg',
      name: 'L. Menon',
      comment:
        'I highly recommend nextcare.live for their digital prescription services. The ability to convert handwritten notes into a digital format has improved how I manage my medications.',
    },
    {
      image: '/images/review-5.webp',
      name: 'Jessica M.',
      comment:
        'Using nextcare.live to convert my handwritten prescription into a digital one was a breeze. The service is fast, reliable, and perfect for keeping my healthcare records in order.',
    },
  ],

  // Payment details
  PAYMENT_DETAILS: {
    amount: 200,
    currency: 'INR',
    name: 'NextCare',
    description: 'Payment for case',
    image: '/images/logo.png',
    gst: 18,
    platform_fee: 10,
  },

  DIGITAL_PRESCRIPTION_ROUTES : [
    '/',
    '/auth/sign-up',
    '/upload-prescription',
    '/upload-prescription/sign-up',
    '/upload-prescription/forget-password',
    '/upload-prescription/prescriptions'
  ],

  TERN_AND_CONDITION_DP: [
    {
      appDescription: "Nextcare .Life, a HealthTech platform, provides clinical decision support services (CDSS) by converting physical prescriptions into digital formats. Our platform also offers features such as medication reminders, lab test interpretation, and advice on prescribed drugs, including dosage recommendations. While we strive to ensure accuracy and clarity, the services offered are informational in nature and are not a substitute for professional medical advice, diagnosis, or treatment."
    },
    {
      heading:"1. No Doctor-Patient Relationship:",
      description: [
        "By using our platform, you acknowledge that Nextcare .Life does not create a doctor-patient relationship.",
        "The information provided is meant to assist in decision-making and supplement professional care, not replace consultation with qualified healthcare providers. Always consult a licensed physician for any health concerns or before starting or altering prescribed treatments."
      ]
    },
    {
      heading: "2. Prescription and Medication Information:",
      description: [
        "Our digital prescription service aims to clarify and digitize prescriptions for patient convenience. ",
        "The dosage, frequency, and other medication details provided on the platform are based on the input from the physical prescription but must always be verified by the prescribing healthcare professional.",
        "We are not responsible for any adverse outcomes resulting from errors in input or misinterpretation of prescription data."
      ]
    },
    {
      heading: "3. Lab Test Interpretation:",
      description: [
        "The lab test interpretation feature offers general insights into common lab results based on standard medical guidelines. ",
        "These interpretations are general and educational and should not be used for self-diagnosis or medical decision-making without consulting your healthcare provider."
      ]
    },
    {
      heading: "4. Limitations and Liability:",
      description: [
        "Although every effort is made to ensure that the information provided is accurate and up-to-date, Nextcare .Life does not guarantee the completeness, accuracy, or timeliness of any information on the platform.",
        "The use of our services is at the user's own risk, and we assume no liability for any damages, injuries, or losses resulting from reliance on the information provided."
      ]
    },
    {
      heading: "5. Compliance with Indian Laws:",
      description: [
        "Our services comply with the relevant laws and regulations in India, including but not limited to the Drugs and Cosmetics Act, 1940, and the Information Technology Act, 2000. ",
        "However, we do not dispense medication, and users must use our platform in conjunction with consultations with licensed healthcare providers."
      ]
    },
    {
      heading:"6. Emergency Situations:",
      description: [
        "Our platform is not intended for use in emergency medical situations. In case of a medical emergency, please contact your healthcare provider or emergency services immediately."
      ]
    },
    {
      heading: "7. Changes to Services:",
      description: [
        "Nextcare .Life reserves the right to modify or discontinue any feature of the platform without prior notice."
      ]
    }
  ]
};

export const COMMON = Object.freeze(CONST);
