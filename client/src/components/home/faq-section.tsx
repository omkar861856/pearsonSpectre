import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I know if I have a valid personal injury case?",
    answer: "To have a valid personal injury case, you typically need to establish that someone else's negligence caused your injury, that you suffered actual damages, and that the claim is filed within the statute of limitations. During your free consultation, our attorneys will evaluate the specifics of your situation and advise you on the strength of your potential case."
  },
  {
    question: "How is child custody determined in a divorce case?",
    answer: "Child custody determinations are based on the \"best interests of the child\" standard. Courts consider factors such as each parent's ability to provide care, the child's relationship with each parent, stability, and in some cases, the child's preferences. Our family law attorneys can help you navigate this complex process and advocate for arrangements that serve both your children's needs and your parental rights."
  },
  {
    question: "What happens if I die without a will?",
    answer: "Dying without a will (intestate) means your assets will be distributed according to state law, which may not align with your wishes. The court will appoint an administrator to oversee the process, and your estate may face additional taxes and fees. Creating a comprehensive estate plan with our attorneys ensures your assets are distributed according to your preferences and can potentially minimize tax implications."
  },
  {
    question: "How long will my legal case take?",
    answer: "The duration of a legal case varies significantly depending on its complexity, the parties involved, court schedules, and whether settlement is possible. Some matters may resolve in months, while others could take years. During your consultation, our attorneys will provide a realistic timeline based on your specific circumstances and keep you informed throughout the process."
  }
];

export default function FaqSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-merriweather font-bold text-gray-900 sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Get answers to common questions about our legal services and processes.
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-6">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white shadow overflow-hidden sm:rounded-lg border-none">
                <AccordionTrigger className="px-6 py-4 text-left text-lg font-medium text-gray-900 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
