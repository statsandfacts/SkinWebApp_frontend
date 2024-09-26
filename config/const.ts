const CONST = {
  WITHOUT_HEADER_PAGE: "/auth",
  WITHOUT_FOOTER: ["/treatment", "/auth", "/upload-prescription"],
  RUPEE: "₹",
  IMAGE_URL: "https://s3.us-east-2.amazonaws.com/nextcare.life",
  APP_URL: "https://nextcare.life",
  APP_NAME: "nextcare.life",
  LOGIN_OPEN_MODAL_AT: 3,

  // Review Carousel
  REVIEW_CAROUSEL_ITEMS: [
    {
      name: "Aditi",
      description:
        "Elated to embark on this transformative digital journey through nextcare.life, a pioneering platform revolutionizing healthcare with personalized solutions, empowering me towards optimal well-being.",
      image: "/images/review1.png",
    },
    {
      name: "Shivani",
      description:
        "I am pleased to consult nextcare.life for diagnosis, as it provides reliable medical information from trusted sources, helping me understand potential conditions and seek proper treatment when needed",
      image: "/images/review2.png",
    },
    {
      name: "Shakshi",
      description:
        "I am delighted to address my blackhead condition through their platform, which promises accurate analysis and appropriate treatment recommendations.",
      image: "/images/review3.png",
    },
  ],

  TESTIMONIAL_SLIDER_ITEMS: [
    {
      image: "/images/review-1.jpg",
      name: " Emily J.",
      comment:
        "Nextcare.life offers convenient online skin diagnosis. By uploading images of my clogged pores, I can receive professional analysis and treatment recommendations from dermatologists.",
    },
    {
      image: "/images/review-2.avif",
      name: "David R.",
      comment:
        "Nextcare.life provides a convenient skin diagnosis service. I'm pleased to utilize it for identifying my condition of whiteheads, which are small, white bumps on the skin.",
    },
    {
      image: "/images/review-3.jpg",
      name: " Samantha K.",
      comment:
        "I am glad you find the website nextcare.life helpful for diagnosing your skin pigmentation condition. Consulting credible online resources for health concerns can provide valuable information and guidance.",
    },
    {
      image: "/images/review-4.jpg",
      name: "L. Menon",
      comment:
        "Nextcare.life offers personalized skin analysis tools that accurately assess your current skin condition, allowing you to make informed decisions for optimal skin health and beauty.",
    },
    {
      image: "/images/review-5.webp",
      name: "  Jessica M.",
      comment:
        "Visiting nextcare.life fills me with joy and contentment. This website offers valuable resources and services that cater to my needs, leaving me delighted and satisfied.",
    },
  ],

  DIGITAL_PRESCRIPTION_SLIDER_ITEMS: [
    {
      image: "/images/review-girl-1.jpg",
      name: "Priya S.",
      comment:
        "Nextcare.life converted my handwritten prescription into a digital format. It was so convenient, and now I can easily share it with my chemist. The digital copy is clear and organized.",
    },
    {
      image: "/images/review-boy-1.jpg",
      name: "Rajesh P.",
      comment:
        "The service at Nextcare.life is very useful. They turned my doctor's handwritten notes into a digital prescription, making it easy to share.",
    },
    {
      image: "/images/review-girl-2.jpg",
      name: "Sonali R.",
      comment:
        "Nextcare.life is truly a helpful service. It digitized my prescription in no time, allowing me to store my medication details safely and access them whenever needed.",
    },
    {
      image: "/images/review-boy-2.jpg",
      name: "Arjun M.",
      comment:
        "I highly recommend Nextcare.life for their digital prescription services. It has made it much easier for me to manage my medicines and keep track of my health records.",
    },
    {
      image: "/images/review-girl-3.jpg",
      name: "Neha T.",
      comment:
        "Using Nextcare.life to convert my handwritten prescription was hassle-free. It’s a fast and reliable service, and now I don’t have to worry about losing my medical records.",
    },
  ],

  // Payment details
  PAYMENT_DETAILS: {
    amount: 200,
    currency: "INR",
    name: "NextCare",
    description: "Payment for case",
    image: "/images/logo.png",
    gst: 18,
    platform_fee: 10,
  },

  DIGITAL_PRESCRIPTION_ROUTES: [
    "/",
    "/auth/sign-up",
    "/upload-prescription",
    "/upload-prescription/sign-up",
    "/upload-prescription/forget-password",
    "/upload-prescription/prescriptions",
  ],

  TERN_AND_CONDITION_DP: [
    {
      appDescription:
        "Nextcare .Life, a HealthTech platform, provides clinical decision support services (CDSS) by converting physical prescriptions into digital formats. Our platform also offers features such as medication reminders, lab test interpretation, and advice on prescribed drugs, including dosage recommendations. While we strive to ensure accuracy and clarity, the services offered are informational in nature and are not a substitute for professional medical advice, diagnosis, or treatment.",
    },
    {
      heading: "1. No Doctor-Patient Relationship:",
      description: [
        "By using our platform, you acknowledge that Nextcare .Life does not create a doctor-patient relationship.",
        "The information provided is meant to assist in decision-making and supplement professional care, not replace consultation with qualified healthcare providers. Always consult a licensed physician for any health concerns or before starting or altering prescribed treatments.",
      ],
    },
    {
      heading: "2. Prescription and Medication Information:",
      description: [
        "Our digital prescription service aims to clarify and digitize prescriptions for patient convenience. ",
        "The dosage, frequency, and other medication details provided on the platform are based on the input from the physical prescription but must always be verified by the prescribing healthcare professional.",
        "We are not responsible for any adverse outcomes resulting from errors in input or misinterpretation of prescription data.",
      ],
    },
    {
      heading: "3. Lab Test Interpretation:",
      description: [
        "The lab test interpretation feature offers general insights into common lab results based on standard medical guidelines. ",
        "These interpretations are general and educational and should not be used for self-diagnosis or medical decision-making without consulting your healthcare provider.",
      ],
    },
    {
      heading: "4. Limitations and Liability:",
      description: [
        "Although every effort is made to ensure that the information provided is accurate and up-to-date, Nextcare .Life does not guarantee the completeness, accuracy, or timeliness of any information on the platform.",
        "The use of our services is at the user's own risk, and we assume no liability for any damages, injuries, or losses resulting from reliance on the information provided.",
      ],
    },
    {
      heading: "5. Compliance with Indian Laws:",
      description: [
        "Our services comply with the relevant laws and regulations in India, including but not limited to the Drugs and Cosmetics Act, 1940, and the Information Technology Act, 2000. ",
        "However, we do not dispense medication, and users must use our platform in conjunction with consultations with licensed healthcare providers.",
      ],
    },
    {
      heading: "6. Emergency Situations:",
      description: [
        "Our platform is not intended for use in emergency medical situations. In case of a medical emergency, please contact your healthcare provider or emergency services immediately.",
      ],
    },
    {
      heading: "7. Changes to Services:",
      description: [
        "Nextcare .Life reserves the right to modify or discontinue any feature of the platform without prior notice.",
      ],
    },
  ],

  FAQ: [
    {
      q: "What is a handwritten prescription?",
      a: "A handwritten prescription is a medical order written by a healthcare professional on paper, often using pen or pencil.",
    },
    {
      q: "What is a digital prescription?",
      a: "A digital prescription is an electronic version of a prescription that is created and transmitted electronically via software.",
    },
    {
      q: "What are the key differences between handwritten and digital prescriptions?",
      a: "Handwritten prescriptions are physical, prone to legibility issues, and may require patients to manually deliver them to pharmacies. Digital prescriptions are electronic, reduce errors, and can be sent directly to pharmacies.",
    },
    {
      q: "Why are handwritten prescriptions sometimes illegible?",
      a: "Handwriting styles vary widely, and doctors often write quickly, leading to unclear or messy handwriting.",
    },
    {
      q: "What are the risks associated with illegible handwritten prescriptions?",
      a: "Illegible prescriptions can lead to medication errors, misinterpretation, incorrect dosages, and potential harm to patients.",
    },
    {
      q: "How do digital prescriptions improve patient safety?",
      a: "Digital prescriptions eliminate handwriting issues, provide clear instructions, reduce medication errors, and allow for integration with clinical decision support systems (CDSS).",
    },
    {
      q: "Are digital prescriptions legal?",
      a: "Yes, in most countries, digital prescriptions are legal as long as they comply with relevant regulations and security standards.",
    },
    {
      q: "Can handwritten prescriptions be converted to digital form?",
      a: "Yes, technologies like Optical Character Recognition (OCR) can convert handwritten prescriptions to digital form, making them easier to store and interpret.",
    },
    {
      q: "How do digital prescriptions help reduce prescription fraud?",
      a: "Digital prescriptions can be securely transmitted, verified, and stored, reducing the risk of tampering or fraudulent modifications.",
    },
    {
      q: "What technologies are involved in digital prescriptions?",
      a: "Digital prescriptions often use software systems like Electronic Health Records (EHR) and Clinical Decision Support Systems (CDSS), along with secure communication protocols.",
    },
    {
      q: "Can digital prescriptions be used for controlled substances?",
      a: "Yes, many healthcare systems allow for electronic prescriptions of controlled substances (EPCS), with additional security measures like digital signatures.",
    },
    {
      q: "Are patients more likely to follow digital prescriptions?",
      a: "Yes, studies show that patients are more likely to fill and follow digital prescriptions, as they are more convenient and reduce wait times at pharmacies.",
    },
    {
      q: "What is the role of Clinical Decision Support Systems (CDSS) in digital prescriptions?",
      a: "CDSS assists healthcare providers by analyzing patient data and suggesting optimal medication choices, dosages, and alternatives, improving decision-making.",
    },
    {
      q: "Do digital prescriptions reduce medication errors?",
      a: "Yes, digital prescriptions reduce errors related to legibility, drug interactions, and incorrect dosing by providing clear, precise information.",
    },
    {
      q: "How can digital prescriptions integrate with pharmacies?",
      a: "Digital prescriptions can be sent directly to pharmacies via secure electronic systems, reducing the need for physical delivery or phone orders.",
    },
    {
      q: "Can a patient request a printed copy of a digital prescription?",
      a: "Yes, most digital prescription systems allow for a printed copy if the patient prefers or if required by law.",
    },
    {
      q: "Are digital prescriptions secure?",
      a: "Yes, digital prescriptions are generally secure, utilizing encryption and authentication protocols to protect patient data and prevent unauthorized access.",
    },
    {
      q: "How do digital prescriptions support telemedicine?",
      a: "In telemedicine, digital prescriptions allow healthcare providers to prescribe medications remotely and send them electronically to a pharmacy.",
    },
    {
      q: "What are the cost implications of handwritten versus digital prescriptions? ",
      a: "Handwritten prescriptions may lead to higher costs due to errors, delays, and manual processing. Digital prescriptions are often more cost-effective by improving efficiency and reducing errors.",
    },
    {
      q: "How can a healthcare system transition from handwritten to digital prescriptions? ",
      a: "Transitioning involves implementing electronic prescribing (e-prescribing) software, training healthcare staff, ensuring compliance with regulations, and integrating with pharmacies and health records.",
    },
  ],
};

export const COMMON = Object.freeze(CONST);
