import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Twitter, Linkedin } from "lucide-react";

const attorneys = [
  {
    name: "Sarah Johnson",
    title: "Personal Injury Specialist",
    education: "J.D. Harvard Law School",
    experience: "15+ years of experience",
    additional: "Former Assistant District Attorney",
    imageSrc: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fHByb2Zlc3Npb25hbCUyMG1hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    name: "Michael Rodriguez",
    title: "Family Law Attorney",
    education: "J.D. Yale Law School",
    experience: "12+ years of experience",
    additional: "Certified Family Law Specialist",
    imageSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2Zlc3Npb25hbCUyMG1hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    name: "Emily Chen",
    title: "Estate Planning Attorney",
    education: "J.D. Stanford Law School",
    experience: "10+ years of experience",
    additional: "Board Certified in Estate Planning",
    imageSrc: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2Zlc3Npb25hbCUyMHdvbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
  }
];

export default function AttorneyProfiles() {
  return (
    <section id="attorneys" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-merriweather font-bold text-gray-900 sm:text-4xl">Meet Our Attorneys</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our team of dedicated legal professionals is committed to providing exceptional representation for all your legal needs.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {attorneys.map((attorney, index) => (
            <Card key={index} className="overflow-hidden shadow rounded-lg border border-gray-200">
              <CardContent className="p-6">
                <div className="flex justify-center">
                  <Avatar className="h-[150px] w-[150px] rounded-full mb-4">
                    <AvatarImage src={attorney.imageSrc} alt={`Attorney ${attorney.name}`} />
                    <AvatarFallback>{attorney.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-merriweather font-semibold text-gray-900">{attorney.name}</h3>
                  <p className="text-primary-600 font-medium mb-2">{attorney.title}</p>
                  <p className="text-gray-600 mb-4 text-sm">
                    {attorney.education}<br />
                    {attorney.experience}<br />
                    {attorney.additional}
                  </p>
                  <div className="flex justify-center space-x-3">
                    <a href="#" className="text-gray-400 hover:text-gray-500" aria-label="Twitter">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-500" aria-label="LinkedIn">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
