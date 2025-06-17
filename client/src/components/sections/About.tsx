const About = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-800 mb-4">About Our Club</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="/images/your-image-name.png" 
              alt="Students engaged in philosophical discussion" 
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div>
            <h3 className="text-2xl font-heading font-semibold mb-4 text-neutral-800">Our Mission</h3>
            <p className="text-neutral-600 mb-6 leading-relaxed">
              We are dedicated to fostering critical thinking, effective communication, and global awareness through the study of philosophy, the practice of structured debate, and the simulation of international diplomacy through Model United Nations.
            </p>
            <p className="text-neutral-600 mb-6 leading-relaxed">
              Our club provides a platform for students to engage with complex ideas, develop argumentation skills, and understand global issues from multiple perspectives. We believe these intellectual pursuits are essential for creating informed and engaged citizens.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-neutral-100 p-4 rounded-lg text-center">
                <div className="text-primary text-3xl mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="font-heading font-semibold">Philosophy</h4>
                <p className="text-sm text-neutral-500">Explore ideas and concepts</p>
              </div>
              <div className="bg-neutral-100 p-4 rounded-lg text-center">
                <div className="text-secondary text-3xl mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h4 className="font-heading font-semibold">Debate</h4>
                <p className="text-sm text-neutral-500">Develop argumentation skills</p>
              </div>
              <div className="bg-neutral-100 p-4 rounded-lg text-center">
                <div className="text-accent text-3xl mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020.5 5.5v-1.65a2.5 2.5 0 00-2.5-2.5h-14a2.5 2.5 0 00-2.5 2.5v1.65a2.5 2.5 0 002.5 2.5h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0018 5.5v-1" />
                  </svg>
                </div>
                <h4 className="font-heading font-semibold">Model UN</h4>
                <p className="text-sm text-neutral-500">Practice diplomacy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
