import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from "@/lib/icons";
import { BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <BookOpen className="text-accent text-3xl mr-2" />
              <span className="font-heading text-xl font-bold">PDM Club</span>
            </div>
            <p className="text-neutral-400 mb-6">
              Fostering critical thinking, effective communication, and global awareness through philosophy, debate, and Model UN.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-accent transition-colors">
                <FacebookIcon />
              </a>
              <a href="#" className="text-neutral-400 hover:text-accent transition-colors">
                <TwitterIcon />
              </a>
              <a href="#" className="text-neutral-400 hover:text-accent transition-colors">
                <InstagramIcon />
              </a>
              <a href="#" className="text-neutral-400 hover:text-accent transition-colors">
                <LinkedinIcon />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-neutral-400 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#about" className="text-neutral-400 hover:text-accent transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#events" className="text-neutral-400 hover:text-accent transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="#resources" className="text-neutral-400 hover:text-accent transition-colors">
                  Resources
                </a>
              </li>
              <li>
                <a href="#blog" className="text-neutral-400 hover:text-accent transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-neutral-400 hover:text-accent transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#contact" className="text-neutral-400 hover:text-accent transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Activities</h3>
            <ul className="space-y-2">
              <li>
                <a href="#philosophy" className="text-neutral-400 hover:text-accent transition-colors">
                  Philosophy
                </a>
              </li>
              <li>
                <a href="#debate" className="text-neutral-400 hover:text-accent transition-colors">
                  Debate
                </a>
              </li>
              <li>
                <a href="#model-un" className="text-neutral-400 hover:text-accent transition-colors">
                  Model UN
                </a>
              </li>
              <li>
                <a href="#contact" className="text-neutral-400 hover:text-accent transition-colors">
                  Join a Program
                </a>
              </li>
              <li>
                <a href="#events" className="text-neutral-400 hover:text-accent transition-colors">
                  Upcoming Competitions
                </a>
              </li>
              <li>
                <a href="#resources" className="text-neutral-400 hover:text-accent transition-colors">
                  Training Resources
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-neutral-400 mb-4">
              Subscribe to our newsletter for updates on events, competitions, and club activities.
            </p>
            <form className="flex">
              <Input 
                type="email" 
                placeholder="Your email"
                className="rounded-r-none bg-neutral-700 border-neutral-600 text-white focus:ring-accent focus:border-accent"
              />
              <Button type="submit" className="bg-accent hover:bg-accent-dark text-white rounded-l-none px-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            &copy; {new Date().getFullYear()} Philosophy, Debate & Model UN Club. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-neutral-400 hover:text-accent text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-neutral-400 hover:text-accent text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-neutral-400 hover:text-accent text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
