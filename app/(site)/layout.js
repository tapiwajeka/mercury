import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SiteLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-36 sm:pt-40">{children}</main>
      <Footer />
    </>
  );
}
