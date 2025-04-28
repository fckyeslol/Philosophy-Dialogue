import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative bg-primary py-32">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-center mb-6">
          Explore. Debate. <span className="text-accent">Discover.</span>
        </h1>
        <p className="text-white text-xl md:text-2xl text-center max-w-3xl mb-8">
          Join our community of thinkers, debaters, and future diplomats as we explore ideas, challenge perspectives, and develop crucial skills for tomorrow's leaders.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <a href="#about">
            <Button variant="secondary" className="px-8 py-3 text-primary bg-white shadow-sm hover:bg-neutral-100 border-none">
              Learn More
            </Button>
          </a>
          <a href="#contact">
            <Button variant="outline" className="px-8 py-3 border-white text-white hover:bg-white/10">
              Join Our Club
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
