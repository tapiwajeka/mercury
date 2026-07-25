// Static content ported 1:1 from the live Mercury site (mercurytech.co.zw).
// Original copy is preserved verbatim, including its original wording/typos.
import { company } from "./siteConfig";

const email = company.emails.general;
const phone = company.phones[0].display;

// ---------- Home: product category cards ----------
export const productCategories = [
  {
    name: "Laptops",
    image: "/assets/laptops.png",
    description:
      "Mercury laptops are built for people who need flexiblity, speed and dependable perfomance in a modern, portable form. Designed to handle everyday tasks and professional workloads with ease, they offer a balance of power and mobility for life on the move.",
  },
  {
    name: "Desktops",
    image: "/assets/desktop.png",
    description:
      "Mercury desktops are crafted for environmanets where perfomance, reliability and consistence matter most. With robust hardware and stable operation, they provide a dependable foundation for offices, business and productivity-focused workspaces.",
  },
  {
    name: "Tablets",
    image: "/assets/tablet.png",
    description:
      "Mercury tablets combine the portability of a smartphone with the productivity of a laptop. Perfect for creative professionals, students, and anyone needing a versatile device for work, entertainment, and creativity on the go.",
  },
  {
    name: "Phones",
    image: "/assets/phones.png",
    description:
      "Mercury phones deliver exceptional performance and reliability for seamless communication and productivity. With advanced features, long battery life, and premium build quality, they keep you connected and productive wherever you are.",
  },
];

// ---------- Home: Why Choose Mercury ----------
export const whyChoose = [
  {
    title: "Windows 11 Ready",
    description:
      "Fully compatible with Windows 11, ensuring you get the latest features and security updates.",
  },
  {
    title: "Excellent Performance & Reliability",
    description:
      "Engineered for speed and dependability, delivering consistent performance for all your needs.",
  },
  {
    title: "Local Support & Warranty",
    description:
      "Comprehensive local support and warranty services to keep your devices running smoothly.",
  },
  {
    title: "Made in Zimbabwe",
    description:
      "Proudly manufactured in Zimbabwe, supporting local economy and craftsmanship.",
  },
];

// ---------- About page ----------
export const aboutSections = [
  {
    title: "About Mercury",
    heading: false,
    paragraphs: [
      "Mercury is a proudly Zimbabwean technology brand and an Original Equipment Manufacturer (OEM) focused on delivering high-quality digital devices designed for modern African markets. Built on global engineering standards and finished locally, Mercury combines international technology expertise with local assembly, after-sales support, and a deep understanding of regional needs.",
      "Our products are developed to offer strong performance, dependable quality, and competitive pricing — made possible through local value addition and a robust support ecosystem. By assembling and refining our devices in Zimbabwe, we contribute to skills development, job creation, and the growth of downstream industries, while ensuring faster service, local warranty support, and long-term reliability.",
      "As Mercury continues to expand across Zimbabwe and into the SADC region, our commitment remains the same: to build technology that is practical, accessible, and built to perform in real-world environments.",
    ],
  },
  {
    title: "Mercury Laptops",
    paragraphs: [
      "Mercury laptops are engineered to meet the needs of a wide range of users - from students and educators to professionals and executives. Designed with robust specifications, clean industrial design, and dependable performance, our laptops balance power and efficiency for everyday productivity. Whether for work, study, or business, Mercury laptops deliver reliable computing backed by local warranty, service, and technical support.",
    ],
  },
  {
    title: "Mercury Desktops",
    paragraphs: [
      "Mercury desktops are crafted for environmanets where perfomance, reliability and consistence matter most. With robust hardware and stable operation, they provide a dependable foundation for offices, business and productivity-focused workspaces.",
    ],
  },
  {
    title: "Mercury Phones",
    paragraphs: [
      "Mercury smartphones are designed for modern connectivity, combining sleek design with everyday performance and durability. Built to support communication, productivity, and entertainment, our phones are developed with user experience in mind - offering smooth operation, contemporary features, and dependable build quality. As part of our growing ecosystem, Mercury phones are supported locally to ensure long-term usability and peace of mind.",
    ],
  },
  {
    title: "Mercury Tablets",
    paragraphs: [
      "Mercury tablets are crafted for versatility, offering flexible solutions for learning, work, and content consumption. With clean design, responsive displays, and practical performance, they are ideal for education, business environments, and everyday digital use. Designed to integrate seamlessly into modern workflows, Mercury tablets reflect our commitment to accessible technology that adapts to how people live and work.",
    ],
  },
];

// ---------- Sustainability page ----------
export const sustainability = {
  eyebrow: "Building a Better Future",
  title: "Sustainability & Local Impact",
  intro:
    "Mercury is committed to sustainable technology solutions, local assembly, and reducing environmental impact while empowering African communities.",
  pillars: [
    {
      title: "Local Assembly",
      description:
        "Our devices are assembled locally in Zimbabwe, creating jobs and reducing carbon footprint from international shipping.",
      points: [
        "200+ local jobs created",
        "60% reduction in shipping emissions",
        "Supporting local skills development",
        "Faster service and support",
      ],
    },
    {
      title: "Environmental Commitment",
      description:
        "We're dedicated to minimizing environmental impact through sustainable practices and responsible sourcing.",
      points: [
        "Recyclable packaging materials",
        "Energy-efficient device designs",
        "E-waste recycling programs",
        "Carbon-neutral shipping options",
      ],
    },
  ],
  stats: [
    { value: "10,000+", label: "DEVICES ASSEMBLED LOCALLY" },
    { value: "200+", label: "LOCAL JOBS CREATED" },
    { value: "60%", label: "EMISSIONS REDUCTION" },
    { value: "95%", label: "RECYCLABLE MATERIALS" },
  ],
  goalsIntro:
    "We're committed to ambitious sustainability targets that will transform how technology is manufactured in Africa.",
  goals: [
    {
      icon: "🌱",
      title: "Carbon Neutral",
      description: "Achieve carbon neutrality across all operations by 2030.",
    },
    {
      icon: "🌍",
      title: "Local Sourcing",
      description: "Source 50% of components from African suppliers.",
    },
    {
      icon: "🎓",
      title: "Skills Development",
      description: "Train 1000+ technicians in sustainable technology.",
    },
  ],
};

// ---------- Support page: FAQs ----------
export const faqs = [
  {
    question: "How do I update drivers for my Mercury laptop?",
    answer:
      "Visit our Downloads section and search for your specific model to find the latest drivers. You can also use our Mercury Driver Utility tool for automatic updates.",
  },
  {
    question: "What is the warranty period for Mercury devices?",
    answer:
      "All Mercury devices come with a standard 2-year warranty covering manufacturing defects. Extended warranty options are available for purchase.",
  },
  {
    question: "How can I contact technical support?",
    answer: `You can reach our technical support team via email at ${email} or call ${phone}.`,
  },
  {
    question: "Where can I find service centers?",
    answer:
      "We have authorized service centers across major cities in Zimbabwe. Visit our Contact page or call our support line to find the nearest service center.",
  },
  {
    question: "How do I register my product for warranty?",
    answer:
      "You can register your Mercury product online through our warranty portal. You'll need your product serial number and proof of purchase.",
  },
];

// ---------- News page ----------
export const news = {
  featured: {
    category: "FEATURED",
    date: "November 27, 2025",
    title: "Mercury Launches New Executive Series Laptops",
    excerpt:
      "Our latest Executive series brings cutting-edge performance with local assembly, featuring Intel Alder Lake processors and enhanced security features designed for African markets.",
  },
  articles: [
    {
      category: "PRODUCT UPDATE",
      title: "Smart Meter Production Scales Up",
      excerpt:
        "Mercury increases smart meter production capacity to meet growing demand across Zimbabwe and neighboring countries.",
      date: "November 20, 2025",
    },
    {
      category: "SUSTAINABILITY",
      title: "Carbon Neutral Assembly Plant",
      excerpt:
        "Mercury's Harare assembly facility achieves carbon neutral status, setting new standards for tech manufacturing in Africa.",
      date: "November 15, 2025",
    },
    {
      category: "PARTNERSHIP",
      title: "Education Sector Initiative",
      excerpt:
        "Partnership with Ministry of Education brings Mercury Student series laptops to schools nationwide.",
      date: "November 10, 2025",
    },
    {
      category: "TECHNOLOGY",
      title: "Next-Gen Desktop Workstations",
      excerpt:
        "Introducing our most powerful desktop lineup yet, designed for professionals and enterprise users.",
      date: "November 5, 2025",
    },
    {
      category: "COMMUNITY",
      title: "Tech Training Program Launch",
      excerpt:
        "Mercury partners with local universities to launch comprehensive tech training programs.",
      date: "October 28, 2025",
    },
    {
      category: "AWARDS",
      title: "Excellence in Innovation Award",
      excerpt:
        "Mercury recognized for outstanding contribution to African technology manufacturing sector.",
      date: "October 20, 2025",
    },
  ],
};

// ---------- Legal page ----------
export const legal = {
  terms: {
    lastUpdated: "November 27, 2025",
    sections: [
      {
        title: "1. Acceptance of Terms",
        content:
          "By accessing and using Mercury products and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with these terms, please do not use our products or services.",
      },
      {
        title: "2. Products and Services",
        content:
          "Mercury provides locally assembled computing devices including laptops, desktops, and smart meters. All products are designed and assembled in Zimbabwe to meet local market needs and international quality standards.",
      },
      {
        title: "3. Purchase and Payment",
        content:
          "All purchases are subject to product availability. Prices are subject to change without notice. Payment must be received in full before delivery of products. We accept various payment methods as indicated during checkout.",
      },
      {
        title: "4. Intellectual Property",
        content:
          "All content, trademarks, logos, and intellectual property displayed on our website and products are the property of Mercury or its licensors. Unauthorized use, reproduction, or distribution is prohibited.",
      },
      {
        title: "5. Limitation of Liability",
        content:
          "Mercury shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of our products or services.",
      },
    ],
  },
  privacy: {
    sections: [
      {
        title: "Information We Collect",
        content:
          "We collect information you provide directly to us, including name, email address, phone number, delivery address, and payment information when you make a purchase or register for support services.",
      },
      {
        title: "How We Use Your Information",
        content:
          "We use your information to process orders, provide customer support, send important updates about your products, and improve our services. We may also use your information to communicate promotional offers with your consent.",
      },
      {
        title: "Data Security",
        content:
          "We implement industry-standard security measures to protect your personal information. All payment transactions are encrypted using SSL technology. However, no method of transmission over the Internet is 100% secure.",
      },
      {
        title: "Data Sharing",
        content:
          "We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our business, subject to confidentiality agreements.",
      },
      {
        title: "Your Rights",
        content: `You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time. Contact us at ${email} to exercise these rights.`,
      },
    ],
  },
  warranty: {
    sections: [
      {
        title: "Standard Warranty Coverage",
        content:
          "All Mercury products come with a standard 2-year warranty covering manufacturing defects and hardware failures under normal use conditions. The warranty period begins from the date of purchase.",
      },
      {
        title: "Extended Warranty",
        content:
          "Extended warranty options are available for purchase within 30 days of your original purchase. Extended warranties provide up to 5 years of coverage and include priority support services.",
      },
      {
        title: "What Is Covered",
        content: [
          "Hardware component failures",
          "Manufacturing defects",
          "Battery defects (1 year)",
          "Display issues under normal use",
          "Motherboard and processor failures",
        ],
      },
      {
        title: "What Is Not Covered",
        content: [
          "Physical damage from accidents or drops",
          "Liquid damage",
          "Unauthorized modifications or repairs",
          "Software issues or virus damage",
          "Normal wear and tear",
          "Cosmetic damage",
        ],
      },
      {
        title: "Making a Warranty Claim",
        content:
          "To make a warranty claim, contact our support team with your proof of purchase and product serial number. Our team will guide you through the diagnostic process and arrange repairs or replacement as needed.",
      },
    ],
  },
};
