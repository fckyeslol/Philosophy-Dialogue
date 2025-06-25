import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Globe, MessageSquare, Book, FileText, Link2, Video, ClipboardList, FileSearch, Mic, FileCode, Briefcase, PenTool, Handshake } from "lucide-react";

const Resources = () => {
  return (
    <section id="resources" className="py-16 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-800 mb-4">Resources</h2>
          <p className="max-w-3xl mx-auto text-neutral-600">Access materials, guides, and readings for each of our club's activities.</p>
          <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Philosophy Resources */}
          <Card className="bg-white p-6 rounded-lg shadow-md">
            <CardHeader className="p-0 mb-4 space-y-0">
              <Brain className="text-primary h-10 w-10" />
              <CardTitle className="text-xl font-heading font-semibold mt-4">Philosophy Resources</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Book className="mt-1 mr-3 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Reading List</h4>
                    <p className="text-sm text-neutral-500">Essential philosophical texts for our discussions</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FileText className="mt-1 mr-3 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Discussion Guides</h4>
                    <p className="text-sm text-neutral-500">Frameworks for philosophical inquiry</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Link2 className="mt-1 mr-3 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Online Resources</h4>
                    <p className="text-sm text-neutral-500">Recommended websites and digital archives</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Video className="mt-1 mr-3 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Lecture Recordings</h4>
                    <p className="text-sm text-neutral-500">Past guest lectures and presentations</p>
                  </div>
                </li>
              </ul>
              <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                <a href="/resources">Access Philosophy Resources</a>
              </Button>
            </CardContent>
          </Card>
          
          {/* Debate Resources */}
          <Card className="bg-white p-6 rounded-lg shadow-md">
            <CardHeader className="p-0 mb-4 space-y-0">
              <MessageSquare className="text-secondary h-10 w-10" />
              <CardTitle className="text-xl font-heading font-semibold mt-4">Debate Resources</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <ClipboardList className="mt-1 mr-3 h-5 w-5 text-secondary" />
                  <div>
                    <h4 className="font-medium">Debate Formats Guide</h4>
                    <p className="text-sm text-neutral-500">Rules and structures for different debate styles</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FileText className="mt-1 mr-3 h-5 w-5 text-secondary" />
                  <div>
                    <h4 className="font-medium">Argument Construction</h4>
                    <p className="text-sm text-neutral-500">Templates and frameworks for building cases</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FileSearch className="mt-1 mr-3 h-5 w-5 text-secondary" />
                  <div>
                    <h4 className="font-medium">Research Methods</h4>
                    <p className="text-sm text-neutral-500">Tools for gathering evidence and data</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Mic className="mt-1 mr-3 h-5 w-5 text-secondary" />
                  <div>
                    <h4 className="font-medium">Public Speaking Tips</h4>
                    <p className="text-sm text-neutral-500">Techniques for effective delivery</p>
                  </div>
                </li>
              </ul>
              <Button asChild variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors">
                <a href="/resources?tab=debate">Access Debate Resources</a>
              </Button>
            </CardContent>
          </Card>
          
          {/* Model UN Resources */}
          <Card className="bg-white p-6 rounded-lg shadow-md">
            <CardHeader className="p-0 mb-4 space-y-0">
              <Globe className="text-accent h-10 w-10" />
              <CardTitle className="text-xl font-heading font-semibold mt-4">Model UN Resources</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <FileCode className="mt-1 mr-3 h-5 w-5 text-accent" />
                  <div>
                    <h4 className="font-medium">Rules of Procedure</h4>
                    <p className="text-sm text-neutral-500">Official MUN protocols and standards</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <PenTool className="mt-1 mr-3 h-5 w-5 text-accent" />
                  <div>
                    <h4 className="font-medium">Resolution Writing</h4>
                    <p className="text-sm text-neutral-500">Templates and examples for drafting proposals</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Briefcase className="mt-1 mr-3 h-5 w-5 text-accent" />
                  <div>
                    <h4 className="font-medium">Country Position Papers</h4>
                    <p className="text-sm text-neutral-500">Guidelines for researching national policies</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Handshake className="mt-1 mr-3 h-5 w-5 text-accent" />
                  <div>
                    <h4 className="font-medium">Diplomatic Skills</h4>
                    <p className="text-sm text-neutral-500">Negotiation and coalition-building strategies</p>
                  </div>
                </li>
              </ul>
              <Button asChild variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-white transition-colors">
                <a href="/resources?tab=model-un">Access Model UN Resources</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Resources;
