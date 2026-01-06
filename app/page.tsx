import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Seminovos } from "@/components/landing/seminovos";
import { CatalogCTA } from "@/components/landing/catalog-cta";
import { Experience } from "@/components/landing/experience";
import { InstagramCTA } from "@/components/landing/instagram-cta";
import { Location } from "@/components/landing/location";
import { Footer } from "@/components/landing/footer";
import { SectionDivider } from "@/components/shared/section-divider";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SectionDivider variant="dark" />
        <Seminovos />
        <SectionDivider variant="light" />
        <CatalogCTA />
        <SectionDivider variant="dark" />
        <Experience />
        <SectionDivider variant="light" />
        <InstagramCTA />
        <SectionDivider variant="dark" />
        <Location />
      </main>
      <Footer />
    </>
  );
}
