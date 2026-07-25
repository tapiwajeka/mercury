export const metadata = {
  title: "Admin | Mercury Zimbabwe",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <div className="min-h-screen bg-mercuryBlack text-white">{children}</div>;
}
