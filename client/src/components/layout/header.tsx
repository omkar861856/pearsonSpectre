import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Menu, Phone, MessageSquare, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showChatPrompt, setShowChatPrompt] = useState(false);

  // Set up timer to show chat prompt after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChatPrompt(true);
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Practice Areas", href: "#practice-areas" },
    { name: "Attorneys", href: "#attorneys" },
    { name: "Results", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      {/* Main Header */}
      <header className="suits-gradient sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="flex items-center">
                  <span className="text-2xl font-serif font-bold text-white tracking-wide">
                    PEARSON <span className="suits-text-gradient">SPECTER</span>
                  </span>
                </Link>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:ml-6 md:flex md:items-center md:space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="text-gray-100 hover:text-gold-400 px-3 py-2 font-medium uppercase tracking-wider text-sm transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#case-inquiry"
                onClick={(e) => scrollToSection(e, "#case-inquiry")}
                className="uppercase tracking-wider text-sm px-6 py-3 bg-navy-800 text-white hover:bg-navy-700 transition-all duration-200 font-bold rounded shadow-lg"
              >
                Free Consultation
              </a>
            </nav>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-navy-800"
                    aria-label="Open main menu"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="bg-navy-950 border-l border-gold-600 w-[300px] sm:w-[400px]"
                >
                  <div className="mt-6 flex justify-center">
                    <span className="text-xl font-serif font-bold text-white tracking-wide">
                      PEARSON{" "}
                      <span className="suits-text-gradient">SPECTER</span>
                    </span>
                  </div>
                  <div className="suits-divider mx-auto my-6"></div>
                  <a
                    href="tel:1-800-LAWSUIT"
                    className="flex items-center justify-center mt-4 text-white"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    <span className="font-medium">1-800-LAWSUIT</span>
                  </a>
                  <nav className="mt-6 flex flex-col space-y-6">
                    {navItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                          scrollToSection(e, item.href);
                          setIsMenuOpen(false);
                        }}
                        className="px-3 py-2 text-lg font-medium text-gray-100 hover:text-gold-400 uppercase tracking-wider"
                      >
                        {item.name}
                      </a>
                    ))}
                    <a
                      href="#case-inquiry"
                      onClick={(e) => {
                        scrollToSection(e, "#case-inquiry");
                        setIsMenuOpen(false);
                      }}
                      className="mt-8 inline-flex justify-center items-center uppercase tracking-wider px-6 py-3 bg-navy-800 text-white hover:bg-navy-700 transition-all duration-200 font-bold rounded"
                    >
                      Free Consultation
                    </a>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-navy-900 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center space-x-6">
            <a
              href="tel:1-800-LAWSUIT"
              className="flex items-center text-white hover:text-gold-400 transition-colors"
            >
              <Phone className="h-4 w-4 mr-2" />
              <span className="font-medium">1-800-800LAWSUIT</span>
            </a>
            {/* <button
              onClick={() => setIsChatOpen(true)}
              className="flex items-center text-white hover:text-gold-400 transition-colors"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              <span className="font-medium">Live Chat</span>
            </button> */}
          </div>
        </div>
      </div>

      {/* Chat Popup */}
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="bg-white rounded-lg p-6 sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-navy-900">
              Chat with an Attorney
            </DialogTitle>
            <DialogDescription>
              Our legal team is ready to assist you. Please provide your details
              below to start chatting.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="chat-firstname"
                  className="text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  id="chat-firstname"
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  placeholder="First Name"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="chat-lastname"
                  className="text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  id="chat-lastname"
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="chat-email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="chat-email"
                type="email"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                placeholder="your.email@example.com"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="chat-case"
                className="text-sm font-medium text-gray-700"
              >
                Briefly describe your case
              </label>
              <textarea
                id="chat-case"
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                placeholder="Tell us a little about your legal matter..."
              />
            </div>

            <Button className="w-full bg-navy-800 hover:bg-navy-700 text-white">
              Start Chat
            </Button>
          </div>
          <DialogClose className="absolute right-4 top-4 opacity-70 hover:opacity-100">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {/* Chat Prompt */}
      {showChatPrompt && !isChatOpen && (
        <div className="fixed bottom-2 right-2 bg-white rounded-lg shadow-xl p-4 z-50 max-w-sm border-l-4 border-navy-800 animate-in slide-in-from-right">
          <button
            onClick={() => setShowChatPrompt(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <div className="bg-navy-800 rounded-full p-2">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">
                Need legal advice?
              </h3>
              <div className="mt-1 text-sm text-gray-500">
                <p>
                  Our attorneys are available to chat now. Get instant answers
                  to your legal questions.
                </p>
              </div>
              <div className="mt-3">
                <Button
                  onClick={(e) => {
                    // setIsChatOpen(true);
                    scrollToSection(e, "#case-inquiry");
                    setShowChatPrompt(false);
                  }}
                  size="sm"
                  className="bg-navy-800 hover:bg-navy-700 text-white"
                >
                  Contact Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
