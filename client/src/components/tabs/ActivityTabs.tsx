import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface ActivityTabsProps {
  defaultValue?: string;
}

const ActivityTabs = ({ defaultValue = "philosophy" }: ActivityTabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <Tabs defaultValue={defaultValue} className="w-full" onValueChange={setActiveTab}>
      <div className="border-b border-neutral-200">
        <TabsList className="flex h-auto p-0 bg-transparent space-x-8">
          <TabsTrigger
            value="philosophy"
            className={cn(
              "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg border-transparent text-neutral-500 rounded-none hover:text-neutral-700 hover:border-neutral-300 data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:shadow-none",
              activeTab === "philosophy" && "border-primary text-primary"
            )}
            id="philosophy-tab"
          >
            Philosophy
          </TabsTrigger>
          <TabsTrigger
            value="debate"
            className={cn(
              "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg border-transparent text-neutral-500 rounded-none hover:text-neutral-700 hover:border-neutral-300 data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:shadow-none",
              activeTab === "debate" && "border-primary text-primary"
            )}
            id="debate-tab"
          >
            Debate
          </TabsTrigger>
          <TabsTrigger
            value="model-un"
            className={cn(
              "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg border-transparent text-neutral-500 rounded-none hover:text-neutral-700 hover:border-neutral-300 data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:shadow-none",
              activeTab === "model-un" && "border-primary text-primary"
            )}
            id="model-un-tab"
          >
            Model UN
          </TabsTrigger>
        </TabsList>
      </div>
      
      <div className="mt-8">
        <TabsContent value="philosophy" className="m-0" id="philosophy-content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-heading font-semibold mb-4 text-neutral-800" id="philosophy">Philosophy</h3>
              <p className="text-neutral-600 mb-4 leading-relaxed">
                Our philosophy sessions focus on exploring fundamental questions about existence, knowledge, ethics, and reality. Through guided discussions and readings, members engage with the ideas of major philosophical traditions and thinkers.
              </p>
              <h4 className="text-xl font-heading font-medium mb-2 text-primary">What We Do:</h4>
              <ul className="list-disc pl-5 mb-6 text-neutral-600 space-y-1">
                <li>Weekly discussion groups on philosophical texts and concepts</li>
                <li>Guest lectures from philosophy professors and scholars</li>
                <li>Philosophy cafés open to the broader community</li>
                <li>Annual philosophy essay competition</li>
              </ul>
              <div className="mt-6">
                <a href="/resources" className="text-primary hover:text-primary-dark font-medium flex items-center">
                  <span>Access Philosophy Resources</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Philosophy discussion group" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="debate" className="m-0" id="debate-content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Formal debate competition" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-heading font-semibold mb-4 text-neutral-800" id="debate">Debate</h3>
              <p className="text-neutral-600 mb-4 leading-relaxed">
                Our debate program trains members in the art of persuasive argumentation, critical thinking, and public speaking. We practice various debate formats including Parliamentary, Lincoln-Douglas, and Public Forum debate.
              </p>
              <h4 className="text-xl font-heading font-medium mb-2 text-secondary">What We Do:</h4>
              <ul className="list-disc pl-5 mb-6 text-neutral-600 space-y-1">
                <li>Weekly practice sessions for developing debate skills</li>
                <li>Participation in regional and national debate tournaments</li>
                <li>Public debate demonstrations on current issues</li>
                <li>Debate workshops for beginners and advanced debaters</li>
              </ul>
              <div className="mt-6">
                <a href="/resources?tab=debate" className="text-secondary hover:text-secondary-dark font-medium flex items-center">
                  <span>Access Debate Resources</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="model-un" className="m-0" id="model-un-content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-heading font-semibold mb-4 text-neutral-800" id="model-un">Model United Nations</h3>
              <p className="text-neutral-600 mb-4 leading-relaxed">
                Our Model UN program simulates the committees and procedures of the United Nations. Members represent different countries, research global issues, draft resolutions, and practice diplomatic negotiation and public speaking.
              </p>
              <h4 className="text-xl font-heading font-medium mb-2 text-accent">What We Do:</h4>
              <ul className="list-disc pl-5 mb-6 text-neutral-600 space-y-1">
                <li>Training in Model UN rules, procedures, and research methods</li>
                <li>Participation in collegiate Model UN conferences</li>
                <li>Hosting an annual Model UN conference for high school students</li>
                <li>Collaboration with international affairs departments and organizations</li>
              </ul>
              <div className="mt-6">
                <a href="/resources?tab=model-un" className="text-accent hover:text-accent-dark font-medium flex items-center">
                  <span>Access Model UN Resources</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <img 
                src="/images/marcemun.png" 
                alt="Model UN conference" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ActivityTabs;
