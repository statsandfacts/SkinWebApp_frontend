const CONST = {
  WITHOUT_HEADER_PAGE: '/auth',
  WITHOUT_FOOTER: ['/treatment', '/auth'],
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
};

export const COMMON = Object.freeze(CONST);
