import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { BookOpen, ChevronDown } from "lucide-react";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          {/* Logo */}
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="flex items-center">
              <span className="sr-only">Philosophy, Debate & Model UN Club</span>
              <BookOpen className="text-primary text-3xl mr-2" />
              <span className="font-heading text-xl font-bold text-primary hidden md:inline-block">
                Philosophy, Debate & MUN Club
              </span>
              <span className="font-heading text-xl font-bold text-primary md:hidden">
                PDM Club
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 -my-2 md:hidden">
            <Button
              variant="ghost"
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-500 hover:text-neutral-600 hover:bg-neutral-100"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-10" aria-label="Main navigation">
            <Link href="/#about" className="font-accent text-base font-medium text-neutral-600 hover:text-primary">
              About
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="group inline-flex items-center font-accent text-base font-medium text-neutral-600 hover:text-primary focus:outline-none">
                <span>Activities</span>
                <ChevronDown className="ml-1 h-4 w-4 group-hover:text-primary" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 rounded-lg p-2">
                <Link href="/#philosophy">
                  <DropdownMenuItem className="flex items-start p-3 rounded-lg cursor-pointer">
                    <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-primary text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-base font-medium text-neutral-900">Philosophy</p>
                      <p className="mt-1 text-sm text-neutral-500">Explore profound ideas and concepts through philosophical inquiry.</p>
                    </div>
                  </DropdownMenuItem>
                </Link>
                <Link href="/#debate">
                  <DropdownMenuItem className="flex items-start p-3 rounded-lg cursor-pointer">
                    <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-secondary text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-base font-medium text-neutral-900">Debate</p>
                      <p className="mt-1 text-sm text-neutral-500">Engage in structured arguments and develop critical thinking skills.</p>
                    </div>
                  </DropdownMenuItem>
                </Link>
                <Link href="/#model-un">
                  <DropdownMenuItem className="flex items-start p-3 rounded-lg cursor-pointer">
                    <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-accent text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020.5 5.5v-1.65a2.5 2.5 0 00-2.5-2.5h-14a2.5 2.5 0 00-2.5 2.5v1.65a2.5 2.5 0 002.5 2.5h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0018 5.5v-1" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-base font-medium text-neutral-900">Model UN</p>
                      <p className="mt-1 text-sm text-neutral-500">Simulate United Nations committees and international relations.</p>
                    </div>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/resources" className="font-accent text-base font-medium text-neutral-600 hover:text-primary">
              Resources
            </Link>
            <Link href="/#gallery" className="font-accent text-base font-medium text-neutral-600 hover:text-primary">
              Gallery
            </Link>

            <Link href="/#chatbot" className="font-accent text-base font-medium text-neutral-600 hover:text-primary">
              AI Assistant
            </Link>

            <Link href="/#blog" className="font-accent text-base font-medium text-neutral-600 hover:text-primary">
              Blog
            </Link>

          </nav>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <a href="#contact">
              <Button className="whitespace-nowrap">
                Join Us
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu open={mobileMenuOpen} setOpen={setMobileMenuOpen} />
    </header>
  );
};

export default Header;