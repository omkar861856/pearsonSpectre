import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/home/hero-section";
import PracticeAreas from "@/components/home/practice-areas";
import WhyChooseUs from "@/components/home/why-choose-us";
import AttorneyProfiles from "@/components/home/attorney-profiles";
import Testimonials from "@/components/home/testimonials";
import CaseInquiryForm from "@/components/home/case-inquiry-form";
import FaqSection from "@/components/home/faq-section";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Pearson Specter | Corporate Law, Personal Injury & Family Law</title>
        <meta
          name="description"
          content="Pearson Specter is a premier law firm specializing in corporate law, personal injury, family law, and estate planning. Our elite attorneys deliver exceptional results and unwavering advocacy."
        />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <div className="min-h-screen flex flex-col antialiased text-gray-800 bg-gray-50">
        <Header />
        <main>
          <HeroSection />
          <PracticeAreas />
          <Testimonials />
          <WhyChooseUs />
          <AttorneyProfiles />
          <CaseInquiryForm />
          <FaqSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
