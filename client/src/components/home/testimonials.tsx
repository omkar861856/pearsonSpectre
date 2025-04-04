import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Enhanced testimonials with more client stories and locations
const testimonials = [
  {
    quote: "Sarah Johnson and her team were outstanding throughout my personal injury case. They were compassionate, professional, and fought hard to get me the compensation I deserved. I couldn't have asked for better representation during such a difficult time.",
    author: "Robert T.",
    location: "New York, NY",
    role: "Personal Injury Client",
    stars: 5,
    avatarSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    quote: "Michael Rodriguez helped me navigate a complex divorce with custody issues. His attention to detail and genuine care for my children's wellbeing made all the difference. I'm grateful for his guidance during such a challenging time in my life.",
    author: "Jennifer W.",
    location: "Boston, MA",
    role: "Family Law Client",
    stars: 5,
    avatarSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    quote: "Emily Chen created an estate plan that gave me peace of mind knowing my family will be taken care of. She explained everything clearly and addressed all my concerns. I highly recommend Pearson Specter for estate planning needs.",
    author: "David M.",
    location: "Chicago, IL",
    role: "Estate Planning Client",
    stars: 5,
    avatarSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    quote: "Harvey Specter's strategic negotiation skills saved my business from a hostile takeover. His command of corporate law is unmatched, and his ability to anticipate the opponent's moves was remarkable.",
    author: "Catherine J.",
    location: "San Francisco, CA",
    role: "Corporate Client",
    stars: 5,
    avatarSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    quote: "Louis Litt's attention to detail in our contract negotiations was impressive. He found loopholes that would have cost us millions. His knowledge of financial law is extraordinary.",
    author: "Marcus D.",
    location: "Seattle, WA",
    role: "Business Client",
    stars: 5,
    avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    quote: "When a major corporation tried to force me out of my home through eminent domain, Jessica Pearson took my case when no one else would. Her brilliant interpretation of property law saved my family's home of three generations.",
    author: "Eleanor S.",
    location: "Philadelphia, PA",
    role: "Property Rights Client",
    stars: 5,
    avatarSrc: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    quote: "Donna Paulsen managed my case with exceptional efficiency. She anticipated every need and made a stressful legal process feel manageable. The entire team at Pearson Specter operates at a level above the rest.",
    author: "Thomas R.",
    location: "Miami, FL",
    role: "Civil Litigation Client",
    stars: 5,
    avatarSrc: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    quote: "After my workplace injury, Mike Ross fought tirelessly to ensure I received proper compensation. He took on a major corporation without fear and won me a settlement that covered all my medical expenses and loss of income.",
    author: "Patricia G.",
    location: "Austin, TX",
    role: "Worker's Compensation Client",
    stars: 5,
    avatarSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];

// Enhanced case results
const caseResults = [
  {
    amount: "$4.2 Million",
    area: "Personal Injury",
    description: "Recent settlement for a client suffering catastrophic injuries in a commercial truck accident case.",
    highlight: true
  },
  {
    amount: "$2.8 Million",
    area: "Medical Malpractice",
    description: "Verdict against a hospital for surgical errors resulting in permanent disability for our client."
  },
  {
    amount: "$1.5 Million",
    area: "Corporate Law",
    description: "Successfully defended a tech startup against IP infringement claims from a major competitor."
  },
  {
    amount: "Full Custody",
    area: "Family Law",
    description: "Successfully secured full custody for a father in a challenging interstate custody dispute case."
  },
  {
    amount: "$950,000",
    area: "Estate Planning",
    description: "Created a comprehensive estate plan that saved a family over $950,000 in estate taxes and protected generational wealth."
  },
  {
    amount: "$3.1 Million",
    area: "Class Action",
    description: "Led a successful class action against a pharmaceutical company for undisclosed medication side effects."
  }
];

// Notable victories for the carousel
const notableVictories = [
  {
    title: "$4.2 Million Settlement",
    description: "Our client was involved in a catastrophic collision with a commercial truck that ran a red light. The accident resulted in multiple broken bones, spinal injuries requiring surgery, and permanent nerve damage. After aggressive litigation and negotiation, we secured a $4.2 million settlement that covers all medical expenses, lost income, and compensates for pain and suffering.",
    image: "https://images.unsplash.com/photo-1593115057322-e94b77572f20?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
    date: "March 2025"
  },
  {
    title: "$2.8 Million Medical Malpractice Verdict",
    description: "Our client underwent what should have been a routine surgery but suffered oxygen deprivation due to anesthesia errors. We proved negligence on the part of the medical team, securing a $2.8 million verdict that provides for ongoing care and rehabilitation services.",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
    date: "January 2025"
  },
  {
    title: "$3.1 Million Class Action Settlement",
    description: "We represented over 2,000 consumers in a class action lawsuit against a pharmaceutical company that failed to disclose serious side effects of their medication. Our legal team uncovered internal documents showing the company was aware of the risks but continued marketing the drug. The $3.1 million settlement provides compensation for affected users.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
    date: "December 2024"
  },
  {
    title: "Landmark Corporate Merger Defense",
    description: "When a hostile takeover threatened our client's family-owned business of three generations, our corporate team structured a defensive strategy that not only prevented the takeover but secured favorable financing terms for expansion. The business has since increased its market valuation by 45%.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
    date: "October 2024"
  }
];

// Render star ratings
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex text-gold-500">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`h-5 w-5 ${i < rating ? 'fill-gold-500' : 'stroke-gold-300'}`}
        />
      ))}
    </div>
  );
};

export default function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <>
      {/* Notable Victories Carousel Section */}
      <section id="notable-victories" className="py-16 suits-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-merriweather font-bold sm:text-4xl text-white">Notable Victories</h2>
            <div className="suits-divider mx-auto bg-gold-400"></div>
            <p className="mt-4 text-lg text-gray-100 max-w-2xl mx-auto">
              Our track record of success speaks for itself. Here are some of our most significant recent victories.
            </p>
          </div>

          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {notableVictories.map((victory, index) => (
                <CarouselItem key={index}>
                  <div className="victory-card fade-in">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <div className="aspect-video bg-navy-700 rounded overflow-hidden">
                          <img 
                            src={victory.image} 
                            alt={victory.title} 
                            className="w-full h-full object-cover opacity-80"
                            loading="lazy"
                            decoding="async"
                            width="600"
                            height="400"
                          />
                        </div>
                        <div className="mt-3 text-gold-400 text-sm font-medium">{victory.date}</div>
                      </div>
                      <div className="md:w-2/3">
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white">{victory.title}</h3>
                        <p className="text-gray-200">{victory.description}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-6">
              <CarouselPrevious className="position-override relative -translate-y-0 -left-0 bg-navy-700 hover:bg-navy-600 border-navy-600" />
              <CarouselNext className="position-override relative -translate-y-0 -right-0 bg-navy-700 hover:bg-navy-600 border-navy-600" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section id="testimonials" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-merriweather font-bold text-navy-950 sm:text-4xl">Client Success Stories</h2>
            <div className="suits-divider mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              See what our clients have to say about their experience working with Pearson Specter.
            </p>
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            <div className="testimonial-card fade-in">
              <div className="px-6 py-8 sm:p-10">
                <div className="flex items-center mb-4">
                  <StarRating rating={testimonials[activeTestimonial].stars} />
                </div>
                <blockquote className="mt-4">
                  <p className="text-lg text-gray-600 italic">
                    "{testimonials[activeTestimonial].quote}"
                  </p>
                  <footer className="mt-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Avatar className="h-10 w-10">
                          <AvatarImage 
                            src={testimonials[activeTestimonial].avatarSrc} 
                            alt={testimonials[activeTestimonial].author}
                            loading="lazy"
                            decoding="async"
                          />
                          <AvatarFallback>{testimonials[activeTestimonial].author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{testimonials[activeTestimonial].author}</div>
                        <div className="text-sm text-gray-500">{testimonials[activeTestimonial].location} • {testimonials[activeTestimonial].role}</div>
                      </div>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-3 w-3 rounded-full mx-1 ${index === activeTestimonial ? 'bg-navy-800' : 'bg-gray-300 hover:bg-navy-400'}`}
                  aria-label={`View testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {caseResults.map((result, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-lg shadow-md p-6 border-t-4 transition-all duration-300 hover:shadow-lg 
                  ${result.highlight ? 'border-gold-500 transform hover:scale-105' : 'border-navy-700 hover:-translate-y-2'}`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-xl font-bold ${result.highlight ? 'suits-text-gradient' : 'text-navy-900'}`}>
                    {result.amount}
                  </h3>
                  <span className="text-navy-700 font-medium text-sm bg-gray-100 px-3 py-1 rounded-full">
                    {result.area}
                  </span>
                </div>
                <p className="text-gray-600">
                  {result.description}
                </p>
                {result.highlight && (
                  <div className="mt-4 text-xs text-gold-600 font-semibold">
                    FEATURED CASE
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
