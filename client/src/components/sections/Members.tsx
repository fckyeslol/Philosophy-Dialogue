import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, LinkedinIcon, Mail } from "lucide-react";
import { type Member } from "@shared/schema";

interface MembersProps {
  members: Member[];
}

const Members = ({ members }: MembersProps) => {
  return (
    <section id="members" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-800 mb-4">Meet Our Members</h2>
          <p className="max-w-3xl mx-auto text-neutral-600">Our club is made up of passionate students from diverse backgrounds and disciplines.</p>
          <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.length > 0 ? (
            members.map((member) => (
              <Card key={member.id} className="bg-neutral-50 rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-1 aspect-h-1 h-64">
                  <img 
                    src={member.imageUrl} 
                    alt={member.name} 
                    className="object-cover h-full w-full"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-1">{member.name}</h3>
                  <p className={`font-medium mb-3 ${
                    member.focus === 'Philosophy' ? 'text-primary' : 
                    member.focus === 'Debate' ? 'text-secondary' : 'text-accent'
                  }`}>
                    {member.role}
                  </p>
                  <p className="text-neutral-600 mb-4">{member.bio}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-neutral-500">No member profiles available at the moment.</p>
            </div>
          )}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="link" className="text-primary hover:text-primary-dark">
            View All Members
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Members;
