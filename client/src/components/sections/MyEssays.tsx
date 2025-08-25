
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Calendar, User } from "lucide-react";
import { type BlogPost } from "@shared/schema";

const MyEssays = () => {
  const { data: blogPosts = [] } = useQuery<BlogPost[]>({ 
    queryKey: ['/api/blog-posts'],
  });

  // Filter for essays (you can adjust this filter based on your needs)
  const essays = blogPosts.filter(post => 
    post.category === "filosofia" || 
    post.category === "philosophy" ||
    post.title.toLowerCase().includes("ensayo") ||
    post.title.toLowerCase().includes("essay") ||
    post.title.toLowerCase().includes("revolución") ||
    post.title.toLowerCase().includes("pesadilla") ||
    post.title.toLowerCase().includes("izquierda") ||
    post.title.toLowerCase().includes("derecha")
  );

  const [selectedEssay, setSelectedEssay] = useState<BlogPost | null>(null);

  const handleEssayClick = (essay: BlogPost) => {
    setSelectedEssay(essay);
  };

  return (
    <section id="my-essays" className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-800 mb-4">
            My Essays
          </h2>
          <p className="max-w-3xl mx-auto text-neutral-600">
            Explore philosophical reflections and academic writings by our club members.
          </p>
          <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {essays.map((essay) => (
            <Card key={essay.id} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="text-sm text-neutral-500 capitalize bg-primary/10 px-2 py-1 rounded">
                    {essay.category}
                  </span>
                </div>
                <CardTitle className="text-lg font-heading font-semibold line-clamp-2">
                  {essay.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                  {essay.excerpt}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-neutral-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {essay.date}
                  </div>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 text-white"
                      onClick={() => handleEssayClick(essay)}
                    >
                      Read Essay
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-heading">
                        {selectedEssay?.title}
                      </DialogTitle>
                      <div className="flex items-center space-x-4 text-sm text-neutral-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {selectedEssay?.date}
                        </div>
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-1" />
                          {selectedEssay?.category}
                        </div>
                      </div>
                    </DialogHeader>
                    <ScrollArea className="mt-4 max-h-[60vh]">
                      <div className="prose prose-lg max-w-none">
                        {selectedEssay?.imageUrl && (
                          <img 
                            src={selectedEssay.imageUrl} 
                            alt={selectedEssay.title}
                            className="w-full h-64 object-cover rounded-lg mb-6"
                          />
                        )}
                        <div className="text-lg leading-relaxed whitespace-pre-wrap">
                          {selectedEssay?.content || selectedEssay?.excerpt}
                        </div>
                        {(!selectedEssay?.content || selectedEssay?.content === "") && (
                          <div className="text-center py-8 text-neutral-500">
                            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>This essay content will be available soon.</p>
                            <p className="text-sm mt-2">Preview: {selectedEssay?.excerpt}</p>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        {essays.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 mx-auto text-neutral-400 mb-4" />
            <h3 className="text-xl font-semibold text-neutral-600 mb-2">No Essays Available</h3>
            <p className="text-neutral-500">Essays will be published here soon.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyEssays;
