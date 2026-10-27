import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

/** Homepage layout: the header floats over the hero slider on desktop. */
export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header variant="overlay" />
      <main>{children}</main>
      <Footer />
    </>
  );
}
