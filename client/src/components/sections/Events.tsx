import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Event } from "@shared/schema";
import { ArrowRight, Clock, MapPin } from "lucide-react";

interface EventsProps {
  events: Event[];
}

const Events = ({ events }: EventsProps) => {
  return (
    <section id="events" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-800 mb-4">Upcoming Events</h2>
          <p className="max-w-3xl mx-auto text-neutral-600">Join us for our regular meetings, special events, and competitions.</p>
          <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.length > 0 ? (
            events.map((event) => (
              <Card key={event.id} className="bg-neutral-50 rounded-lg shadow-md overflow-hidden">
                <div className={`px-4 py-2 text-white flex justify-between items-center ${
                  event.category === 'philosophy' ? 'bg-primary' : 
                  event.category === 'debate' ? 'bg-secondary' : 'bg-accent'
                }`}>
                  <div className="font-heading font-semibold">{event.date}</div>
                  <div className="text-sm px-2 py-1 bg-white/20 rounded capitalize">{event.category}</div>
                </div>
                <CardContent className="p-6">
                  <CardTitle className="font-heading text-xl font-semibold mb-2">{event.title}</CardTitle>
                  <CardDescription className="text-neutral-600 mb-4">{event.description}</CardDescription>
                  <div className="flex items-center text-sm text-neutral-500 mb-4">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-neutral-500 mb-6">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <Button 
                    className={`w-full ${
                      event.category === 'philosophy' ? 'bg-primary hover:bg-primary-dark' : 
                      event.category === 'debate' ? 'bg-secondary hover:bg-secondary-dark' : 'bg-accent hover:bg-accent-dark'
                    }`}
                  >
                    {event.category === 'model-un' ? 'View Details' : 
                     event.category === 'debate' ? 'Register to Compete' : 'Add to Calendar'}
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-neutral-500">No upcoming events at the moment. Check back soon!</p>
            </div>
          )}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="link" className="text-primary hover:text-primary-dark">
            View All Events
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Events;
