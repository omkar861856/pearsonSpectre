import { Shield, Users, FileText, ChevronRight, CheckCircle2, Clock, DollarSign, Briefcase, Gavel, Scale, Building, HeartPulse, Brain, Home, FileSignature } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Business Services
const businessServices = [
  {
    title: "CORPORATE LAW",
    description: "From mergers and acquisitions to regulatory compliance, we provide elite legal counsel to businesses of all sizes.",
    icon: Building,
    specialties: [
      {
        name: "Mergers & Acquisitions",
        details: "Complete transaction guidance from due diligence to closing",
        timeframe: "3-9 months depending on complexity",
        pricing: "$15,000-75,000 based on deal size"
      },
      {
        name: "Corporate Restructuring",
        details: "Strategic reorganization to optimize operations and tax structure",
        timeframe: "2-6 months for implementation",
        pricing: "$10,000-50,000 depending on company size"
      },
      {
        name: "Securities & Regulation",
        details: "Compliance with SEC regulations and securities law",
        timeframe: "Ongoing advisory services",
        pricing: "$5,000-15,000 retainer, plus hourly fees"
      },
      {
        name: "Corporate Governance",
        details: "Board structure, shareholder agreements, and compliance",
        timeframe: "1-3 months for implementation",
        pricing: "$3,500-25,000 depending on complexity"
      }
    ]
  },
  {
    title: "BUSINESS LITIGATION",
    description: "We don't just prepare for court — we prepare to win. Our litigators have an unmatched track record in high-stakes cases.",
    icon: Gavel,
    specialties: [
      {
        name: "Commercial Disputes",
        details: "Representing your business interests in contract disputes, partnership conflicts, and commercial claims",
        timeframe: "6-18 months to resolution",
        pricing: "$25,000-150,000+ depending on complexity"
      },
      {
        name: "Class Action Defense",
        details: "Strategic defense against class action lawsuits targeting your business",
        timeframe: "1-3 years to resolution",
        pricing: "$75,000-500,000+ based on case scope"
      },
      {
        name: "White Collar Defense",
        details: "Defending executives against fraud, securities violations, and regulatory investigations",
        timeframe: "1-4 years depending on charges",
        pricing: "$100,000-750,000+ depending on case complexity"
      },
      {
        name: "Employment Litigation",
        details: "Defense against wrongful termination, discrimination, and harassment claims",
        timeframe: "8-24 months to resolution",
        pricing: "$20,000-100,000 depending on complexity"
      }
    ]
  },
  {
    title: "INTELLECTUAL PROPERTY",
    description: "Your ideas are your most valuable assets. We ensure they remain protected in an increasingly competitive global market.",
    icon: FileText,
    specialties: [
      {
        name: "Patent Prosecution",
        details: "Filing and prosecuting utility and design patents domestically and internationally",
        timeframe: "2-4 years for full patent approval",
        pricing: "$8,000-20,000 per patent application"
      },
      {
        name: "Trademark Protection",
        details: "Trademark search, filing, monitoring, and enforcement",
        timeframe: "12-18 months for registration",
        pricing: "$2,500-8,000 per trademark"
      },
      {
        name: "Copyright Litigation",
        details: "Protecting creative works against infringement and unauthorized use",
        timeframe: "6-24 months for resolution",
        pricing: "$15,000-100,000 depending on complexity"
      },
      {
        name: "IP Portfolio Management",
        details: "Strategic management of your complete intellectual property portfolio",
        timeframe: "Ongoing advisory services",
        pricing: "$3,500-15,000 quarterly retainer"
      }
    ]
  }
];

// Personal & Family Services
const personalServices = [
  {
    title: "PERSONAL INJURY",
    description: "When you're injured due to someone else's negligence, we fight relentlessly to secure the compensation you deserve.",
    icon: HeartPulse,
    specialties: [
      {
        name: "Auto & Truck Accidents",
        details: "Representation for victims of vehicle collisions including cars, commercial trucks, and motorcycles",
        timeframe: "6-18 months to settlement",
        pricing: "Contingency fee: 33-40% of recovery amount"
      },
      {
        name: "Medical Malpractice",
        details: "Holding healthcare providers accountable for negligence and errors",
        timeframe: "1-3 years to resolution",
        pricing: "Contingency fee: 35-45% of recovery amount"
      },
      {
        name: "Premises Liability",
        details: "Cases involving injuries on dangerous property, slip and falls, and security negligence",
        timeframe: "8-24 months to resolution",
        pricing: "Contingency fee: 33-40% of recovery amount"
      },
      {
        name: "Catastrophic Injuries",
        details: "Specialized representation for traumatic brain injuries, spinal cord damage, and severe burns",
        timeframe: "1-4 years to maximize compensation",
        pricing: "Contingency fee: 35-45% of recovery amount"
      }
    ]
  },
  {
    title: "FAMILY LAW",
    description: "Family matters require both legal expertise and emotional intelligence. Our attorneys provide both during life's most challenging transitions.",
    icon: Users,
    specialties: [
      {
        name: "Divorce & Separation",
        details: "Complete representation through divorce proceedings, including asset division and support arrangements",
        timeframe: "3-12 months depending on complexity",
        pricing: "$5,000-25,000 retainer, plus $300-500/hour"
      },
      {
        name: "Child Custody & Support",
        details: "Advocating for your parental rights and your child's best interests",
        timeframe: "2-9 months for initial arrangements",
        pricing: "$3,500-15,000 depending on complexity"
      },
      {
        name: "Prenuptial Agreements",
        details: "Creating comprehensive, enforceable agreements before marriage",
        timeframe: "2-6 weeks to completion",
        pricing: "$2,500-7,500 flat fee"
      },
      {
        name: "Adoption",
        details: "Guiding families through domestic and international adoption processes",
        timeframe: "6-18 months to finalization",
        pricing: "$4,000-15,000 depending on adoption type"
      }
    ]
  },
  {
    title: "ELDER LAW",
    description: "Our elder law practice provides comprehensive legal support to seniors and their families, ensuring dignity and security in later years.",
    icon: Brain,
    priority: true,
    specialties: [
      {
        name: "Estate Planning for Seniors",
        details: "Specialized estate planning for older adults, including trusts to avoid probate",
        timeframe: "1-3 months to complete documentation",
        pricing: "$3,000-10,000 for comprehensive planning"
      },
      {
        name: "Long-term Care Planning",
        details: "Strategic planning for nursing home and assisted living costs, including Medicaid qualification",
        timeframe: "2-6 months for complete planning",
        pricing: "$4,500-12,000 depending on assets"
      },
      {
        name: "Guardianship & Conservatorship",
        details: "Legal representation in guardianship proceedings for incapacitated adults",
        timeframe: "2-4 months for establishment",
        pricing: "$3,500-9,000 depending on complexity"
      },
      {
        name: "Elder Abuse Protection",
        details: "Legal intervention against financial exploitation, neglect, and physical abuse",
        timeframe: "Immediate intervention available",
        pricing: "$3,000-15,000 depending on required action"
      }
    ]
  },
  {
    title: "ESTATE PLANNING",
    description: "Protect your legacy and provide for your loved ones with thoughtfully crafted estate plans tailored to your specific needs.",
    icon: FileSignature,
    specialties: [
      {
        name: "Wills & Trusts",
        details: "Comprehensive estate planning documents to ensure your wishes are honored",
        timeframe: "2-6 weeks for drafting and execution",
        pricing: "$1,500-7,500 depending on complexity"
      },
      {
        name: "Asset Protection",
        details: "Strategic planning to shield assets from creditors and minimize tax exposure",
        timeframe: "1-3 months for implementation",
        pricing: "$3,500-12,000 based on portfolio complexity"
      },
      {
        name: "Probate Administration",
        details: "Guiding executors and beneficiaries through the probate process",
        timeframe: "6-18 months for complete administration",
        pricing: "$3,000-15,000 depending on estate size"
      },
      {
        name: "Business Succession Planning",
        details: "Ensuring smooth transition of family businesses to the next generation",
        timeframe: "3-9 months for complete planning",
        pricing: "$5,000-25,000 based on business complexity"
      }
    ]
  }
];

// Service Detail Component
const ServiceDetail = ({ specialty }: { specialty: any }) => {
  return (
    <div className="mt-3 pl-8 border-l-2 border-gray-100">
      <p className="text-gray-700 text-sm mb-2">{specialty.details}</p>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-3 text-xs">
        <div className="flex items-center text-navy-700">
          <Clock className="h-3.5 w-3.5 mr-1" />
          <span>{specialty.timeframe}</span>
        </div>
        <div className="flex items-center text-navy-700">
          <DollarSign className="h-3.5 w-3.5 mr-1" />
          <span>{specialty.pricing}</span>
        </div>
      </div>
    </div>
  );
};

export default function PracticeAreas() {
  const scrollToInquiry = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector("#case-inquiry");
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
    <section id="practice-areas" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-12">
          <div className="suits-divider"></div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-navy-950 mt-6 text-center">AREAS OF EXPERTISE</h2>
          <p className="mt-6 text-lg text-charcoal-700 max-w-2xl mx-auto text-center">
            At Pearson Specter, we handle complex legal matters across a wide range of practice areas. Our team is organized into specialized groups to provide the most effective representation.
          </p>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="personal" className="text-lg">Personal & Family</TabsTrigger>
              <TabsTrigger value="business" className="text-lg">Business Services</TabsTrigger>
            </TabsList>
          </div>
          
          {/* Personal & Family Services Tab */}
          <TabsContent value="personal" className="mt-0">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2">
              {/* Highlight Elder Law by placing it first with special styling */}
              {personalServices
                .sort((a, b) => (a.priority ? -1 : b.priority ? 1 : 0))
                .map((area, index) => (
                  <div 
                    key={index} 
                    className={`suits-card hover:shadow-xl transition-all duration-300 border-t-4 
                      ${area.priority ? 'border-gold-500 bg-navy-50' : 'border-navy-800'}`}
                  >
                    <div className="p-8">
                      {area.priority && (
                        <div className="inline-block bg-gold-100 text-gold-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                          FEATURED PRACTICE AREA
                        </div>
                      )}
                      <div className={`w-12 h-12 flex items-center justify-center mb-6 transition-all duration-300
                        ${area.priority ? 'bg-gold-100' : 'bg-navy-100'}`}>
                        <area.icon className={`h-6 w-6 transition-all duration-300
                          ${area.priority ? 'text-gold-600' : 'text-navy-800'}`} />
                      </div>
                      <h3 className={`text-xl font-serif font-bold mb-4
                        ${area.priority ? 'text-gold-800' : 'text-navy-900'}`}>
                        {area.title}
                      </h3>
                      <p className="text-charcoal-700 mb-6">{area.description}</p>
                      <ul className="space-y-6 mb-8">
                        {area.specialties.map((specialty, idx) => (
                          <li key={idx}>
                            <div className="flex items-start">
                              <CheckCircle2 className={`h-5 w-5 mr-3 mt-0.5 flex-shrink-0 
                                ${area.priority ? 'text-gold-500' : 'text-navy-600'}`} />
                              <span className="text-navy-800 font-medium">{specialty.name}</span>
                            </div>
                            <ServiceDetail specialty={specialty} />
                          </li>
                        ))}
                      </ul>
                      <a 
                        href="#case-inquiry" 
                        onClick={scrollToInquiry}
                        className={`inline-flex items-center uppercase text-sm tracking-wider font-bold pb-1 transition-colors
                          ${area.priority ? 'text-gold-700 border-b-2 border-gold-500 hover:text-gold-800' : 'text-navy-900 border-b-2 border-navy-500 hover:text-navy-700'}`}
                      >
                        Request consultation
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))
              }
            </div>
          </TabsContent>
          
          {/* Business Services Tab */}
          <TabsContent value="business" className="mt-0">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {businessServices.map((area, index) => (
                <div key={index} className="suits-card hover:shadow-xl transition-all duration-300 border-t-4 border-navy-800">
                  <div className="p-8">
                    <div className="w-12 h-12 bg-navy-100 flex items-center justify-center mb-6 transition-all duration-300">
                      <area.icon className="h-6 w-6 text-navy-800 transition-all duration-300" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-navy-900 mb-4">{area.title}</h3>
                    <p className="text-charcoal-700 mb-6">{area.description}</p>
                    <ul className="space-y-6 mb-8">
                      {area.specialties.map((specialty, idx) => (
                        <li key={idx}>
                          <div className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-navy-600 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-navy-800 font-medium">{specialty.name}</span>
                          </div>
                          <ServiceDetail specialty={specialty} />
                        </li>
                      ))}
                    </ul>
                    <a 
                      href="#case-inquiry" 
                      onClick={scrollToInquiry}
                      className="inline-flex items-center uppercase text-sm tracking-wider text-navy-900 font-bold border-b-2 border-navy-500 pb-1 hover:text-navy-700 transition-colors"
                    >
                      Request consultation
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
