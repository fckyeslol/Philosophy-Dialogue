import ActivityTabs from "@/components/tabs/ActivityTabs";

const Activities = () => {
  return (
    <section id="activities" className="py-16 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-800 mb-4">Our Activities</h2>
          <p className="max-w-3xl mx-auto text-neutral-600">
            Explore the three pillars of our club: philosophical inquiry, structured debate, and Model United Nations simulations.
          </p>
          <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
        </div>
        
        <ActivityTabs defaultValue="philosophy" />
      </div>
    </section>
  );
};

export default Activities;
