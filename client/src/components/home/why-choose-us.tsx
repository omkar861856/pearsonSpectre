import { Lightbulb, Users, Shield } from "lucide-react";

const reasons = [
  {
    title: "Experienced Attorneys",
    description: "Our team of seasoned attorneys brings decades of combined experience to every case, ensuring you receive the best possible representation.",
    icon: Lightbulb
  },
  {
    title: "Client-Centered Approach",
    description: "We prioritize your needs and concerns, providing personalized attention and keeping you informed throughout your legal journey.",
    icon: Users
  },
  {
    title: "Proven Track Record",
    description: "Our successful case history and satisfied clients demonstrate our effectiveness in achieving favorable outcomes across practice areas.",
    icon: Shield
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-merriweather font-bold text-gray-900 sm:text-4xl">Why Choose Madison Law Group?</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our commitment to excellence and client satisfaction sets us apart from other law firms.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center mb-4">
                <reason.icon className="h-6 w-6 text-secondary-600" />
              </div>
              <h3 className="text-xl font-merriweather font-semibold text-gray-900 mb-2">{reason.title}</h3>
              <p className="text-gray-600">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
