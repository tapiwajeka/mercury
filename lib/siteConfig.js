// Central company / contact configuration (ported 1:1 from the live site).
export const company = {
  name: "Mercury",
  legalName: "Mercury Technologies",
  tagline:
    "High-performance ICT devices engineered for Africa, built to international standards. Locally assembled with global quality.",
  phones: [{ display: "+263 785 689 311", tel: "+263785689311" }],
  emails: {
    general: "info@mercurytech.co.zw",
    sales: "sales@mercurytech.co.zw",
  },
  address: {
    street: "7 Helsdon Road",
    suburb: "Alexandra Park",
    city: "Harare",
    country: "Zimbabwe",
  },
  socials: {
    instagram: "https://www.instagram.com/mercurytechzw",
    tiktok: "https://www.tiktok.com/@mercuryzw",
  },
};

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "About Us", to: "/about" },
  { label: "Support", to: "/support" },
  { label: "Contact", to: "/contact" },
];
