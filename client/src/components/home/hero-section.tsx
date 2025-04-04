import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="home" className="relative bg-navy-950 h-[85vh] min-h-[600px] flex items-center">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 to-navy-900/80"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="suits-divider mb-8"></div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-tight">
              WINNING <br/>
              <span className="suits-text-gradient">COMES FIRST</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-xl">
              When you're facing tough legal challenges, you need representation that delivers results. 
              At Pearson Specter, we don't just practice law — we win cases.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-6">
              <a 
                href="#case-inquiry"
                onClick={(e) => scrollToSection(e, "#case-inquiry")}
                className="suits-button flex items-center justify-center"
              >
                REQUEST CONSULTATION <ChevronRight className="w-4 h-4 ml-2" />
              </a>
              <a 
                href="#practice-areas"
                onClick={(e) => scrollToSection(e, "#practice-areas")}
                className="bg-gold-500 text-navy-950 hover:bg-gold-600 font-bold py-3 px-6 transition-all duration-200 flex items-center justify-center"
              >
                OUR EXPERTISE
              </a>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -top-8 -right-8 w-72 h-72 border-4 border-gold-500 opacity-30"></div>
              <div className="suits-card relative bg-white border-t-0 p-8 shadow-xl transform rotate-1">
                <div className="suits-divider mb-6"></div>
                <p className="text-2xl font-serif text-navy-950 leading-tight mb-4">
                  "The best lawyers aren't just about knowing the law. They're about taking risks when necessary."
                </p>
                <p className="text-lg font-bold text-navy-800">
                  — Harvey Specter
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
