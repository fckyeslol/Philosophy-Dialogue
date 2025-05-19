import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link, LinkIcon, FileText, Video, Newspaper, BookOpen, ExternalLink, Clock } from "lucide-react";
import { type ResourceLink } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const ResourceCard = ({ resource }: { resource: ResourceLink }) => {
  // Get the appropriate icon based on resource type
  const getIcon = () => {
    switch (resource.type) {
      case "website":
        return <Link className="h-5 w-5 text-primary" />;
      case "document":
        return <FileText className="h-5 w-5 text-primary" />;
      case "video":
        return <Video className="h-5 w-5 text-primary" />;
      case "article":
        return <Newspaper className="h-5 w-5 text-primary" />;
      case "podcast":
        return <BookOpen className="h-5 w-5 text-primary" />;
      default:
        return <LinkIcon className="h-5 w-5 text-primary" />;
    }
  };

  // Get the appropriate background color based on category
  const getBgColor = () => {
    switch (resource.category) {
      case "philosophy":
        return "border-l-4 border-primary";
      case "debate":
        return "border-l-4 border-secondary";
      case "model-un":
        return "border-l-4 border-accent";
      default:
        return "border-l-4 border-gray-300";
    }
  };

  return (
    <Card className={`shadow-sm transition-all hover:shadow-md ${getBgColor()}`}>
      <CardContent className="p-6">
        <div className="flex items-start">
          <div className="mr-4 flex-shrink-0 mt-1">
            {getIcon()}
          </div>
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{resource.title}</h3>
              <Badge variant="outline" className="ml-2 capitalize">
                {resource.type}
              </Badge>
            </div>
            <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
            <a 
              href={resource.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`text-sm font-medium inline-flex items-center 
                ${resource.category === 'philosophy' ? 'text-primary hover:text-primary-dark' : 
                resource.category === 'debate' ? 'text-secondary hover:text-secondary-dark' : 
                'text-accent hover:text-accent-dark'}`}
            >
              Visit Resource
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const LoadingResourceCard = () => (
  <Card className="shadow-sm">
    <CardContent className="p-6">
      <div className="flex items-start">
        <div className="mr-4 flex-shrink-0 mt-1">
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32 mb-1" />
            <Skeleton className="h-5 w-16 ml-2" />
          </div>
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-3/4 mb-3" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const ResourcesPage = () => {
  const [activeTab, setActiveTab] = useState<string>("philosophy");
  
  const { data: resources = [], isLoading } = useQuery<ResourceLink[]>({ 
    queryKey: ['/api/resources'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Filter resources by category
  const getResourcesByCategory = (category: string) => {
    return resources.filter((resource: ResourceLink) => resource.category === category);
  };

  const philosophyResources = getResourcesByCategory("philosophy");
  const debateResources = getResourcesByCategory("debate");
  const modelUNResources = getResourcesByCategory("model-un");

  return (
    <div className="py-12 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Resources Library</h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Explore our curated collection of resources for philosophy, debate, and Model UN.
        </p>
      </div>

      <Tabs 
        defaultValue="philosophy" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="mb-10"
      >
        <TabsList className="grid grid-cols-3 mx-auto max-w-md mb-8">
          <TabsTrigger 
            value="philosophy" 
            className={`py-3 rounded-l-lg ${activeTab === "philosophy" ? "bg-primary text-white" : ""}`}
          >
            Philosophy
          </TabsTrigger>
          <TabsTrigger 
            value="debate" 
            className={`py-3 ${activeTab === "debate" ? "bg-secondary text-white" : ""}`}
          >
            Debate
          </TabsTrigger>
          <TabsTrigger 
            value="model-un" 
            className={`py-3 rounded-r-lg ${activeTab === "model-un" ? "bg-accent text-white" : ""}`}
          >
            Model UN
          </TabsTrigger>
        </TabsList>

        <TabsContent value="philosophy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Philosophy Resources</CardTitle>
              <CardDescription>
                Browse a wide range of philosophical texts, articles, and videos covering ancient to contemporary philosophy.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isLoading ? (
                  Array(4).fill(0).map((_, i) => <LoadingResourceCard key={i} />)
                ) : philosophyResources.length > 0 ? (
                  philosophyResources.map((resource: ResourceLink) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8">
                    <Clock className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-gray-500">No philosophy resources available at the moment.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="debate" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Debate Resources</CardTitle>
              <CardDescription>
                Improve your debate skills with resources on argumentation, refutation, and structured debate formats.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isLoading ? (
                  Array(4).fill(0).map((_, i) => <LoadingResourceCard key={i} />)
                ) : debateResources.length > 0 ? (
                  debateResources.map((resource: ResourceLink) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8">
                    <Clock className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-gray-500">No debate resources available at the moment.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="model-un" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Model UN Resources</CardTitle>
              <CardDescription>
                Access materials on Model UN procedures, resolution writing, and international diplomacy.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isLoading ? (
                  Array(4).fill(0).map((_, i) => <LoadingResourceCard key={i} />)
                ) : modelUNResources.length > 0 ? (
                  modelUNResources.map((resource: ResourceLink) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8">
                    <Clock className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-gray-500">No Model UN resources available at the moment.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="border-t border-gray-200 pt-8 text-center">
        <p className="text-gray-600 mb-4">
          Have a resource to suggest? Let us know through our contact form!
        </p>
        <Button asChild>
          <a href="/contact#contact?subject=resource">Suggest a Resource</a>
        </Button>
      </div>
    </div>
  );
};

export default ResourcesPage;