import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

/** Layout for every page except the homepage: the header sits above the content. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header variant="solid" />
      <main>{children}</main>
      <Footer />
    </>
  );
}
